import { useEffect } from 'react'
import { m } from 'motion/react'
import { EASE } from './ui/Revelar'

const chave = 'les-vivee-abertura-v1'
const marca = '/lesvivee/marca-hero.webp'

export function exibirAbertura() {
  if (typeof window === 'undefined' || window.location.hash ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try { return sessionStorage.getItem(chave) !== '1' }
  catch { return true }
}

export function registrarAbertura() {
  try { sessionStorage.setItem(chave, '1') }
  catch { /* O site também funciona com armazenamento bloqueado. */ }
}

export default function Abertura({ onConcluir }: { onConcluir: () => void }) {
  useEffect(() => {
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(onConcluir, 1630)
    function sair(e: KeyboardEvent) { if (e.key === 'Escape') onConcluir() }
    window.addEventListener('keydown', sair)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', sair)
      document.body.style.overflow = anterior
    }
  }, [onConcluir])

  return <m.div className="abertura-les" role="dialog" aria-modal="true" aria-label="Abertura da Les Vivée Clinic"
    initial={false} exit={{ opacity: 0 }} transition={{ duration: .27, ease: EASE }}>
    <m.div className="abertura-les-marca"
      initial={{ clipPath: 'inset(0 46% 0 46%)', opacity: .16, scale: .965 }}
      animate={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1, scale: 1 }}
      transition={{ duration: .78, delay: .06, ease: EASE }}>
      <img src={marca} width="840" height="472" alt="Les Vivée Clinic" />
      <div className="abertura-les-reflexo" aria-hidden="true">
        <m.span initial={{ x: '-105%' }} animate={{ x: '265%' }}
          transition={{ delay: .46, duration: .84, ease: EASE }} />
      </div>
    </m.div>
    <button type="button" className="abertura-les-pular" onClick={onConcluir} autoFocus>Pular abertura</button>
  </m.div>
}
