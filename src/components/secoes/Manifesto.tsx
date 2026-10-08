import { useRef } from 'react'
import type { MotionValue } from 'motion/react'
import { m, useScroll, useTransform } from 'motion/react'
import { MANIFESTO } from '../../content/textos'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

function Palavra({ texto, ouro, progresso, de, ate }: { texto: string; ouro: boolean; progresso: MotionValue<number>; de: number; ate: number }) {
  const opacity = useTransform(progresso, [de, ate], [0.14, 1])
  return <m.span className={ouro ? 'ouro' : undefined} style={{ opacity }}>{texto} </m.span>
}

/** Manifesto: as palavras acendem uma a uma conforme a rolagem. */
export default function Manifesto() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const palavras = MANIFESTO.texto.split(' ').map(p => ({ ouro: p.includes('*'), texto: p.replace(/\*/g, '') }))
  const limpo = palavras.map(p => p.texto).join(' ')
  const n = palavras.length

  return <section className="manifesto secao papel" id="filosofia" aria-labelledby="manifesto-rotulo">
    <div className="conteiner manifesto-grade">
      <p className="rotulo" id="manifesto-rotulo">{MANIFESTO.rotulo}</p>
      <p ref={ref} className="manifesto-texto">
        <span className="sr-only">{limpo}</span>
        <span aria-hidden="true">
          {palavras.map((p, i) => reduced
            ? <span key={i} className={p.ouro ? 'ouro' : undefined}>{p.texto} </span>
            : <Palavra key={i} texto={p.texto} ouro={p.ouro} progresso={scrollYProgress} de={i / n} ate={(i + 1.5) / n} />)}
        </span>
      </p>
    </div>
  </section>
}
