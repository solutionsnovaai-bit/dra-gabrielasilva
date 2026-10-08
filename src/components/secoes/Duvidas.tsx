import { useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { DUVIDAS } from '../../content/textos'
import { MENSAGENS } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { Botao } from '../ui/Botao'
import Revelar, { EASE, Titulo } from '../ui/Revelar'

function Pergunta({ pergunta, resposta, aberta, alternar, i }: { pergunta: string; resposta: string; aberta: boolean; alternar: () => void; i: number }) {
  const { reduced } = useMotionPreferences()
  const id = useId()
  return <Revelar as="li" delay={i * .05} className={`duvida ${aberta ? 'is-aberta' : ''}`}>
    <h3>
      <button type="button" className="duvida-botao" aria-expanded={aberta} aria-controls={id} onClick={alternar}>
        <span>{pergunta}</span>
        <span className="trat-mais" aria-hidden="true"><i /><i /></span>
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {aberta && <m.div id={id} role="region" aria-label={pergunta} className="duvida-painel"
        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }} animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: .55, ease: EASE }}>
        <p>{resposta}</p>
      </m.div>}
    </AnimatePresence>
  </Revelar>
}

export default function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0)
  return <section id="duvidas" className="duvidas secao papel" aria-labelledby="duvidas-titulo">
    <div className="conteiner duvidas-grade">
      <div className="duvidas-lado">
        <Revelar><p className="rotulo">{DUVIDAS.rotulo}</p></Revelar>
        <Titulo id="duvidas-titulo" className="titulo" linhas={DUVIDAS.titulo} destaque={[1]} />
        <Revelar delay={.1}><p className="lead">{DUVIDAS.texto}</p></Revelar>
        <Revelar delay={.15}><Botao href={waLink(MENSAGENS.duvida)} rotuloAcessivel={`${DUVIDAS.cta} (abre em nova aba)`}>{DUVIDAS.cta}</Botao></Revelar>
      </div>
      <ul className="duvidas-lista">
        {DUVIDAS.itens.map((d, i) => <Pergunta key={d.pergunta} i={i} {...d} aberta={aberta === i} alternar={() => setAberta(a => a === i ? null : i)} />)}
      </ul>
    </div>
  </section>
}
