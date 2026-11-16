import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Droplet, Heart, Instagram, MapPin, Menu, Plus, ScanFace, X } from 'lucide-react'
import { m } from 'motion/react'
import { ENDERECO_COMPLETO, SITE } from './config/site'
import { whatsapp } from './lib/whatsapp'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Botao } from './components/ui/Botao'
import BrandIcon from './components/ui/BrandIcon'
import Revelar, { EASE } from './components/ui/Revelar'

const pasta = '/lesvivee'
const nav = [
  { href: '#clinica', label: 'A clínica' },
  { href: '#cuidados', label: 'Cuidados' },
  { href: '#avaliacao', label: 'Avaliação' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#endereco', label: 'Endereço' },
]
const cuidados = [
  {
    id: 'facial', title: 'Estética facial', destaque: 'Cuidado para a sua pele.',
    icon: ScanFace, image: 'facial.webp',
    alt: 'Detalhe de um atendimento facial do acervo profissional da Les Vivée',
    text: 'Textura, poros e sensibilidade são pontos que você pode levar para a avaliação. A equipe explica as opções de cuidado para o seu rosto e o que cada procedimento envolve.',
    assuntos: ['Limpeza de pele', 'Dermaplanagem', 'Cuidados com textura e acne'],
    tema: 'estética facial',
  },
  {
    id: 'corporal', title: 'Estética corporal', destaque: 'Um plano para suas prioridades.',
    icon: Heart, image: 'cuidado-corporal.webp', alt: '',
    text: 'Converse sobre as áreas que deseja cuidar, suas expectativas e sua rotina. A avaliação é o momento de entender quais opções de cuidado corporal fazem sentido para você.',
    assuntos: ['Avaliação das áreas de interesse', 'Cuidados com a pele do corpo', 'Opções para celulite'],
    tema: 'estética corporal',
  },
  {
    id: 'capilar', title: 'Cuidado capilar', destaque: 'Atenção aos fios e ao couro cabeludo.',
    icon: Droplet, image: 'capilar.webp',
    alt: 'Aplicação de luz no couro cabeludo em registro compartilhado pela clínica',
    text: 'Queda, afinamento e mudanças no couro cabeludo podem ter causas diferentes. Na avaliação, conte quando começou a notar a mudança e quais tratamentos já fez.',
    assuntos: ['Queda de cabelo', 'Afinamento dos fios', 'Cuidados com o couro cabeludo'],
    tema: 'avaliação capilar',
  },
] as const

const registros = [
  { image: 'capilar.webp', title: 'Atendimento capilar', alt: 'Detalhe de uma aplicação de luz no couro cabeludo apresentada no perfil da Les Vivée Clinic' },
  { image: 'facial.webp', title: 'Cuidado facial', alt: 'Mãos com luvas e ponteira utilizadas em um atendimento facial' },
  { image: 'labial.webp', title: 'Cuidado labial', alt: 'Recorte de lábios de uma publicação de cuidado labial do acervo profissional' },
  { image: 'bastidores.webp', title: 'Equipe em atendimento', alt: 'Profissional com luvas, óculos e máscara em cena publicada pela Les Vivée Clinic' },
]

const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO_COMPLETO)}`

function Topo() {
  const [aberto, setAberto] = useState(false)
  const botao = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!aberto) return
    function escape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setAberto(false)
      botao.current?.focus()
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [aberto])
  return <header className="topo">
    <div className="container topo-conteudo">
      <a className="topo-marca" href="#inicio" aria-label="Les Vivée Clinic, início" onClick={() => setAberto(false)}>
        <img src={`${pasta}/marca-navbar.webp`} width="420" height="238" alt="" />
      </a>
      <nav className="nav-desktop" aria-label="Navegação principal">
        {nav.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <a href={whatsapp()} className="topo-cta" target="_blank" rel="noreferrer">Agendar avaliação <ArrowUpRight aria-hidden="true" size={16} /></a>
      <button ref={botao} className="nav-gatilho" type="button" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={aberto} aria-controls="nav-mobile" onClick={() => setAberto(a => !a)}>
        {aberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </div>
    <nav className="nav-mobile" id="nav-mobile" hidden={!aberto} aria-label="Menu móvel">
      {nav.map(item => <a href={item.href} key={item.href} onClick={() => setAberto(false)}>{item.label}<ArrowRight size={16} aria-hidden="true" /></a>)}
      <a href={whatsapp()} target="_blank" rel="noreferrer" onClick={() => setAberto(false)}>Agendar avaliação<ArrowUpRight size={16} aria-hidden="true" /></a>
    </nav>
  </header>
}

function Hero() {
  const { reduced } = useMotionPreferences()
  return <section className="hero" id="inicio" aria-labelledby="hero-titulo">
    <picture className="hero-foto" aria-hidden="true">
      <source media="(max-width: 700px)" srcSet={`${pasta}/hero-mobile.webp`} />
      <img src={`${pasta}/hero-desktop.webp`} width="1600" height="900" alt="" fetchPriority="high" decoding="async" />
    </picture>
    <div className="container hero-interno">
      <m.div className="hero-marca"
        initial={reduced ? false : { opacity: 0, clipPath: 'inset(12% 0 20% 0)', y: 9 }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)', y: 0 }}
        transition={{ duration: reduced ? 0 : 1.02, ease: EASE }}>
        <img src={`${pasta}/marca-hero.webp`} width="840" height="476" alt={SITE.nome} />
      </m.div>
      <div className="hero-texto">
        <p className="rotulo hero-rotulo">Estética avançada no Tatuapé</p>
        <h1 id="hero-titulo">Estética que respeita <em>sua beleza.</em></h1>
        <p className="hero-desc">Cuidados faciais, corporais e capilares, com um plano que começa na sua avaliação.</p>
        <div className="hero-acoes">
          <Botao href={whatsapp()} variante="claro">Agendar avaliação</Botao>
          <a href="#cuidados" className="hero-link">Conhecer os cuidados <ArrowRight aria-hidden="true" size={16} /></a>
        </div>
      </div>
    </div>
  </section>
}

function Clinica() {
  return <section className="secao sobre" id="clinica" aria-labelledby="sobre-titulo">
    <div className="container sobre-grade">
      <Revelar className="secao-intro sobre-texto">
        <p className="rotulo">Les Vivée Clinic · Tatuapé</p>
        <h2 id="sobre-titulo">O cuidado começa <em>com uma conversa.</em></h2>
        <p>A Les Vivée reúne estética facial, corporal e capilar no Tatuapé, em São Paulo. Na avaliação, você pode contar o que deseja cuidar, explicar sua rotina e conversar sobre as opções com a equipe.</p>
        <a className="linha-link" href="#avaliacao">Como é a primeira avaliação <ArrowRight size={16} aria-hidden="true" /></a>
      </Revelar>
      <Revelar as="figure" className="sobre-foto">
        <img src={`${pasta}/bastidores.webp`} width="420" height="315" alt="Profissional da Les Vivée Clinic durante atendimento" loading="lazy" decoding="async" />
        <figcaption>Registro publicado pela clínica</figcaption>
      </Revelar>
    </div>
  </section>
}

function Cuidados() {
  return <section className="cuidados" id="cuidados" aria-labelledby="cuidados-titulo">
    <div className="secao cuidados-intro">
      <div className="container cuidados-grade">
        <Revelar className="secao-intro">
          <p className="rotulo">Áreas de atendimento</p>
          <h2 id="cuidados-titulo">Pele, corpo <em>e cabelo.</em></h2>
          <p>Escolha a área sobre a qual você quer saber mais.</p>
        </Revelar>
        <nav className="cuidados-lista" aria-label="Áreas de atendimento">
          {cuidados.map(({ id, title, icon: Icon }, i) =>
            <Revelar key={id} delay={i * .05}>
              <a className="cuidado" href={`#${id}`}>
                <span className="cuidado-icone" aria-hidden="true"><Icon size={22} strokeWidth={1.35} /></span>
                <span>{title}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </Revelar>)}
        </nav>
      </div>
    </div>
    {cuidados.map(({ id, title, destaque, image, alt, text, assuntos, tema }) =>
      <section key={id} id={id} className={`secao tratamento tratamento-${id}`} aria-labelledby={`titulo-${id}`}>
        <div className="container tratamento-grade">
          <Revelar as="figure" className="tratamento-foto">
            <img src={`${pasta}/${image}`} width={id === 'corporal' ? 950 : 420} height={id === 'corporal' ? 710 : 315}
              alt={alt} loading="lazy" decoding="async" />
          </Revelar>
          <Revelar className="secao-intro tratamento-texto">
            <p className="rotulo">{title}</p>
            <h2 id={`titulo-${id}`}>{destaque}</h2>
            <p>{text}</p>
            <ul className="tratamento-topicos">
              {assuntos.map(item => <li key={item}>{item}</li>)}
            </ul>
            <a className="linha-link" href={whatsapp(tema)} target="_blank" rel="noreferrer">Conversar sobre {tema} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </Revelar>
        </div>
      </section>
    )}
  </section>
}

