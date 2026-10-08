import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useScroll, useTransform } from 'motion/react'
import { Maximize2 } from 'lucide-react'
import { NUTRICAO } from '../../content/textos'
import { RESULTADOS_NUTRICAO } from '../../content/resultados'
import { Ampliada, Fotos } from '../ui/AntesDepois'
import type { ItemResultado } from '../ui/AntesDepois'
import { MENSAGENS } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { FOLHA } from '../marca/Marca'
import { Botao } from '../ui/Botao'
import Revelar, { Titulo } from '../ui/Revelar'
import PainelFundo from '../ui/PainelFundo'

const ITENS: ItemResultado[] = RESULTADOS_NUTRICAO.grupos.flatMap(g => g.fotos.map(f => ({ ...f, grupo: g })))
const SOMA = ITENS.reduce((n, f) => n + f.w / f.h, 0)

/** Antes e depois das dietas: dois cartões com a mesma altura (a largura acompanha a proporção de cada foto). */
function AntesDepoisNutricao() {
  const [aberto, setAberto] = useState<number | null>(null)
  const origem = useRef<HTMLElement | null>(null)
  const fechar = () => { setAberto(null); window.setTimeout(() => origem.current?.focus({ preventScroll: true }), 50) }
  return <div className="nutricao-resultados">
    <Revelar><p className="rotulo">{RESULTADOS_NUTRICAO.rotulo}</p></Revelar>
    <ul className="nutricao-resultados-lista">
      {ITENS.map((f, i) => <li key={f.id} className="nr-item" style={{ '--ar': f.w / f.h } as CSSProperties}>
        <Revelar delay={i * .1}>
          <button type="button" className="res-card nr-card" aria-label={`Ampliar: ${f.grupo.tratamento}, ${f.area.toLowerCase()}`}
            onClick={e => { origem.current = e.currentTarget; setAberto(i) }}>
            <span className="res-foto">
              <Fotos f={f} sizes={`(max-width: 767px) 92vw, ${Math.round(88 * (f.w / f.h) / SOMA)}vw`} />
              <span className="res-ampliar" aria-hidden="true"><Maximize2 strokeWidth={1.6} /></span>
            </span>
            <span className="res-legenda"><span className="res-trat">{f.grupo.tratamento}</span><span className="res-area">{f.area}</span></span>
          </button>
        </Revelar>
      </li>)}
    </ul>
    {createPortal(<AnimatePresence>
      {aberto !== null && <Ampliada itens={ITENS} indice={aberto} onIr={setAberto} onFechar={fechar} />}
    </AnimatePresence>, document.body)}
  </div>
}

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
      <AntesDepoisNutricao />
    </div>
  </section>
}
