import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { srcset } from '../../content/resultados'
import type { FotoResultado, GrupoResultado } from '../../content/resultados'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { rolagem } from '../../hooks/useSmoothScroll'
import { EASE } from './Revelar'

export type ItemResultado = FotoResultado & { grupo: GrupoResultado }

export const textoAlt = (f: ItemResultado) => `Foto de antes e depois: ${f.grupo.tratamento}, ${f.area.toLowerCase()}.`
const maior = (f: FotoResultado) => `/resultados/${f.id}-${f.larguras[f.larguras.length - 1]}.webp`

/** O par (antes + depois numa imagem só) com as etiquetas. */
export function Fotos({ f, sizes, carregar = 'lazy' }: { f: ItemResultado; sizes: string; carregar?: 'lazy' | 'eager' }) {
  return <>
    <picture>
      <source type="image/avif" srcSet={srcset(f, 'avif')} sizes={sizes} />
      <img src={maior(f)} srcSet={srcset(f, 'webp')} sizes={sizes}
        width={f.w} height={f.h} alt={textoAlt(f)} loading={carregar} decoding="async" draggable={false} />
    </picture>
    <span className="res-tag res-antes" aria-hidden="true">Antes</span>
    <span className="res-tag res-depois" aria-hidden="true">Depois</span>
  </>
}

/** Foto ampliada: navegação por setas, teclado e deslize; Esc fecha. */
export function Ampliada({ itens, indice, onIr, onFechar }: { itens: ItemResultado[]; indice: number; onIr: (i: number) => void; onFechar: () => void }) {
  const { reduced } = useMotionPreferences()
  const fechar = useRef<HTMLButtonElement>(null)
  const toque = useRef<{ x: number; id: number } | null>(null)
  const f = itens[indice]
  const total = itens.length
  const ir = (d: number) => onIr((indice + d + total) % total)

  useEffect(() => {
    document.documentElement.classList.add('travado')
    rolagem.lenis?.stop()
    fechar.current?.focus()
    return () => { document.documentElement.classList.remove('travado'); rolagem.lenis?.start() }
  }, [])
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFechar()
      else if (total > 1 && e.key === 'ArrowRight') ir(1)
      else if (total > 1 && e.key === 'ArrowLeft') ir(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  const r = f.w / f.h
  const v = f.layout === 'v'
  return <m.div className="amp" role="dialog" aria-modal="true" aria-label={`${f.grupo.tratamento}, foto ${indice + 1} de ${total}`} data-lenis-prevent
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: EASE }}
    onPointerDown={e => { toque.current = { x: e.clientX, id: e.pointerId } }}
    onPointerUp={e => {
      const t = toque.current; toque.current = null
      if (!t || t.id !== e.pointerId || total < 2) return
      const dx = e.clientX - t.x
      if (Math.abs(dx) > 60) ir(dx < 0 ? 1 : -1)
    }}
    onClick={e => { if (e.target === e.currentTarget) onFechar() }}>
    <button ref={fechar} type="button" className="amp-fechar" onClick={onFechar} aria-label="Fechar"><X strokeWidth={1.5} /></button>
    <AnimatePresence mode="wait" initial={false}>
      <m.figure key={f.id} className={`amp-figura ${v ? 'is-v' : ''}`} style={{ '--ar': r, '--arm': r / 2 } as CSSProperties}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: .5, ease: EASE }}>
        <div className={`amp-foto res-foto ${v ? 'is-v' : ''}`}>
          <Fotos f={f} sizes={`min(92vw, ${Math.round((v ? 74 : 64) * r)}vh)`} carregar="eager" />
        </div>
        {/* No celular em pé, o par lado a lado vira antes em cima e depois embaixo: cada metade na largura toda. */}
        {!v && <div className="amp-pilha">
          {(['antes', 'depois'] as const).map(lado => <div key={lado} className={`amp-meia amp-${lado}`}>
            <picture>
              <source type="image/avif" srcSet={srcset(f, 'avif')} sizes="184vw" />
              <img src={maior(f)} srcSet={srcset(f, 'webp')} sizes="184vw"
                width={f.w} height={f.h} alt="" decoding="async" draggable={false} />
            </picture>
            <span className={`res-tag res-${lado}`} aria-hidden="true">{lado === 'antes' ? 'Antes' : 'Depois'}</span>
          </div>)}
        </div>}
        <figcaption className="amp-legenda">
          <div>
            <p className="amp-trat">{f.grupo.tratamento}</p>
            <p className="amp-area">{f.area}</p>
          </div>
          {f.grupo.protocolo.length > 0 && <ul className="amp-protocolo">{f.grupo.protocolo.map(p => <li key={p}>{p}</li>)}</ul>}
        </figcaption>
      </m.figure>
    </AnimatePresence>
    {total > 1 && <div className="amp-nav">
      <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior"><ArrowLeft strokeWidth={1.5} /></button>
      <span className="num amp-contador" aria-live="polite">{String(indice + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      <button type="button" onClick={() => ir(1)} aria-label="Próxima foto"><ArrowRight strokeWidth={1.5} /></button>
    </div>}
  </m.div>
}
