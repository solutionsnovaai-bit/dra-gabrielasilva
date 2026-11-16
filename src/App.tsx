import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Droplet, Heart, Instagram, MapPin, Menu, ScanFace, X } from 'lucide-react'
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
  { href: '#cuidados', label: 'Cuidados' },
  { href: '#clinica', label: 'A clínica' },
  { href: '#endereco', label: 'Endereço' },
]
const cuidados = [
  { title: 'Faciais', icon: ScanFace, text: 'Cuidados com a pele, limpeza de pele e avaliação de tratamentos para o rosto.', tema: 'cuidados faciais' },
  { title: 'Corporais', icon: Heart, text: 'Converse sobre suas prioridades e conheça as opções de cuidado corporal.', tema: 'cuidados corporais' },
  { title: 'Capilares', icon: Droplet, text: 'Avaliação capilar para conversar sobre queda de cabelo, afinamento dos fios e cuidados com o couro cabeludo.', tema: 'avaliação capilar' },
]

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
        <img src={`${pasta}/logo-marrom.svg`} width="156" height="90" alt="" />
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
        <img src={`${pasta}/logo-champagne.svg`} width="300" height="173" alt={SITE.nome} />
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

function Cuidados() {
  return <section className="secao cuidados" id="cuidados" aria-labelledby="cuidados-titulo">
    <div className="container cuidados-grade">
      <Revelar className="secao-intro">
        <p className="rotulo">Cuidados</p>
        <h2 id="cuidados-titulo">Um plano pensado <em>para você.</em></h2>
        <p>Na avaliação, conte à equipe o que você deseja cuidar e tire suas dúvidas sobre as opções.</p>
      </Revelar>
      <div className="cuidados-lista">
        {cuidados.map(({ title, icon: Icon, text, tema }, i) =>
          <Revelar key={title} delay={i * .08} className="cuidado">
            <span className="cuidado-icone" aria-hidden="true"><Icon size={23} strokeWidth={1.35} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
            <a href={whatsapp(tema)} target="_blank" rel="noreferrer" aria-label={`Saiba mais sobre ${tema} no WhatsApp`}><ArrowUpRight size={20} aria-hidden="true" /></a>
          </Revelar>)}
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
  return <section className="secao clinica" id="clinica" aria-labelledby="clinica-titulo">
    <div className="container">
      <div className="clinica-topo">
        <Revelar className="secao-intro">
          <p className="rotulo">A clínica</p>
          <h2 id="clinica-titulo">Por dentro da <em>Les Vivée.</em></h2>
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
        <MapPin size={24} aria-hidden="true" />
        <address><strong>{SITE.rua}</strong><span>{SITE.bairro}, {SITE.cidade} – {SITE.uf}</span></address>
        <a href={whatsapp()} target="_blank" rel="noreferrer">{SITE.whatsappExibicao}</a>
      </Revelar>
    </div>
  </section>
}

function Rodape() {
  return <footer className="rodape">
    <div className="container rodape-grade">
      <a href="#inicio" aria-label="Les Vivée Clinic, voltar ao início"><img src={`${pasta}/logo-marrom.svg`} width="142" height="82" alt="" loading="lazy" /></a>
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
    <main id="conteudo"><Hero /><Cuidados /><Galeria /><Endereco /></main>
    <Rodape />
    <a className="whatsapp-fab" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Agendar avaliação pelo WhatsApp"><BrandIcon brand="whatsapp" /></a>
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}
