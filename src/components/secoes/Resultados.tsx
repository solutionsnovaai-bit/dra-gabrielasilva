import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, MouseEvent, PointerEvent as RPointerEvent } from 'react'
import { AnimatePresence, m, useAnimationFrame, useMotionValue } from 'motion/react'
import { ArrowLeft, ArrowRight, Maximize2, Pause, Play, X } from 'lucide-react'
import { RESULTADOS, fotosIntercaladas, srcset } from '../../content/resultados'
import type { FotoResultado, GrupoResultado } from '../../content/resultados'
import { waLink } from '../../lib/whatsapp'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { useSceneActivity } from '../../hooks/useSceneActivity'
import { useMedia } from '../../hooks/useMedia'
import { rolagem } from '../../hooks/useSmoothScroll'
import { Botao } from '../ui/Botao'
import Revelar, { EASE, Titulo } from '../ui/Revelar'

type Item = FotoResultado & { grupo: GrupoResultado }

/** Mantém o deslocamento entre -largura e 0 (o trilho tem cópias lado a lado, então dá a volta sem emenda). */
const envolve = (v: number, w: number) => (w > 0 ? (((v % w) - w) % w) : v)
const textoAlt = (f: Item) => `Antes e depois de ${f.grupo.tratamento}: ${f.area.toLowerCase()}.`

function Fotos({ f, sizes, carregar = 'lazy' }: { f: Item; sizes: string; carregar?: 'lazy' | 'eager' }) {
  return <>
    <picture>
      <source type="image/avif" srcSet={srcset(f, 'avif')} sizes={sizes} />
      <img src={`/resultados/${f.id}-${f.larguras[f.larguras.length - 1]}.webp`} srcSet={srcset(f, 'webp')} sizes={sizes}
        width={f.w} height={f.h} alt={textoAlt(f)} loading={carregar} decoding="async" draggable={false} />
    </picture>
    <span className="res-tag res-antes" aria-hidden="true">Antes</span>
    <span className="res-tag res-depois" aria-hidden="true">Depois</span>
  </>
}

function Cartao({ f, duplicado, carregar, onAbrir }: { f: Item; duplicado: boolean; carregar: 'lazy' | 'eager'; onAbrir: (el: HTMLElement) => void }) {
  const r = f.w / f.h
  const sizes = `(max-width: 767px) 84vw, (max-width: 1023px) ${Math.round(300 * r)}px, ${Math.round(390 * r)}px`
  return <button type="button" className="res-card" style={{ '--ar': r } as CSSProperties}
    tabIndex={duplicado ? -1 : 0} aria-hidden={duplicado || undefined}
    aria-label={`Ampliar: ${f.grupo.tratamento}, ${f.area.toLowerCase()}`}
    onClick={e => onAbrir(e.currentTarget)}>
    <span className="res-foto">
      <Fotos f={f} sizes={sizes} carregar={carregar} />
      <span className="res-ampliar" aria-hidden="true"><Maximize2 strokeWidth={1.6} /></span>
    </span>
    <span className="res-legenda"><span className="res-trat">{f.grupo.curto}</span><span className="res-area">{f.area}</span></span>
  </button>
}

