/*
  Antes e depois. Cada grupo é um tratamento, com o protocolo informado pela Dra. Gabriela.
  Os textos do protocolo são os que a Dra. Gabriela escreveu.
  As fotos ficam em public/resultados/ em AVIF e WebP, nas larguras listadas (o nome do arquivo é id-largura).
  Para incluir uma foto: gere o par (antes à esquerda, depois à direita, mesmo tamanho) e acrescente na lista.
*/

export type FotoResultado = {
  id: string
  /** Região e ângulo da foto (aparece na legenda e no texto alternativo). */
  area: string
  /** Tamanho do par inteiro (antes + depois lado a lado), em pixels. */
  w: number
  h: number
  larguras: readonly number[]
}

export type GrupoResultado = {
  id: string
  tratamento: string
  curto: string
  protocolo: readonly string[]
  mensagem: string
  fotos: readonly FotoResultado[]
}

export const RESULTADOS = {
  rotulo: 'Resultados',
  titulo: ['Antes', 'e depois.'],
  texto: 'Toque em uma foto para ver maior.',
  todos: 'Todos',
  cta: 'Quero saber se é para mim',
  mensagemTodos: 'Olá, Dra. Gabriela! Vim pelo site, vi os antes e depois e quero saber qual tratamento é indicado para mim.',
  grupos: [
    {
      id: 'lipo-enzimatica',
      tratamento: 'Emptiers – Lipo enzimática',
      curto: 'Lipo enzimática',
      protocolo: ['De 2 a 4 sessões com intervalo de 30 dias', 'O depois foi após 8 semanas da primeira aplicação'],
      mensagem: 'Olá, Dra. Gabriela! Vim pelo site, vi os antes e depois da lipo enzimática (Emptiers) e quero saber se é indicada para mim.',
      fotos: [
        { id: 'lipo-02', area: 'Abdômen, de perfil', w: 1278, h: 774, larguras: [716, 1278] },
        { id: 'lipo-01', area: 'Abdômen, de perfil', w: 1118, h: 940, larguras: [626, 1118] },
        { id: 'lipo-03', area: 'Abdômen, de frente', w: 1280, h: 614, larguras: [717, 1280] },
        { id: 'lipo-04', area: 'Abdômen, de frente', w: 1272, h: 601, larguras: [712, 1272] },
      ],
    },
    {
      id: 'hidrolipoclasia',
      tratamento: 'Hidrolipoclasia não aspirativa com Liftera',
      curto: 'Hidrolipoclasia',
      protocolo: ['De 2 a 4 sessões realizadas semanalmente', 'Redução em torno de -6,3 cm'],
      mensagem: 'Olá, Dra. Gabriela! Vim pelo site, vi os antes e depois da hidrolipoclasia com Liftera e quero saber se é indicada para mim.',
      fotos: [
        { id: 'hidro-03', area: 'Abdômen e cintura, de frente', w: 1288, h: 545, larguras: [721, 1288] },
        { id: 'hidro-02', area: 'Abdômen, de perfil', w: 1228, h: 562, larguras: [688, 1228] },
        { id: 'hidro-01', area: 'Abdômen, de perfil', w: 858, h: 312, larguras: [480, 858] },
      ],
    },
  ] satisfies GrupoResultado[],
} as const

/** Todas as fotos intercaladas entre os grupos (para o "Todos"). */
export function fotosIntercaladas(grupos: readonly GrupoResultado[]) {
  const filas = grupos.map(g => g.fotos.map(f => ({ ...f, grupo: g })))
  const saida: (FotoResultado & { grupo: GrupoResultado })[] = []
  for (let i = 0; filas.some(f => i < f.length); i++) filas.forEach(f => { if (f[i]) saida.push(f[i]) })
  return saida
}

export const srcset = (f: FotoResultado, ext: 'avif' | 'webp') => f.larguras.map(w => `/resultados/${f.id}-${w}.${ext} ${w}w`).join(', ')
