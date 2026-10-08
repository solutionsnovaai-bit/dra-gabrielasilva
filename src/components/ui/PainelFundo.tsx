import type { RefObject } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

/**
 * Fundo de seção que "abre" ao entrar na tela: começa como um cartão com cantos arredondados
 * e se expande até ocupar a largura toda. Só transform e border-radius de uma camada de cor lisa.
 */
export default function PainelFundo({ alvo, className = '' }: { alvo: RefObject<HTMLElement | null>; className?: string }) {
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: alvo, offset: ['start end', 'start 0.18'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const borderRadius = useTransform(scrollYProgress, [0, .85, 1], [44, 10, 0])
  return <m.div className={`painel-fundo ${className}`} aria-hidden="true" style={reduced ? undefined : { scaleX, borderRadius }} />
}
