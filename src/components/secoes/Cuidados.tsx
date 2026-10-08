import { useEffect, useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { CAPITULOS } from '../../content/cuidados'
import type { Tratamento } from '../../content/cuidados'
import { CUIDADOS } from '../../content/textos'
import { MENSAGENS } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { ArrowDown } from 'lucide-react'
import BrandIcon from '../ui/BrandIcon'
import Revelar, { EASE, Titulo } from '../ui/Revelar'

function Item({ t, aberto, alternar }: { t: Tratamento; aberto: boolean; alternar: () => void }) {
  const { reduced } = useMotionPreferences()
  const id = useId()
  return <li className={`trat ${aberto ? 'is-aberto' : ''}`}>
    <h4 className="trat-cabeca">
      <button type="button" className="trat-botao" aria-expanded={aberto} aria-controls={id} onClick={alternar}>
        <span className="trat-nome">{t.nome}</span>
        <span className="trat-tag">{t.tag}</span>
        <span className="trat-mais" aria-hidden="true"><i /><i /></span>
      </button>
    </h4>
    <AnimatePresence initial={false}>
      {aberto && <m.div id={id} className="trat-painel" role="region" aria-label={t.nome}
        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
        transition={{ duration: .6, ease: EASE }}>
        <div className="trat-painel-dentro">
          <p>{t.descricao}</p>
          <div className="trat-acoes">
            <a className="trat-cta" href={waLink(MENSAGENS.tratamento(t.mensagem ?? t.nome))} target="_blank" rel="noopener noreferrer">
              <span className="trat-cta-icone"><BrandIcon brand="whatsapp" /></span>
              {CUIDADOS.perguntar} {t.nome}
            </a>
            {t.resultados && <a className="link-linha trat-resultados" href="#resultados"
              onClick={() => window.dispatchEvent(new CustomEvent('gs:resultados', { detail: t.resultados }))}>
              {CUIDADOS.verResultados}<ArrowDown aria-hidden="true" strokeWidth={1.6} />
            </a>}
          </div>
        </div>
      </m.div>}
    </AnimatePresence>
  </li>
}

/** Catálogo em capítulos: índice fixo à esquerda (computador) e linhas que abrem com a descrição. */
export default function Cuidados() {
  const [aberto, setAberto] = useState<string | null>(null)
  const [ativo, setAtivo] = useState(CAPITULOS[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setAtivo(e.target.id.replace('cap-', '')) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    CAPITULOS.forEach(c => { const el = document.getElementById(`cap-${c.id}`); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const total = CAPITULOS.reduce((s, c) => s + c.itens.length, 0)

  return <section id="cuidados" className="cuidados secao papel" aria-labelledby="cuidados-titulo">
    <div className="conteiner">
      <div className="cuidados-cabeca">
        <div>
          <Revelar><p className="rotulo">{CUIDADOS.rotulo}</p></Revelar>
          <Titulo id="cuidados-titulo" className="titulo" linhas={CUIDADOS.titulo} destaque={[1]} />
        </div>
        <Revelar delay={.1}><p className="lead">{CUIDADOS.texto}</p></Revelar>
      </div>

      <div className="cuidados-grade">
        <nav className="cuidados-indice" aria-label="Capítulos dos cuidados">
          <p className="cuidados-total"><span className="num">{total}</span> cuidados em 4 capítulos</p>
          <ol>
            {CAPITULOS.map(c => <li key={c.id}>
              <a href={`#cap-${c.id}`} className={ativo === c.id ? 'is-ativo' : undefined} aria-current={ativo === c.id ? 'true' : undefined}>
                <span className="num">{c.numero}</span>
                <span className="cuidados-indice-nome">{c.titulo}</span>
                <span className="cuidados-indice-qtd">{c.itens.length}</span>
              </a>
            </li>)}
          </ol>
        </nav>

        <div className="cuidados-capitulos">
          {CAPITULOS.map(c => <section key={c.id} id={`cap-${c.id}`} className="capitulo" aria-labelledby={`cap-${c.id}-titulo`}>
            <Revelar className="capitulo-cabeca">
              <span className="num capitulo-num" aria-hidden="true">{c.numero}</span>
              <div>
                <h3 id={`cap-${c.id}-titulo`} className="capitulo-titulo">{c.titulo}</h3>
                <p className="capitulo-resumo">{c.resumo}</p>
              </div>
            </Revelar>
            <ul className="capitulo-lista">
              {c.itens.map(t => {
                const chave = `${c.id}:${t.nome}`
                return <Item key={chave} t={t} aberto={aberto === chave} alternar={() => setAberto(a => a === chave ? null : chave)} />
              })}
            </ul>
          </section>)}
        </div>
      </div>
    </div>
  </section>
}
