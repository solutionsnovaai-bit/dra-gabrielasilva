import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { m, useScroll, useTransform } from 'motion/react'
import { NAV, RODAPE } from '../../content/textos'
import { ENDERECO_LINHA, MENSAGENS, SITE } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { linkMapa } from '../../lib/mapa'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { Assinatura, Monograma, Nome } from '../marca/Marca'
import { Botao } from '../ui/Botao'

export default function Rodape() {
  const { paused, toggle, reduced } = useMotionPreferences()
  const ano = new Date().getFullYear()
  const gigante = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: gigante, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['62%', '0%'])
  return <footer className="rodape tema-escuro">
    <div className="conteiner">
      <div className="rodape-topo">
        <div className="rodape-marca">
          <Monograma className="rodape-gs" />
          <p className="rodape-frase">{RODAPE.frase.map((l, i) => <span key={i} className={i ? 'ouro' : undefined}>{l}</span>)}</p>
        </div>
        <Botao href={waLink(MENSAGENS.avaliacao)} variante="ouro" rotuloAcessivel="Agendar avaliação pelo WhatsApp (abre em nova aba)">Agendar avaliação</Botao>
      </div>

      <div className="rodape-colunas">
        <nav aria-label="Rodapé">
          <p className="rodape-titulo">Navegue</p>
          <ul>{NAV.map(n => <li key={n.href}><a href={n.href}>{n.rotulo}</a></li>)}<li><a href="#agendar">Agendar</a></li></ul>
        </nav>
        <div>
          <p className="rodape-titulo">Contato</p>
          <ul>
            <li><a href={waLink(MENSAGENS.padrao)} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappExibicao}</a></li>
            {SITE.instagram && <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a></li>}
            <li><a href={linkMapa} target="_blank" rel="noopener noreferrer">{ENDERECO_LINHA}</a></li>
          </ul>
        </div>
        <div>
          <p className="rodape-titulo">Atendimento</p>
          <ul><li>{SITE.atendimento}</li><li>{SITE.areas}</li></ul>
        </div>
      </div>

      {/* Assinatura gigante: o nome do logotipo ocupa a largura toda e "assenta" no fim da página. */}
      <div ref={gigante} className="rodape-gigante" aria-hidden="true">
        <m.div style={reduced ? undefined : { y }}>
          <Nome className="rodape-gigante-nome" />
        </m.div>
      </div>

      <div className="rodape-base">
        <p>© {ano} {SITE.marca} · <Assinatura className="rodape-assinatura" titulo="Estética e Nutrição" /></p>
        <div className="rodape-acoes">
          <button type="button" onClick={toggle} aria-pressed={paused}>{paused ? 'Retomar animações' : 'Pausar animações'}</button>
          <a href="#topo" className="rodape-subir">Voltar ao topo <ArrowUp aria-hidden="true" strokeWidth={1.6} /></a>
        </div>
      </div>
    </div>
  </footer>
}
