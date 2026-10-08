import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { DOUTORA } from '../../content/textos'
import { SITE } from '../../config/site'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { Nome } from '../marca/Marca'
import { CONSULTORIO } from '../../config/imagens'
import Revelar, { CORTINA, Titulo } from '../ui/Revelar'

/** A Dra. Gabriela: foto do consultório que se abre como cortina e texto em primeira pessoa. */
export default function Doutora() {
  const { reduced } = useMotionPreferences()
  const foto = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: foto, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4.5%', '4.5%'])

  return <section id="doutora" className="doutora secao papel" aria-labelledby="doutora-titulo">
    <div className="conteiner doutora-grade">
      <m.figure ref={foto} className="doutora-foto"
        initial={reduced ? false : { clipPath: 'inset(12% 8% 12% 8%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, amount: .3 }}
        transition={{ duration: 1.5, ease: CORTINA }}>
        <div className="doutora-foto-moldura">
          <picture>
            <source type="image/avif" srcSet={CONSULTORIO.avif} sizes="(min-width: 1024px) 38vw, 92vw" />
            <m.img src={CONSULTORIO.src} srcSet={CONSULTORIO.webp}
              sizes="(min-width: 1024px) 38vw, 92vw" width={CONSULTORIO.largura} height={CONSULTORIO.altura} loading="lazy" decoding="async"
              alt={`${SITE.nome} no consultório, de jaleco branco.`} style={reduced ? undefined : { y, scale: 1.1 }} />
          </picture>
        </div>
        <figcaption className="doutora-legenda">{DOUTORA.legenda}</figcaption>
      </m.figure>

      <div className="doutora-texto">
        <Revelar><p className="rotulo">{DOUTORA.rotulo}</p></Revelar>
        <Titulo id="doutora-titulo" className="titulo" linhas={DOUTORA.titulo} destaque={[1]} />
        <div className="doutora-paragrafos">
          {DOUTORA.paragrafos.map((p, i) => <Revelar key={i} delay={i * .08}><p className="lead">{p}</p></Revelar>)}
        </div>
        <ul className="doutora-principios">
          {DOUTORA.principios.map((p, i) => <Revelar as="li" key={p} delay={i * .07}>
            <span className="num">0{i + 1}</span>{p}
          </Revelar>)}
        </ul>
        <Revelar delay={.1} className="doutora-assinatura">
          <Nome className="doutora-nome" titulo={SITE.nome} />
        </Revelar>
      </div>
    </div>
  </section>
}
