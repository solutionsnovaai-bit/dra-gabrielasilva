import { ArrowUpRight } from 'lucide-react'
import { AGENDAR } from '../../content/textos'
import { ENDERECO_LINHA, MENSAGENS, SITE } from '../../config/site'
import { waLink } from '../../lib/whatsapp'
import { linkMapa } from '../../lib/mapa'
import { Monograma } from '../marca/Marca'
import { Botao } from '../ui/Botao'
import Revelar, { Titulo } from '../ui/Revelar'

/** Chamada final, em dourado chapado, com o GS gigante em tom sobre tom. */
export default function Agendar() {
  return <section id="agendar" className="agendar secao" aria-labelledby="agendar-titulo">
    <Monograma className="agendar-gs" />
    <div className="conteiner agendar-grade">
      <div className="agendar-texto">
        <Revelar><p className="rotulo">{AGENDAR.rotulo}</p></Revelar>
        <Titulo id="agendar-titulo" className="titulo agendar-titulo" linhas={AGENDAR.titulo} />
        <Revelar delay={.1}><p className="agendar-lead">{AGENDAR.texto}</p></Revelar>
        <Revelar delay={.18} className="agendar-acoes">
          <Botao href={waLink(MENSAGENS.avaliacao)} rotuloAcessivel={`${AGENDAR.cta} pelo WhatsApp (abre em nova aba)`}>{AGENDAR.cta}</Botao>
        </Revelar>
      </div>
      <Revelar delay={.2} className="agendar-cartao">
        <dl>
          <div><dt>Endereço</dt><dd>{ENDERECO_LINHA}{SITE.endereco.cep ? ` · CEP ${SITE.endereco.cep}` : ''}</dd></div>
          <div><dt>Atendimento</dt><dd>{SITE.atendimento}</dd></div>
          <div><dt>WhatsApp</dt><dd><a href={waLink()} target="_blank" rel="noopener noreferrer">{SITE.whatsappExibicao}</a></dd></div>
          {SITE.instagram && <div><dt>Instagram</dt><dd><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a></dd></div>}
        </dl>
        <a className="link-linha agendar-mapa" href={linkMapa} target="_blank" rel="noopener noreferrer">{AGENDAR.mapa}<ArrowUpRight aria-hidden="true" strokeWidth={1.6} /></a>
      </Revelar>
    </div>
  </section>
}
