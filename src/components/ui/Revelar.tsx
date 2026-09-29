import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

export const EASE = [0.22, 1, 0.36, 1] as const
export const CORTINA = [0.76, 0, 0.24, 1] as const

type Tag = 'div' | 'li' | 'p' | 'figure' | 'span'

/** Entrada ao rolar: sobe e aparece uma vez. */
export default function Revelar({ children, className = '', delay = 0, y = 26, as = 'div', amount = .2 }: { children: ReactNode; className?: string; delay?: number; y?: number; as?: Tag; amount?: number }) {
  const { reduced } = useMotionPreferences()
  const Comp = motion[as] as typeof motion.div
  return <Comp className={className} initial={reduced ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount }} transition={{ duration: 1.05, delay, ease: EASE }}>{children}</Comp>
}

type TituloProps = {
  linhas: readonly string[]
  /** Índices das linhas em dourado. */
  destaque?: readonly number[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  /** Se definido, anima quando virar true (em vez de ao entrar na tela). */
  ativo?: boolean
  atraso?: number
  id?: string
}

/** Título com linhas mascaradas: cada linha sobe de trás de uma borda invisível. */
export function Titulo({ linhas, destaque = [], as: Tag = 'h2', className = '', ativo, atraso = 0, id }: TituloProps) {
  const { reduced } = useMotionPreferences()
  const controlado = ativo !== undefined
  const estado = reduced ? 'show' : controlado ? (ativo ? 'show' : 'hidden') : undefined
  return <Tag className={className} aria-label={linhas.join(' ')} id={id}>
    <motion.span className="linhas" aria-hidden="true"
      initial={reduced ? 'show' : 'hidden'}
      animate={estado}
      whileInView={controlado || reduced ? undefined : 'show'}
      viewport={{ once: true, amount: .5 }}>
      {linhas.map((l, i) => <span className="linha-mascara" key={l + i}>
        <motion.span className={destaque.includes(i) ? 'ouro' : undefined}
          variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1.15, delay: atraso + i * .09, ease: EASE } } }}>{l}</motion.span>
      </span>)}
    </motion.span>
  </Tag>
}
