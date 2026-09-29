import type { SVGProps } from 'react'
import { MONOGRAMA, NOME, TAGLINE } from './vetores'

type Props = SVGProps<SVGSVGElement> & { titulo?: string }

function Vetor({ dados, titulo, ...rest }: Props & { dados: { w: number; h: number; paths: readonly string[] } }) {
  return <svg viewBox={`0 0 ${dados.w} ${dados.h}`} role={titulo ? 'img' : undefined} aria-hidden={titulo ? undefined : true} aria-label={titulo} focusable="false" {...rest}>
    <path d={dados.paths.join('')} fill="currentColor" fillRule="evenodd" />
  </svg>
}

/** Monograma GS em vetor (cor = currentColor). */
export const Monograma = (p: Props) => <Vetor dados={MONOGRAMA} {...p} />
/** "Dra. Gabriela Silva" com a letra do logotipo. */
export const Nome = (p: Props) => <Vetor dados={NOME} {...p} />
/** "Estética • Nutrição" com a letra do logotipo. */
export const Assinatura = (p: Props) => <Vetor dados={TAGLINE} {...p} />

export const PROPORCAO_MONOGRAMA = MONOGRAMA.w / MONOGRAMA.h

/** Imagem do GS em folha de ouro (a mesma da abertura). */
export const FOLHA = {
  src: '/marca/monograma-folha-1200.webp',
  srcSet: '/marca/monograma-folha-800.webp 694w, /marca/monograma-folha-1200.webp 1040w',
  largura: 1040,
  altura: 1200,
} as const
