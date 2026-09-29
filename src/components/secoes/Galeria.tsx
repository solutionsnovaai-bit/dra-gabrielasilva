import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GALERIA } from '../../content/textos'
import Revelar, { Titulo } from '../ui/Revelar'

/*
  Carrossel de fotos dos procedimentos.
  Basta colocar as imagens em src/assets/procedimentos/ (jpg, png, webp ou avif).
  A ordem segue o nome do arquivo e a legenda sai do nome: "01-skinbooster.webp" → "Skinbooster".
  Sem imagens na pasta, a seção inteira fica escondida.
*/
const arquivos = import.meta.glob<string>('../../assets/procedimentos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' })

const legenda = (caminho: string) => {
  const nome = caminho.split('/').pop()!.replace(/\.[a-z]+$/i, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim()
  return nome ? nome.charAt(0).toUpperCase() + nome.slice(1) : ''
}

export const FOTOS = Object.keys(arquivos).sort().map(k => ({ src: arquivos[k], legenda: legenda(k) }))

export default function Galeria() {
  const trilho = useRef<HTMLDivElement>(null)
  const [progresso, setProgresso] = useState(0)
  const arraste = useRef<{ x: number; scroll: number; moveu: boolean } | null>(null)

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    const atualiza = () => setProgresso(el.scrollWidth > el.clientWidth ? el.scrollLeft / (el.scrollWidth - el.clientWidth) : 1)
    el.addEventListener('scroll', atualiza, { passive: true })
    atualiza()
    return () => el.removeEventListener('scroll', atualiza)
  }, [])

  if (FOTOS.length === 0) return null

  const passo = (dir: number) => {
    const el = trilho.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.galeria-item')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }
  /* Arrastar com o mouse (no toque, a rolagem nativa já faz isso). */
  const down = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !trilho.current) return
    arraste.current = { x: e.clientX, scroll: trilho.current.scrollLeft, moveu: false }
    trilho.current.classList.add('is-arrastando')
  }
  const move = (e: ReactPointerEvent) => {
    const a = arraste.current
    if (!a || !trilho.current) return
    const dx = e.clientX - a.x
    if (Math.abs(dx) > 4) a.moveu = true
    trilho.current.scrollLeft = a.scroll - dx
  }
  const up = () => { arraste.current = null; trilho.current?.classList.remove('is-arrastando') }

  return <section className="galeria secao papel" aria-labelledby="galeria-titulo">
    <div className="conteiner galeria-cabeca">
      <div>
        <Revelar><p className="rotulo">{GALERIA.rotulo}</p></Revelar>
        <Titulo id="galeria-titulo" className="titulo" linhas={GALERIA.titulo} destaque={[1]} />
      </div>
      <div className="galeria-controles">
        <button type="button" className="galeria-seta" onClick={() => passo(-1)} aria-label="Foto anterior"><ArrowLeft strokeWidth={1.5} /></button>
        <button type="button" className="galeria-seta" onClick={() => passo(1)} aria-label="Próxima foto"><ArrowRight strokeWidth={1.5} /></button>
      </div>
    </div>
    <div ref={trilho} className="galeria-trilho" role="region" aria-label="Fotos dos procedimentos" tabIndex={0} data-lenis-prevent
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
      onClickCapture={e => { if (arraste.current?.moveu) e.preventDefault() }}>
      {FOTOS.map((f, i) => <figure key={f.src} className="galeria-item">
        <div className="galeria-foto"><img src={f.src} alt={f.legenda || `Procedimento ${i + 1}`} loading="lazy" decoding="async" draggable={false} /></div>
        {f.legenda && <figcaption><span className="num">{String(i + 1).padStart(2, '0')}</span>{f.legenda}</figcaption>}
      </figure>)}
    </div>
    <div className="conteiner"><div className="galeria-progresso" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(.08, progresso)})` }} /></div></div>
  </section>
}
