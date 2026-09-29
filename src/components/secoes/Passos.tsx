import { motion } from 'motion/react'
import { PASSOS } from '../../content/textos'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import Revelar, { CORTINA, Titulo } from '../ui/Revelar'

/** Como funciona: três passos ligados por um fio que se desenha ao entrar na tela. */
export default function Passos() {
  const { reduced } = useMotionPreferences()
  return <section className="passos secao papel-areia" aria-labelledby="passos-titulo">
    <div className="conteiner">
      <div className="secao-cabeca">
        <Revelar><p className="rotulo">{PASSOS.rotulo}</p></Revelar>
        <Titulo id="passos-titulo" className="titulo" linhas={PASSOS.titulo} destaque={[1]} />
      </div>
      <div className="passos-lista-wrap">
        <motion.span className="passos-fio" aria-hidden="true"
          initial={reduced ? false : { scaleX: 0, scaleY: 0 }} whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, amount: .4 }} transition={{ duration: 1.8, ease: CORTINA }} />
        <ol className="passos-lista">
          {PASSOS.itens.map((p, i) => <Revelar as="li" key={p.numero} delay={.15 + i * .14} className="passo">
            <span className="passo-ponto" aria-hidden="true" />
            <span className="num passo-num">{p.numero}</span>
            <h3 className="passo-titulo">{p.titulo}</h3>
            <p className="passo-texto">{p.texto}</p>
          </Revelar>)}
        </ol>
      </div>
    </div>
  </section>
}