const passos = [
  { titulo: 'Conte o que você procura', corpo: 'Chame a equipe no WhatsApp e diga se quer conversar sobre rosto, corpo ou couro cabeludo.' },
  { titulo: 'Combine a avaliação', corpo: 'A equipe informa a disponibilidade e orienta você sobre o que levar ou preparar para a visita.' },
  { titulo: 'Defina os próximos passos', corpo: 'Converse sobre as opções, tire dúvidas sobre sessões e cuidados e decida como deseja seguir.' },
]

function Avaliacao() {
  return <section className="secao avaliacao" id="avaliacao" aria-labelledby="avaliacao-titulo">
    <div className="container">
      <Revelar className="secao-intro">
        <h2 id="avaliacao-titulo">Sua primeira <em>avaliação.</em></h2>
        <p>Veja o que acontece desde a primeira mensagem até a conversa na clínica.</p>
      </Revelar>
      <ol className="avaliacao-passos">
        {passos.map(({ titulo, corpo }, i) => <Revelar as="li" key={titulo} delay={i * .08}>
          <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3>{titulo}</h3>
          <p>{corpo}</p>
        </Revelar>)}
      </ol>
      <Botao href={whatsapp()}>Marcar minha avaliação</Botao>
    </div>
  </section>
}

const perguntas = [
  { pergunta: 'Como faço para agendar?', resposta: 'Envie uma mensagem pelo WhatsApp e diga qual área quer avaliar. A equipe confirma a disponibilidade e combina o horário com você.' },
  { pergunta: 'Posso pedir uma avaliação capilar mesmo sem saber por que meu cabelo está caindo?', resposta: 'Sim. Conte à equipe quando a queda começou, o que mudou na sua rotina e se já fez algum tratamento. A avaliação ajuda a orientar os próximos passos.' },
  { pergunta: 'Onde consulto valores e formas de pagamento?', resposta: 'Pergunte pelo WhatsApp antes de agendar. A equipe pode informar as condições e explicar o que depende de avaliação.' },
  { pergunta: 'Preciso me preparar antes da visita?', resposta: 'Confirme com a equipe no agendamento. Informe se estiver em tratamento ou usando medicamentos e leve as orientações que já recebeu, se for o caso.' },
  { pergunta: 'Onde fica a clínica?', resposta: 'A Les Vivée fica na Rua Padre Estevão Pernet, 718, no Tatuapé, em São Paulo. Use o mapa abaixo para traçar a rota.' },
]

