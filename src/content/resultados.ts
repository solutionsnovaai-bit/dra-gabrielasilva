/*
  Antes e depois. Cada grupo é um tratamento, com o protocolo informado pela Dra. Gabriela.
  Os textos do protocolo são os que a Dra. Gabriela escreveu (grupo sem protocolo informado fica com a lista vazia).
  As fotos ficam em public/resultados/ em AVIF e WebP, nas larguras listadas (o nome do arquivo é id-largura).
  Para incluir uma foto: gere o par com as duas metades do mesmo tamanho (antes à esquerda e depois à direita,
  ou antes em cima e depois embaixo com layout 'v') e acrescente na lista do grupo.
*/

export type FotoResultado = {
  id: string
  /** Região e ângulo da foto (aparece na legenda e no texto alternativo). */
  area: string
  /** Tamanho do par inteiro (antes + depois), em pixels. */
  w: number
  h: number
  larguras: readonly number[]
  /** 'h' (padrão): antes à esquerda, depois à direita. 'v': antes em cima, depois embaixo. */
  layout?: 'h' | 'v'
}

export type GrupoResultado = {
  id: string
  tratamento: string
  curto: string
  protocolo: readonly string[]
  mensagem: string
  fotos: readonly FotoResultado[]
}

const msg = (oque: string) => `Olá, Dra. Gabriela! Vim pelo site, vi os antes e depois ${oque} e quero saber se esse tratamento é indicado para mim.`

export const RESULTADOS = {
  rotulo: 'Resultados',
  titulo: ['Antes', 'e depois.'],
  texto: 'Toque em uma foto para ver maior.',
  todos: 'Todos',
  todosTitulo: 'Todos os tratamentos',
  dica: 'Escolha um tratamento para ver só as fotos dele e o protocolo informado pela Dra. Gabriela.',
  cta: 'Quero saber se é para mim',
  mensagemTodos: 'Olá, Dra. Gabriela! Vim pelo site, vi os antes e depois e quero saber qual tratamento é indicado para mim.',
  grupos: [
    {
      id: 'botox',
      tratamento: 'Botox',
      curto: 'Botox',
      protocolo: ['Retorno pós 15 dias de aplicação'],
      mensagem: msg('do botox'),
      fotos: [
        { id: 'botox-01', area: 'Testa', w: 1566, h: 560, larguras: [877, 1566] },
        { id: 'botox-02', area: 'Entre as sobrancelhas', w: 1528, h: 560, larguras: [856, 1528] },
      ],
    },
    {
      id: 'jato-de-plasma',
      tratamento: 'Jato de plasma',
      curto: 'Jato de plasma',
      protocolo: [],
      mensagem: msg('do jato de plasma'),
      fotos: [
        { id: 'plasma-01', area: 'Blefaroplastia sem corte', w: 843, h: 820, larguras: [472, 843], layout: 'v' },
        { id: 'plasma-02', area: 'Flacidez', w: 841, h: 820, larguras: [471, 841], layout: 'v' },
      ],
    },
    {
      id: 'lipo-enzimatica',
      tratamento: 'Emptiers – Lipo enzimática',
      curto: 'Lipo enzimática',
      protocolo: ['De 2 a 4 sessões com intervalo de 30 dias', 'O depois foi após 8 semanas da primeira aplicação'],
      mensagem: msg('da lipo enzimática (Emptiers)'),
      fotos: [
        { id: 'lipo-02', area: 'Abdômen, de perfil', w: 1278, h: 774, larguras: [716, 1278] },
        { id: 'lipo-01', area: 'Abdômen, de perfil', w: 975, h: 820, larguras: [546, 975] },
        { id: 'lipo-03', area: 'Abdômen, de frente', w: 1280, h: 614, larguras: [717, 1280] },
        { id: 'lipo-04', area: 'Abdômen, de frente', w: 1272, h: 601, larguras: [712, 1272] },
      ],
    },
    {
      id: 'hidrolipoclasia',
      tratamento: 'Hidrolipoclasia não aspirativa com Liftera',
      curto: 'Hidrolipoclasia',
      protocolo: ['De 2 a 4 sessões realizadas semanalmente', 'Redução em torno de -6,3 cm'],
      mensagem: msg('da hidrolipoclasia com Liftera'),
      fotos: [
        { id: 'hidro-03', area: 'Abdômen e cintura, de frente', w: 1288, h: 545, larguras: [721, 1288] },
        { id: 'hidro-02', area: 'Abdômen, de perfil', w: 1228, h: 562, larguras: [688, 1228] },
        { id: 'hidro-01', area: 'Abdômen, de perfil', w: 858, h: 312, larguras: [480, 858] },
      ],
    },
    {
      id: 'protocolo-emagrecimento',
      tratamento: 'Protocolo de emagrecimento',
      curto: 'Emagrecimento',
      protocolo: [],
      mensagem: msg('do protocolo de emagrecimento'),
      fotos: [
        { id: 'emagrecimento-01', area: 'De perfil', w: 850, h: 780, larguras: [476, 850] },
        { id: 'emagrecimento-02', area: 'De frente', w: 1092, h: 640, larguras: [612, 1092] },
      ],
    },
    {
      id: 'gluteos',
      tratamento: 'Corrente russa, bioestimulador de colágeno e volumização de glúteos',
      curto: 'Glúteos',
      protocolo: [],
      mensagem: msg('de glúteos (corrente russa, bioestimulador de colágeno e volumização)'),
      fotos: [
        { id: 'gluteos-02', area: 'De perfil', w: 819, h: 820, larguras: [459, 819] },
        { id: 'gluteos-01', area: 'De perfil', w: 1171, h: 820, larguras: [656, 1171] },
      ],
    },
    {
      id: 'mesoterapia-capilar',
      tratamento: 'Mesoterapia capilar',
      curto: 'Mesoterapia capilar',
      protocolo: ['5 sessões'],
      mensagem: msg('da mesoterapia capilar'),
      fotos: [{ id: 'capilar-01', area: 'Couro cabeludo, visto de cima', w: 1132, h: 820, larguras: [634, 1132] }],
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
