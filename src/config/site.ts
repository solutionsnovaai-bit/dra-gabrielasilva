/*
  Dados da clínica. Tudo o que é informação (contato, endereço, SEO e mensagens do WhatsApp) fica aqui.
  Os textos das seções ficam em src/content/.
*/

export const SITE = {
  nome: 'Dra. Gabriela Silva',
  nomeCurto: 'Dra. Gabriela',
  marca: 'Centro Estético Dra. Gabriela Silva',
  areas: 'Estética facial e corporal · Nutrição',

  /** 55 + DDD + número, só dígitos. */
  whatsapp: '5511959973059',
  whatsappExibicao: '(11) 95997-3059',

  /** Opcional. Ex.: 'https://instagram.com/dragabrielasilva' e '@dragabrielasilva'. Vazio esconde o link. */
  instagram: '',
  instagramHandle: '',

  endereco: {
    rua: 'Rua Tupassi, 31',
    bairro: 'Jardim Indaia',
    cidade: 'São Paulo',
    uf: 'SP',
    /** Preencha quando tiver (ex.: '08000-000'). Vazio não aparece. */
    cep: '',
  },

  atendimento: 'Atendimento somente com horário marcado',
} as const

export const ENDERECO_LINHA = `${SITE.endereco.rua} · ${SITE.endereco.bairro}, ${SITE.endereco.cidade} – ${SITE.endereco.uf}`
export const ENDERECO_COMPLETO = `${SITE.endereco.rua} – ${SITE.endereco.bairro}, ${SITE.endereco.cidade} – ${SITE.endereco.uf}${SITE.endereco.cep ? `, ${SITE.endereco.cep}` : ''}`

export const SEO = {
  titulo: 'Dra. Gabriela Silva · Estética facial e corporal e Nutrição · Jardim Indaia, SP',
  descricao:
    'Centro estético da Dra. Gabriela Silva no Jardim Indaia, São Paulo. Skinbooster, bioestimulador de colágeno, botox, protocolos corporais, aparelhos e consulta de nutrição com nutricionista parceira. Atendimento com hora marcada.',
  compartilharTitulo: 'Dra. Gabriela Silva · Estética e Nutrição',
  compartilharTexto: 'Beleza que se vê. Bem-estar que se sente. Agende sua avaliação pelo WhatsApp.',
  imagemAlt: 'Dra. Gabriela Silva, de jaleco branco, ao lado do monograma GS em dourado.',
  corTema: '#EDE4D8',
  corFundo: '#EDE4D8',
} as const

/** Mensagens prontas que abrem no WhatsApp. */
export const MENSAGENS = {
  padrao: 'Olá, Dra. Gabriela! Vim pelo site e gostaria de agendar uma avaliação.',
  avaliacao: 'Olá, Dra. Gabriela! Vim pelo site e quero agendar minha avaliação. Qual o melhor horário?',
  nutricao: 'Olá, Dra. Gabriela! Vim pelo site e quero saber como funciona a consulta de nutrição.',
  duvida: 'Olá, Dra. Gabriela! Vim pelo site e tenho uma dúvida.',
  tratamento: (nome: string) => `Olá, Dra. Gabriela! Vim pelo site e quero saber mais sobre ${nome}.`,
  valores: 'Olá, Dra. Gabriela! Vim pelo site e gostaria de saber os valores dos tratamentos.',
} as const
