import { useLayoutEffect, useRef } from 'react'
import { animate } from 'motion/react'
import { Assinatura, FOLHA, Nome } from '../marca/Marca'
import { MONOGRAMA } from '../marca/vetores'
import { TAMANHOS_MONOGRAMA } from '../secoes/Hero'

export type ModoAbertura = 'completa' | 'rapida' | 'nenhuma'

export function modoAbertura(): ModoAbertura {
  const m = document.documentElement.dataset.abertura
  return m === 'rapida' || m === 'nenhuma' ? m : 'completa'
}

type Props = {
  /** O GS começou a voar: o topo do site entra. */
  onSaida: () => void
  /** O GS pousou no lugar: a abertura sai de cena. */
  onFim: () => void
}

const espera = (s: number) => new Promise<void>(r => window.setTimeout(r, s * 1000))
const decodifica = (img: HTMLImageElement | null) =>
  img ? (img.complete && img.naturalWidth ? Promise.resolve() : img.decode().catch(() => undefined)) : Promise.resolve()

/*
  Peça de motion da abertura (1ª visita ~4 s; ao voltar ~2 s).
  Tudo o que se move é transform, opacity ou clip-path; nada de layout durante a animação.
*/
export default function Abertura({ onSaida, onFim }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const noite = useRef<HTMLDivElement>(null)
  const papel = useRef<HTMLDivElement>(null)
  const lugar = useRef<HTMLDivElement>(null)
  const vooX = useRef<HTMLDivElement>(null)
  const vooY = useRef<HTMLDivElement>(null)
  const mono = useRef<HTMLDivElement>(null)
  const contorno = useRef<SVGSVGElement>(null)
  const folha = useRef<HTMLImageElement>(null)
  const brilho = useRef<HTMLSpanElement>(null)
  const assinatura = useRef<HTMLDivElement>(null)
  const nome = useRef<SVGSVGElement>(null)
  const tagline = useRef<SVGSVGElement>(null)
  const barra = useRef<HTMLDivElement>(null)
  const preenchimento = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const modo = modoAbertura()
    if (modo === 'nenhuma') { onSaida(); onFim(); return }
    const completa = modo === 'completa'
    try { sessionStorage.setItem('gs-abertura', '1') } catch { /* navegação privada */ }

    let cancelado = false
    let voando = false
    const alvo = () => document.querySelector<HTMLElement>('[data-alvo-monograma]')

    /* Posiciona o GS: tamanho final (o do topo), reduzido até o espaço reservado no centro. */
    const medir = () => {
      const a = alvo(), l = lugar.current, m = mono.current, x = vooX.current, y = vooY.current
      if (!a || !l || !m || !x || !y) return null
      const R = a.getBoundingClientRect(), P = l.getBoundingClientRect()
      const s0 = P.height / R.height
      m.style.width = `${R.width}px`
      m.style.height = `${R.height}px`
      if (!voando) {
        x.style.transform = `translateX(${P.left}px)`
        y.style.transform = `translateY(${P.top}px) scale(${s0})`
      }
      const unidadesPorPx = MONOGRAMA.w / (R.width * s0)
      contorno.current?.querySelectorAll('path').forEach(p => p.setAttribute('stroke-width', (1.3 * unidadesPorPx).toFixed(2)))
      return { R, P, s0 }
    }
    let medida = medir()
    const aoRedimensionar = () => { if (!voando) medida = medir() }
    window.addEventListener('resize', aoRedimensionar)

    /* Carregamento real: fonte, GS em folha e foto do topo. */
    const tarefas = [
      document.fonts?.ready ?? Promise.resolve(),
      decodifica(folha.current),
      decodifica(document.querySelector<HTMLImageElement>('[data-foto-hero]')),
    ]
    let feitas = 0
    let barraLiberada = false
    const atualizaBarra = (dur = .7) => {
      if (!barraLiberada || !preenchimento.current) return
      animate(preenchimento.current, { scaleX: Math.max(.08, feitas / tarefas.length) }, { duration: dur, ease: [0.22, 1, 0.36, 1] })
    }
    const carregado = Promise.race([
      Promise.all(tarefas.map(t => Promise.resolve(t).then(() => { feitas++; atualizaBarra() }))),
      espera(7),
    ])

    const roda = async () => {
      const paths = Array.from(contorno.current?.querySelectorAll('path') ?? [])
      const E_LUXO = [0.22, 1, 0.36, 1] as const
      const E_CORTINA = [0.76, 0, 0.24, 1] as const

      if (completa) {
        /* 1. Escuro: o fio de ouro desenha o contorno. */
        paths.forEach((p, i) => {
          animate(p, { strokeDashoffset: [1, 0], opacity: [0, 1] }, {
            strokeDashoffset: { duration: i === 0 ? 1.55 : 0.9, delay: i === 0 ? 0.1 : 0.6 + i * 0.1, ease: [0.45, 0, 0.15, 1] },
            opacity: { duration: 0.2, delay: i === 0 ? 0.1 : 0.6 + i * 0.1 },
          })
        })
        /* 2. Folha: o ouro sobe por dentro do desenho; depois um brilho atravessa. */
        animate(folha.current!, { opacity: [0, 1], clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] }, {
          opacity: { duration: 0.35, delay: 0.85 }, clipPath: { duration: 1.0, delay: 0.85, ease: [0.7, 0, 0.2, 1] },
        })
        animate(contorno.current!, { opacity: 0 }, { duration: 0.7, delay: 1.6, ease: 'easeOut' })
        animate(brilho.current!, { opacity: [0, 1, 1, 0] }, { duration: 1.1, delay: 1.45, times: [0, .15, .8, 1] })
        if (folha.current?.currentSrc) brilho.current!.style.setProperty('--mascara', `url("${folha.current.currentSrc}")`)
        animate(brilho.current!.firstElementChild!, { x: ['-120%', '300%'], skewX: [-14, -14] }, { duration: 1.1, delay: 1.45, ease: [0.45, 0, 0.2, 1] })
        /* 3. Luz: o escuro abre para o papel; entram nome e assinatura. */
        /* a luz se abre a partir do GS, como uma janela que clareia o ambiente */
        const cy = medida ? medida.P.top + medida.P.height / 2 : window.innerHeight * .44
        noite.current!.style.setProperty('--cy', `${cy}px`)
        noite.current!.classList.add('is-abrindo')
        animate(noite.current!, { '--raio': ['-30vmax', '150vmax'] } as never, { duration: 1.5, delay: 1.7, ease: [0.55, 0, 0.25, 1] })
        animate(nome.current!, { clipPath: ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'] }, { duration: 1.05, delay: 1.95, ease: E_CORTINA })
        animate(tagline.current!, { opacity: [0, 1], y: [10, 0] }, { duration: 0.9, delay: 2.2, ease: E_LUXO })
        await espera(2.3)
      } else {
        animate(folha.current!, { opacity: [0, 1], scale: [0.965, 1] }, { duration: 0.7, ease: E_LUXO })
        animate(nome.current!, { clipPath: ['inset(0% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'] }, { duration: 0.8, delay: 0.1, ease: E_CORTINA })
        animate(tagline.current!, { opacity: [0, 1], y: [8, 0] }, { duration: 0.7, delay: 0.25, ease: E_LUXO })
        await espera(0.3)
      }
      if (cancelado) return
      barra.current?.style.setProperty('--trilho', '1')
      barraLiberada = true
      atualizaBarra(.9)

      await Promise.all([espera(completa ? 0.6 : 0.5), carregado])
      if (cancelado) return
      if (preenchimento.current) await animate(preenchimento.current, { scaleX: 1 }, { duration: 0.5, ease: E_LUXO }).finished
      if (cancelado) return

      /* 4. Voo: o GS vai para o lugar dele no topo, numa curva (x e y com tempos diferentes). */
      medida = medir()
      voando = true
      const destino = alvo()?.getBoundingClientRect()
      if (!medida || !destino) { onSaida(); onFim(); return }
      const dur = completa ? 1.2 : 1.0
      animate(assinatura.current!, { opacity: 0, y: -10 }, { duration: 0.5, ease: E_LUXO })
      animate(papel.current!, { opacity: 0 }, { duration: 0.6, delay: 0.15, ease: 'easeOut' })
      animate(noite.current!, { opacity: 0 }, { duration: 0.3 })
      raiz.current?.classList.remove('is-bloqueando')
      onSaida()
      const vx = animate(vooX.current!, { x: [medida.P.left, destino.left] }, { duration: dur, ease: [0.72, 0, 0.22, 1] })
      const vy = animate(vooY.current!, { y: [medida.P.top, destino.top], scale: [medida.s0, destino.height / medida.R.height] }, { duration: dur, ease: [0.5, 0, 0.18, 1] })
      await Promise.all([vx.finished, vy.finished])
      if (!cancelado) onFim()
    }

    roda().catch(() => { if (!cancelado) { onSaida(); onFim() } })
    return () => { cancelado = true; window.removeEventListener('resize', aoRedimensionar) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={raiz} className="abertura is-bloqueando" aria-hidden="true">
    <div ref={papel} className="ab-papel papel"><div className="sombra-folhas is-ativa" /></div>
    <div ref={noite} className="ab-noite" />
    <div className="ab-palco">
      <div ref={lugar} className="ab-lugar" />
      <div ref={assinatura} className="ab-assinatura">
        <Nome ref={nome} className="ab-nome" />
        <Assinatura ref={tagline} className="ab-tagline" />
        <div ref={barra} className="ab-barra"><span ref={preenchimento} /></div>
      </div>
    </div>
    <div ref={vooX} className="ab-voo-x">
      <div ref={vooY} className="ab-voo-y">
        <div ref={mono} className="ab-mono">
          <svg ref={contorno} className="ab-contorno" viewBox={`0 0 ${MONOGRAMA.w} ${MONOGRAMA.h}`}>
            {MONOGRAMA.paths.map((d, i) => <path key={i} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} opacity={0} />)}
          </svg>
          <picture>
            <source type="image/avif" srcSet={FOLHA.avif} sizes={TAMANHOS_MONOGRAMA} />
            <img ref={folha} className="ab-folha" fetchPriority="high" src={FOLHA.src} srcSet={FOLHA.webp} sizes={TAMANHOS_MONOGRAMA} width={FOLHA.largura} height={FOLHA.altura} alt="" decoding="async" />
          </picture>
          <span ref={brilho} className="ab-brilho"><span /></span>
        </div>
      </div>
    </div>
  </div>
}
