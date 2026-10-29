import { useEffect, useRef } from 'react'
import { m, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { HERO } from '../../content/textos'
import { MENSAGENS, SITE } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { useSceneActivity } from '../../hooks/useSceneActivity'
import { useMedia } from '../../hooks/useMedia'
import { FOLHA, RECORTE } from '../../config/imagens'
import { Botao, LinkLinha } from '../ui/Botao'
import { EASE, Titulo } from '../ui/Revelar'

/** Tamanhos de exibição (precisam bater com o preload do index.html). */
export const TAMANHOS_MONOGRAMA = '(min-width: 1024px) 71vh, 43vh'
export const TAMANHOS_FOTO = '(min-width: 1024px) 48vh, (min-width: 768px) 32vh, 36vh'

export type Fase = 'abertura' | 'saida' | 'pronto'

export default function Hero({ fase }: { fase: Fase }) {
  const { reduced } = useMotionPreferences()
  const secao = useRef<HTMLElement>(null)
  const ativa = useSceneActivity(secao)
  const desktop = useMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
  const celular = useMedia('(max-width: 767px)')
  const entrou = fase !== 'abertura'
  const pronto = fase === 'pronto'

  /* Rolagem: texto sobe mais rápido, foto e GS mais devagar (profundidade). */
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const opTexto = useTransform(scrollYProgress, [0, .75], [1, 0])
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const yMono = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const rMono = useTransform(scrollYProgress, [0, 1], [0, -5])

  /* Mouse: o GS e a foto deslizam em sentidos opostos, com mola. */
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 })
  const xMono = useTransform(sx, v => v * -16), yMonoMouse = useTransform(sy, v => v * -10)
  const xFoto = useTransform(sx, v => v * 7), yFotoMouse = useTransform(sy, v => v * 4)
  useEffect(() => {
    if (!desktop || reduced || !pronto) return
    const el = secao.current
    if (!el) return
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width - .5) * 2)
      my.set(((e.clientY - r.top) / r.height - .5) * 2)
    }
    const sair = () => { mx.set(0); my.set(0) }
    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerleave', sair)
    return () => { el.removeEventListener('pointermove', mover); el.removeEventListener('pointerleave', sair) }
  }, [desktop, reduced, pronto, mx, my])

  const surge = (atraso: number) => ({
    initial: reduced ? false : { opacity: 0, y: 18 },
    animate: entrou || reduced ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, delay: atraso, ease: EASE },
  })

  return <section ref={secao} className="hero papel" id="topo" aria-labelledby="hero-titulo">
    <div className={`sombra-folhas ${ativa ? 'is-ativa' : ''}`} aria-hidden="true" />

    {/* GS em folha de ouro: é aqui que o GS da abertura pousa. */}
    <m.div className="hero-mono-parallax" style={reduced ? undefined : { y: yMono, rotate: rMono }} aria-hidden="true">
      <m.div className="hero-mono-mouse" style={{ x: xMono, y: yMonoMouse }}>
        <picture>
          <source type="image/avif" srcSet={FOLHA.avif} sizes={TAMANHOS_MONOGRAMA} />
          <img data-alvo-monograma className={`hero-mono ${pronto ? 'is-visivel' : ''}`} src={FOLHA.src} srcSet={FOLHA.webp} sizes={TAMANHOS_MONOGRAMA}
            width={FOLHA.largura} height={FOLHA.altura} alt="" decoding="async" />
        </picture>
      </m.div>
    </m.div>

    {/* Foto recortada da Dra. Gabriela: sobe de trás da borda de baixo depois que o GS pousa. */}
    <m.div className="hero-foto-parallax" style={reduced ? undefined : { y: yFoto }}>
      <m.div className="hero-foto-mouse" style={{ x: xFoto, y: yFotoMouse }}>
        <picture>
          <source type="image/avif" srcSet={RECORTE.avif} sizes={TAMANHOS_FOTO} />
          <m.img data-foto-hero className="hero-foto"
            src={RECORTE.src} srcSet={RECORTE.webp}
            sizes={TAMANHOS_FOTO} width={RECORTE.largura} height={RECORTE.altura}
            alt={`${SITE.nome}, de jaleco branco, sorrindo no consultório.`}
            fetchPriority="high" decoding="async"
            initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)', y: 70 }}
            animate={pronto || reduced ? { clipPath: 'inset(0% 0% 0% 0%)', y: 0 } : undefined}
            transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }} />
        </picture>
      </m.div>
    </m.div>

    <m.div className="hero-texto conteiner" style={reduced ? undefined : { y: yTexto, opacity: opTexto }}>
      <div className="hero-texto-caixa">
        <m.p className="rotulo hero-rotulo" {...surge(.1)}><span className="so-largo">{HERO.sobretitulo}</span><span className="so-estreito">{HERO.sobretituloCurto[0]}<br />{HERO.sobretituloCurto[1]}</span></m.p>
        <Titulo as="h1" id="hero-titulo" className="display hero-titulo" linhas={[...HERO.linhas, ...HERO.linhasDestaque]} destaque={[2, 3]} ativo={entrou} atraso={.2} />
        <m.p className="lead hero-lead" {...surge(.75)}>{HERO.texto}</m.p>
        <m.div className="hero-acoes" {...surge(.9)}>
          <Botao href={waLink(MENSAGENS.avaliacao)} rotuloAcessivel={`${HERO.cta} pelo WhatsApp (abre em nova aba)`}>{celular ? HERO.ctaCurto : HERO.cta}</Botao>
          <LinkLinha href="#cuidados" className="hero-link">{HERO.ctaSecundario}<ArrowDown aria-hidden="true" strokeWidth={1.6} /></LinkLinha>
        </m.div>
      </div>
    </m.div>

    <m.div className="hero-rodape conteiner" {...surge(1.1)}>
      <span className="hero-rodape-ponto" aria-hidden="true" />
      <span>{HERO.rodape}</span>
      <span className="hero-rodape-sep" aria-hidden="true" />
      <span>{SITE.endereco.bairro}, {SITE.endereco.cidade}</span>
    </m.div>

  </section>
}