function Duvidas() {
  return <section className="secao perguntas" id="duvidas" aria-labelledby="perguntas-titulo">
    <div className="container perguntas-grade">
      <Revelar className="secao-intro">
        <h2 id="perguntas-titulo">Dúvidas <em>frequentes.</em></h2>
        <a className="linha-link" href={whatsapp()} target="_blank" rel="noreferrer">Perguntar no WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
      </Revelar>
      <div className="perguntas-lista">
        {perguntas.map(({ pergunta, resposta }) => <details key={pergunta}>
          <summary>{pergunta}<Plus aria-hidden="true" size={16} /></summary>
          <p>{resposta}</p>
        </details>)}
      </div>
    </div>
  </section>
}

function Galeria() {
  const lista = useRef<HTMLUListElement>(null)
  const { reduced } = useMotionPreferences()
  const [bordas, setBordas] = useState({ inicio: true, fim: false })
  useEffect(() => {
    const el = lista.current
    if (!el) return
    const update = () => setBordas({ inicio: el.scrollLeft < 2, fim: el.scrollWidth - el.clientWidth - el.scrollLeft < 2 })
    const obs = new ResizeObserver(update)
    obs.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => { obs.disconnect(); el.removeEventListener('scroll', update) }
  }, [])
  function mover(dir: number) {
    const el = lista.current
    const a = el?.children[0] as HTMLElement | undefined
    const b = el?.children[1] as HTMLElement | undefined
    if (!el || !a || !b) return
    el.scrollBy({ left: (b.offsetLeft - a.offsetLeft) * dir, behavior: reduced ? 'instant' : 'smooth' })
  }
  return <section className="secao clinica" id="galeria-clinica" aria-labelledby="clinica-titulo">
    <div className="container">
      <div className="clinica-topo">
        <Revelar className="secao-intro">
          <h2 id="clinica-titulo">Nos atendimentos <em>da Les Vivée.</em></h2>
          <p>Registros de atendimentos compartilhados no perfil da clínica e no acervo da equipe.</p>
        </Revelar>
        <div className="galeria-controles">
          <button type="button" aria-label="Foto anterior" aria-controls="galeria" disabled={bordas.inicio} onClick={() => mover(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          <button type="button" aria-label="Próxima foto" aria-controls="galeria" disabled={bordas.fim} onClick={() => mover(1)}><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      <ul className="galeria" ref={lista} id="galeria" aria-label="Galeria dos atendimentos" tabIndex={0} onKeyDown={e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
        e.preventDefault()
        mover(e.key === 'ArrowLeft' ? -1 : 1)
      }}>
        {registros.map(foto => <li key={foto.image}>
          <figure><img src={`${pasta}/${foto.image}`} width="420" height="315" alt={foto.alt} loading="lazy" decoding="async" /><figcaption>{foto.title}</figcaption></figure>
        </li>)}
      </ul>
      <a className="linha-link" href={SITE.instagram} target="_blank" rel="noreferrer"><Instagram size={17} aria-hidden="true" /> Seguir @lesvivee <ArrowUpRight size={15} aria-hidden="true" /></a>
    </div>
  </section>
}

function Endereco() {
  return <section className="secao visita" id="endereco" aria-labelledby="visita-titulo">
    <div className="container visita-grade">
      <Revelar className="secao-intro">
        <p className="rotulo">Endereço e agendamento</p>
        <h2 id="visita-titulo">Seu próximo passo <em>no Tatuapé.</em></h2>
        <p>Fale com a equipe para agendar sua avaliação e confirmar o horário do atendimento.</p>
        <div className="visita-acoes">
          <Botao href={whatsapp()} variante="claro">Falar no WhatsApp</Botao>
          <a href={mapa} className="linha-link" target="_blank" rel="noreferrer">Traçar rota <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </Revelar>
      <Revelar className="visita-endereco">
        <iframe title="Mapa da Les Vivée Clinic no Tatuapé" loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(ENDERECO_COMPLETO)}&z=16&output=embed`}
          referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <div className="visita-cartao">
          <MapPin size={21} aria-hidden="true" />
          <address><strong>{SITE.rua}</strong><span>{SITE.bairro}, {SITE.cidade} – {SITE.uf}</span></address>
          <a href={whatsapp()} target="_blank" rel="noreferrer">{SITE.whatsappExibicao}</a>
        </div>
      </Revelar>
    </div>
  </section>
}

function Rodape() {
  return <footer className="rodape">
    <div className="container rodape-grade">
      <a href="#inicio" aria-label="Les Vivée Clinic, voltar ao início"><img src={`${pasta}/marca-navbar.webp`} width="420" height="238" alt="" loading="lazy" /></a>
      <nav aria-label="Links do rodapé">
        <a href="#cuidados">Cuidados</a>
        <a href="#galeria-clinica">Galeria</a>
        <a href="#endereco">Endereço</a>
      </nav>
      <span>© {new Date().getFullYear()} Les Vivée Clinic</span>
      <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Les Vivée Clinic no Instagram"><Instagram size={20} aria-hidden="true" /></a>
    </div>
  </footer>
}

function Site() {
  useSmoothScroll(true)
  return <>
    <a className="pular-link" href="#conteudo">Pular para o conteúdo</a>
    <Topo />
    <main id="conteudo"><Hero /><Clinica /><Cuidados /><Avaliacao /><Galeria /><Duvidas /><Endereco /></main>
    <Rodape />
    <a className="whatsapp-fab" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Agendar avaliação pelo WhatsApp"><BrandIcon brand="whatsapp" /></a>
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}
