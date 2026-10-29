import { PARCEIRAS } from '../../content/textos'
import Revelar, { Titulo } from '../ui/Revelar'

/** Profissionais parceiras da Dra. Gabriela (sem foto): área, nome e registro no conselho. */
export default function Parceiras() {
  return <section id="parceiras" className="parceiras secao papel" aria-labelledby="parceiras-titulo">
    <div className="conteiner">
      <div className="secao-cabeca parceiras-cabeca">
        <Revelar><p className="rotulo">{PARCEIRAS.rotulo}</p></Revelar>
        <Titulo id="parceiras-titulo" className="titulo" linhas={PARCEIRAS.titulo} destaque={[1]} />
        <Revelar delay={.1}><p className="lead">{PARCEIRAS.texto}</p></Revelar>
      </div>
      <ul className="parceiras-grade">
        {PARCEIRAS.itens.map((p, i) => <Revelar as="li" key={p.nome} delay={i * .1} className="parceira papel-areia">
          <div className="parceira-topo">
            <span className="num parceira-num" aria-hidden="true">0{i + 1}</span>
            <span className="parceira-area">{p.area}</span>
          </div>
          <div>
            <h3 className="parceira-nome">{p.nome}</h3>
            <p className="parceira-registro">{p.registro}</p>
          </div>
        </Revelar>)}
      </ul>
    </div>
  </section>
}