/** Foto ampliada: navegação por setas, teclado e deslize; Esc fecha. */
function Ampliada({ itens, indice, onIr, onFechar }: { itens: Item[]; indice: number; onIr: (i: number) => void; onFechar: () => void }) {
  const { reduced } = useMotionPreferences()
  const fechar = useRef<HTMLButtonElement>(null)
  const toque = useRef<{ x: number; id: number } | null>(null)
  const f = itens[indice]
  const total = itens.length
  const ir = (d: number) => onIr((indice + d + total) % total)

  useEffect(() => {
    document.documentElement.classList.add('travado')
    rolagem.lenis?.stop()
    fechar.current?.focus()
    return () => { document.documentElement.classList.remove('travado'); rolagem.lenis?.start() }
  }, [])
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFechar()
      else if (e.key === 'ArrowRight') ir(1)
      else if (e.key === 'ArrowLeft') ir(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  const r = f.w / f.h
  return <m.div className="amp" role="dialog" aria-modal="true" aria-label={`${f.grupo.tratamento}, foto ${indice + 1} de ${total}`} data-lenis-prevent
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: EASE }}
    onPointerDown={e => { toque.current = { x: e.clientX, id: e.pointerId } }}
    onPointerUp={e => {
      const t = toque.current; toque.current = null
      if (!t || t.id !== e.pointerId) return
      const dx = e.clientX - t.x
      if (Math.abs(dx) > 60) ir(dx < 0 ? 1 : -1)
    }}
    onClick={e => { if (e.target === e.currentTarget) onFechar() }}>
    <button ref={fechar} type="button" className="amp-fechar" onClick={onFechar} aria-label="Fechar"><X strokeWidth={1.5} /></button>
    <AnimatePresence mode="wait" initial={false}>
      <m.figure key={f.id} className="amp-figura" style={{ '--ar': r, '--arm': r / 2 } as CSSProperties}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }} transition={{ duration: .5, ease: EASE }}>
        <div className="amp-foto res-foto">
          <Fotos f={f} sizes={`min(92vw, ${Math.round(64 * r)}vh)`} carregar="eager" />
        </div>
        {/* No celular em pé, antes em cima e depois embaixo: cada metade na largura toda. */}
        <div className="amp-pilha">
          {(['antes', 'depois'] as const).map(lado => <div key={lado} className={`amp-meia amp-${lado}`}>
            <picture>
              <source type="image/avif" srcSet={srcset(f, 'avif')} sizes="184vw" />
              <img src={`/resultados/${f.id}-${f.larguras[f.larguras.length - 1]}.webp`} srcSet={srcset(f, 'webp')} sizes="184vw"
                width={f.w} height={f.h} alt="" decoding="async" draggable={false} />
            </picture>
            <span className={`res-tag res-${lado}`} aria-hidden="true">{lado === 'antes' ? 'Antes' : 'Depois'}</span>
          </div>)}
        </div>
        <figcaption className="amp-legenda">
          <div>
            <p className="amp-trat">{f.grupo.tratamento}</p>
            <p className="amp-area">{f.area}</p>
          </div>
          <ul className="amp-protocolo">{f.grupo.protocolo.map(p => <li key={p}>{p}</li>)}</ul>
        </figcaption>
      </m.figure>
    </AnimatePresence>
    <div className="amp-nav">
      <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior"><ArrowLeft strokeWidth={1.5} /></button>
      <span className="num amp-contador" aria-live="polite">{String(indice + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      <button type="button" onClick={() => ir(1)} aria-label="Próxima foto"><ArrowRight strokeWidth={1.5} /></button>
    </div>
  </m.div>
}

/**
 * Antes e depois em carrossel que anda sozinho, devagar e sem fim.
 * Para com o mouse em cima, com o foco do teclado e no botão "Pausar"; dá para arrastar (com inércia)
 * no mouse e no dedo, sem atrapalhar a rolagem vertical. Com "reduzir movimento", vira uma fileira rolável.
 */
export default function Resultados() {
  const { reduced } = useMotionPreferences()
  const celular = useMedia('(max-width: 767px)')
  const palco = useRef<HTMLDivElement>(null)
  const primeiroSet = useRef<HTMLDivElement>(null)
  const ativo = useSceneActivity(palco)
  const [filtro, setFiltro] = useState('todos')
  const [pausado, setPausado] = useState(false)
  const [aberto, setAberto] = useState<number | null>(null)
  const [copias, setCopias] = useState(2)
  /* As fotos ficam recortadas pelo palco (overflow), então o lazy do navegador só carregaria quando cada uma
     já estivesse entrando na tela. Perto da seção, carrega todas de uma vez (são leves). */
  const [carregar, setCarregar] = useState<'lazy' | 'eager'>('lazy')
  useEffect(() => {
    const el = palco.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCarregar('eager'); io.disconnect() } }, { rootMargin: '1200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const origem = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const s = useRef({ largura: 0, vel: 0, hover: false, foco: false, arrastando: false, id: -1, travado: '' as '' | 'h' | 'v', moveu: false, x0: 0, y0: 0, trilho0: 0, ultX: 0, ultT: 0, velArr: 0 })

  const grupoAtual = RESULTADOS.grupos.find(g => g.id === filtro)
  const itens: Item[] = useMemo(() => {
    const g = RESULTADOS.grupos.find(gr => gr.id === filtro)
    return g ? g.fotos.map(f => ({ ...f, grupo: g })) : fotosIntercaladas(RESULTADOS.grupos)
  }, [filtro])

  /* Mede a largura de um conjunto e decide quantas cópias são necessárias para cobrir a tela. */
  useLayoutEffect(() => {
    const el = primeiroSet.current
    if (!el) return
    const medir = () => {
      s.current.largura = el.offsetWidth
      setCopias(reduced ? 1 : Math.max(2, Math.ceil(window.innerWidth / Math.max(el.offsetWidth, 1)) + 1))
      x.set(envolve(x.get(), el.offsetWidth))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [itens, reduced, x])

  useEffect(() => { x.set(0); s.current.vel = 0 }, [filtro, x])

  /* Links "Ver antes e depois" do catálogo escolhem o tratamento aqui. */
  useEffect(() => {
    const escolher = (e: Event) => { const id = (e as CustomEvent<string>).detail; if (RESULTADOS.grupos.some(g => g.id === id)) setFiltro(id) }
    window.addEventListener('gs:resultados', escolher)
    return () => window.removeEventListener('gs:resultados', escolher)
  }, [])

  const parado = pausado || aberto !== null
  useAnimationFrame((_, delta) => {
    const st = s.current
    if (!ativo || reduced || st.arrastando) return
    const dt = Math.min(delta, 50) / 1000
    const base = celular ? -26 : -36
    const alvo = parado || st.hover || st.foco ? 0 : base
    const rapido = Math.abs(st.vel) > Math.abs(base) * 1.5
    st.vel += (alvo - st.vel) * (1 - Math.exp(-dt * (rapido ? 2.4 : 3.4)))
    if (alvo === 0 && Math.abs(st.vel) < .02) return
    x.set(envolve(x.get() + st.vel * dt, st.largura))
  })

  /* Arrastar: no mouse começa na hora; no dedo, só quando o gesto é claramente horizontal. */
  const baixo = (e: RPointerEvent) => {
    if (reduced || e.button > 0) return
    const st = s.current
    Object.assign(st, { id: e.pointerId, x0: e.clientX, y0: e.clientY, trilho0: x.get(), ultX: e.clientX, ultT: performance.now(), velArr: 0, moveu: false, travado: e.pointerType === 'mouse' ? 'h' : '' })
    if (st.travado === 'h') st.arrastando = true
  }
  const mover = (e: RPointerEvent) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    const dx = e.clientX - st.x0, dy = e.clientY - st.y0
    if (!st.travado) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { st.travado = 'h'; st.arrastando = true }
      else if (Math.abs(dy) > 8) { st.travado = 'v'; return }
      else return
    }
    if (st.travado !== 'h') return
    if (Math.abs(dx) > 6 && !st.moveu) { st.moveu = true; palco.current?.setPointerCapture(e.pointerId) }
    const agora = performance.now()
    st.velArr = st.velArr * .55 + ((e.clientX - st.ultX) / Math.max(1, agora - st.ultT)) * 1000 * .45
    st.ultX = e.clientX; st.ultT = agora
    x.set(envolve(st.trilho0 + dx, st.largura))
  }
  const soltar = (e: RPointerEvent) => {
    const st = s.current
    if (e.pointerId !== st.id) return
    if (st.arrastando && st.moveu) st.vel = Math.max(-2200, Math.min(2200, st.velArr))
    st.arrastando = false; st.id = -1; st.travado = ''
  }
  const cliqueCaptura = (e: MouseEvent) => { if (s.current.moveu) { e.preventDefault(); e.stopPropagation(); s.current.moveu = false } }
  /* Foco pelo teclado: para e traz o cartão para a tela. */
  const focou = (e: FocusEvent) => {
    const alvo = e.target as HTMLElement
    /* só o foco de teclado para o carrossel (clique de mouse também foca o botão, mas não deve travar) */
    if (!alvo.matches(':focus-visible')) return
    s.current.foco = true
    const card = alvo.closest<HTMLElement>('.res-card')
    if (!card || reduced) return
    x.set(envolve(-(card.offsetLeft - 24), s.current.largura))
  }
  const empurrar = (d: number) => { s.current.vel = d * (celular ? 900 : 1300) }

  const abrir = (el: HTMLElement, i: number) => { origem.current = el; setAberto(i) }
  const fecharAmp = () => { setAberto(null); window.setTimeout(() => origem.current?.focus({ preventScroll: true }), 50) }
  const contagem = (id: string) => RESULTADOS.grupos.find(g => g.id === id)?.fotos.length ?? 0
  const totalFotos = RESULTADOS.grupos.reduce((n, g) => n + g.fotos.length, 0)

  return <section id="resultados" className="resultados secao papel" aria-labelledby="resultados-titulo">
    <div className="conteiner resultados-cabeca">
      <div className="resultados-titulo-col">
        <Revelar><p className="rotulo">{RESULTADOS.rotulo}</p></Revelar>
        <Titulo id="resultados-titulo" className="titulo" linhas={RESULTADOS.titulo} destaque={[1]} />
        <Revelar delay={.08}><p className="lead">{RESULTADOS.texto}</p></Revelar>
      </div>
      <div className="resultados-protocolos">
        {RESULTADOS.grupos.map((g, i) => <Revelar key={g.id} delay={.1 + i * .08} className={`protocolo ${filtro === g.id ? 'is-ativo' : ''}`}>
          <h3 className="protocolo-nome">{g.tratamento}</h3>
          <ul className="protocolo-dados">{g.protocolo.map((p, j) => <li key={p}><span className="num">0{j + 1}</span>{p}</li>)}</ul>
        </Revelar>)}
      </div>
    </div>

    <div className="conteiner resultados-barra">
      <div className="resultados-filtros" role="group" aria-label="Filtrar por tratamento">
        <button type="button" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>{RESULTADOS.todos}<span className="num">{totalFotos}</span></button>
        {RESULTADOS.grupos.map(g => <button key={g.id} type="button" aria-pressed={filtro === g.id} onClick={() => setFiltro(g.id)}>{g.curto}<span className="num">{contagem(g.id)}</span></button>)}
      </div>
      {!reduced && <div className="resultados-controles">
        <button type="button" className="resultados-seta" onClick={() => empurrar(1)} aria-label="Voltar fotos"><ArrowLeft strokeWidth={1.5} /></button>
        <button type="button" className="resultados-seta" onClick={() => empurrar(-1)} aria-label="Avançar fotos"><ArrowRight strokeWidth={1.5} /></button>
        <button type="button" className="resultados-pausa" onClick={() => setPausado(p => !p)} aria-pressed={pausado}>
          {pausado ? <Play strokeWidth={1.6} /> : <Pause strokeWidth={1.6} />}<span>{pausado ? 'Continuar' : 'Pausar'}</span>
        </button>
      </div>}
    </div>

    <div ref={palco} className={`resultados-palco ${reduced ? 'is-estatico' : ''}`}
      role="region" aria-roledescription="carrossel" aria-label={`Antes e depois${grupoAtual ? `: ${grupoAtual.tratamento}` : ''}`}
      tabIndex={reduced ? 0 : -1}
      onPointerDown={baixo} onPointerMove={mover} onPointerUp={soltar} onPointerCancel={soltar}
      onPointerEnter={e => { if (e.pointerType === 'mouse') s.current.hover = true }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') s.current.hover = false; if (!s.current.moveu) soltar(e) }}
      onClickCapture={cliqueCaptura} onFocus={focou} onBlur={() => { s.current.foco = false }}>
      <m.div className="resultados-trilho" style={reduced ? undefined : { x }}>
        {Array.from({ length: copias }, (_, c) => <div key={`${filtro}-${c}`} ref={c === 0 ? primeiroSet : undefined} className="resultados-set">
          {itens.map((f, i) => <Cartao key={f.id} f={f} duplicado={c > 0} carregar={carregar} onAbrir={el => abrir(el, i)} />)}
        </div>)}
      </m.div>
    </div>

    <div className="conteiner resultados-rodape">
      <Botao href={waLink(grupoAtual?.mensagem ?? RESULTADOS.mensagemTodos)} rotuloAcessivel={`${RESULTADOS.cta} (abre o WhatsApp em nova aba)`}>{RESULTADOS.cta}</Botao>
    </div>

    <AnimatePresence>
      {aberto !== null && <Ampliada itens={itens} indice={aberto} onIr={setAberto} onFechar={fecharAmp} />}
    </AnimatePresence>
  </section>
}
