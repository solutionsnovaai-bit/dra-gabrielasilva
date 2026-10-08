import { ArrowRight } from 'lucide-react'
import { UNIVERSOS } from '../../content/textos'
import { FOLHA } from '../marca/Marca'
import Revelar, { Titulo } from '../ui/Revelar'

/** Os dois universos da clínica, lado a lado. No computador, o cartão sob o mouse cresce. */
export default function Universos() {
  const { estetica: e, nutricao: n } = UNIVERSOS
  return <section className="universos secao papel" aria-labelledby="universos-titulo">
    <div className="conteiner">
      <div className="secao-cabeca">
        <Revelar><p className="rotulo">{UNIVERSOS.rotulo}</p></Revelar>
        <Titulo id="universos-titulo" className="titulo" linhas={UNIVERSOS.titulo} destaque={[1]} />
      </div>
      <div className="universos-grade">
        <Revelar className="universo-celula">
          <a href="#cuidados" className="universo universo-estetica papel-areia">
            <span className="num universo-num" aria-hidden="true">{e.numero}</span>
            <div className="universo-corpo">
              <h3 className="universo-titulo">{e.titulo}</h3>
              <p className="universo-texto">{e.texto}</p>
              <ul className="universo-itens" aria-label="Áreas">{e.itens.map(i => <li key={i}>{i}</li>)}</ul>
              <span className="link-linha universo-link">{e.link}<ArrowRight aria-hidden="true" strokeWidth={1.6} /></span>
            </div>
          </a>
        </Revelar>
        <Revelar className="universo-celula" delay={.12}>
          <a href="#nutricao" className="universo universo-nutricao tema-escuro">
            <picture><source type="image/avif" srcSet={FOLHA.avif} sizes="(min-width: 1024px) 26vw, 50vw" />
              <img className="universo-gs" src={FOLHA.src} srcSet={FOLHA.webp} sizes="(min-width: 1024px) 26vw, 50vw" width={FOLHA.largura} height={FOLHA.altura} alt="" loading="lazy" decoding="async" /></picture>
            <span className="num universo-num" aria-hidden="true">{n.numero}</span>
            <div className="universo-corpo">
              <h3 className="universo-titulo">{n.titulo}</h3>
              <p className="universo-texto">{n.texto}</p>
              <ul className="universo-itens" aria-label="Inclui">{n.itens.map(i => <li key={i}>{i}</li>)}</ul>
              <span className="link-linha universo-link">{n.link}<ArrowRight aria-hidden="true" strokeWidth={1.6} /></span>
            </div>
          </a>
        </Revelar>
      </div>
    </div>
  </section>
}
