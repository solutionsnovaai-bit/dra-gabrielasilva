import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { NUTRICAO } from '../../content/textos'
import { MENSAGENS } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { FOLHA } from '../marca/Marca'
import { Botao } from '../ui/Botao'
import Revelar, { Titulo } from '../ui/Revelar'
import PainelFundo from '../ui/PainelFundo'

/** Nutrição: capítulo escuro, com o GS em folha de ouro girando devagar com a rolagem. */
export default function Nutricao() {
  const { reduced } = useMotionPreferences()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 6])
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.92, 1, 1.04])

  return <section ref={ref} id="nutricao" className="nutricao secao tema-escuro secao-painel" aria-labelledby="nutricao-titulo">
    <PainelFundo alvo={ref} className="painel-cafe" />
    <div className="conteiner nutricao-grade">
      <div className="nutricao-cabeca">
        <Revelar><p className="rotulo">{NUTRICAO.rotulo}</p></Revelar>
        <Titulo id="nutricao-titulo" className="titulo nutricao-titulo" linhas={NUTRICAO.titulo} destaque={[1]} />
      </div>

      <div className="nutricao-arte" aria-hidden="true">
        <picture>
          <source type="image/avif" srcSet={FOLHA.avif} sizes="(min-width: 1024px) 34vw, 72vw" />
          <m.img src={FOLHA.src} srcSet={FOLHA.webp} sizes="(min-width: 1024px) 34vw, 72vw" width={FOLHA.largura} height={FOLHA.altura} alt="" loading="lazy" decoding="async"
            style={reduced ? undefined : { y, rotate, scale }} />
        </picture>
      </div>

      <div className="nutricao-corpo">
        <Revelar><p className="lead">{NUTRICAO.texto}</p></Revelar>
        <ol className="nutricao-itens">
          {NUTRICAO.itens.map((it, i) => <Revelar as="li" key={it.titulo} delay={i * .08} className="nutricao-item">
            <span className="num nutricao-item-num">0{i + 1}</span>
            <div>
              <h3 className="nutricao-item-titulo">{it.titulo}</h3>
              <p className="nutricao-item-texto">{it.texto}</p>
            </div>
          </Revelar>)}
        </ol>
        <Revelar delay={.1}>
          <Botao href={waLink(MENSAGENS.nutricao)} variante="ouro" rotuloAcessivel={`${NUTRICAO.cta} pelo WhatsApp (abre em nova aba)`}>{NUTRICAO.cta}</Botao>
        </Revelar>
      </div>
    </div>
  </section>
}
