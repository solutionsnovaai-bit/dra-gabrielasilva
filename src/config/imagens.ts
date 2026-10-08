/*
  Imagens do site em dois formatos: AVIF (metade do peso, para navegadores atuais) e WebP (reserva).
  O <picture> escolhe sozinho. Para trocar uma foto, gere os dois formatos com os mesmos nomes e larguras.
*/
const lista = (arquivos: readonly (readonly [string, number])[], ext: 'avif' | 'webp') =>
  arquivos.map(([a, w]) => `${a}.${ext} ${w}w`).join(', ')

function imagem(arquivos: readonly (readonly [string, number])[], largura: number, altura: number) {
  return {
    avif: lista(arquivos, 'avif'),
    webp: lista(arquivos, 'webp'),
    src: `${arquivos[arquivos.length - 1][0]}.webp`,
    largura,
    altura,
  }
}

/** GS em folha de ouro (abertura, topo, nutrição). */
export const FOLHA = imagem([['/marca/monograma-folha-800', 694], ['/marca/monograma-folha-1200', 1040]], 1040, 1200)
/** Recorte da Dra. Gabriela (topo). */
export const RECORTE = imagem([['/fotos/gabriela-recorte-720', 387], ['/fotos/gabriela-recorte-1100', 591], ['/fotos/gabriela-recorte-1711', 919]], 919, 1711)
/** Foto no consultório (seção A Dra.). */
export const CONSULTORIO = imagem([['/fotos/gabriela-consultorio-560', 560], ['/fotos/gabriela-consultorio-852', 852]], 852, 1065)
