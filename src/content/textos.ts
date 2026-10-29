/* Textos das seções. Linhas separadas em listas viram quebras de linha nos títulos. */

export const NAV = [
  { href: '#cuidados', rotulo: 'Cuidados' },
  { href: '#resultados', rotulo: 'Resultados' },
  { href: '#nutricao', rotulo: 'Nutrição' },
  { href: '#doutora', rotulo: 'A Dra.' },
] as const

export const HERO = {
  sobretitulo: 'Aesthetic Beauty · Estética · Nutrição',
  /** No celular vira duas linhas. */
  sobretituloCurto: ['Aesthetic Beauty', 'Estética · Nutrição'],
  linhas: ['Beleza que', 'se vê.'],
  linhasDestaque: ['Bem-estar que', 'se sente.'],
  texto:
    'Tratamentos faciais e corporais pensados a partir de você, com avaliação individual e acompanhamento nutricional em parceria.',
  cta: 'Agendar minha avaliação',
  ctaCurto: 'Agendar avaliação',
  ctaSecundario: 'Conhecer os cuidados',
  rodape: 'Atendimento com hora marcada',
} as const

export const MANIFESTO = {
  rotulo: 'Nossa filosofia',
  /** Palavras entre *asteriscos* aparecem em dourado. */
  texto:
    'Ninguém é igual. O seu cuidado também não. Antes de qualquer procedimento, queremos *entender* o que te incomoda, quais são suas *expectativas* e o que realmente faz sentido para a sua pele, o seu corpo e a sua rotina.',
  complemento:
    'Acreditamos que a transformação começa de dentro para fora. A nutrição é a base para construir resultados consistentes e duradouros, enquanto a estética atua como complemento, valorizando e potencializando cada etapa do processo.',
  /** A última linha aparece em dourado. */
  fecho: ['Nutrição como base.', 'Estética como complemento.', 'Cuidado em cada detalhe.'],
} as const

export const UNIVERSOS = {
  rotulo: 'Dois cuidados',
  titulo: ['Dois cuidados.', 'Um só plano.'],
  estetica: {
    numero: '01',
    titulo: 'Estética',
    texto: 'Corporal e facial. Cada protocolo nasce de uma avaliação, nunca de um pacote pronto.',
    itens: ['Rosto', 'Corpo', 'Cabelo', 'Aparelhos'],
    link: 'Ver os cuidados',
  },
  nutricao: {
    numero: '02',
    titulo: 'Nutrição',
    texto: 'Consulta com a nutricionista parceira para cuidar do que o espelho não mostra e fazer o resultado durar.',
    itens: ['Consulta', 'Plano alimentar', 'Estética + nutrição'],
    link: 'Entender a nutrição',
  },
} as const

export const CUIDADOS = {
  rotulo: 'Cuidados',
  titulo: ['Tudo começa com', 'uma avaliação.'],
  texto:
    'Aqui você não escolhe um procedimento no escuro. A Dra. Gabriela avalia, explica e indica o que faz sentido para você. Toque em um tratamento para saber mais.',
  perguntar: 'Perguntar sobre',
  verResultados: 'Ver antes e depois',
} as const

export const NUTRICAO = {
  rotulo: 'Nutrição',
  titulo: ['Cuidado de', 'dentro para fora.'],
  texto:
    'Além da estética, a nutrição é feita em parceria com a Dra. Karine Segura, nutricionista (CRN-SP 70015). Isso muda o jeito de olhar para o seu resultado: a pele, o corpo e a disposição também respondem ao que acontece por dentro.',
  itens: [
    { titulo: 'Consulta de nutrição', texto: 'Uma conversa sobre a sua rotina, os seus hábitos e os seus objetivos.' },
    { titulo: 'Plano alimentar individual', texto: 'Feito para caber na sua vida, e não o contrário.' },
    { titulo: 'Estética e nutrição juntas', texto: 'Os dois cuidados no mesmo plano, para o resultado ir mais longe.' },
  ],
  cta: 'Quero saber sobre a consulta',
} as const

export const DOUTORA = {
  rotulo: 'Quem cuida de você',
  titulo: ['Prazer, eu sou', 'a Gabriela.'],
  paragrafos: [
    'Acredito que um bom resultado começa por ouvir. Por isso, cada atendimento aqui começa com uma conversa: entender o que te incomoda, o que você espera e o que faz sentido para você.',
    'Trabalho em parceria com profissionais de estética e de nutrição para olhar o cuidado por inteiro. Por fora, com a estética. Por dentro, com a nutrição.',
  ],
  principios: ['Avaliação individual', 'Naturalidade em primeiro lugar', 'Acompanhamento de perto'],
  legenda: 'No consultório, no Jardim Indaia.',
} as const

export const PARCEIRAS = {
  rotulo: 'Parceiras',
  titulo: ['Em parceria', 'com a Dra. Gabriela.'],
  texto: 'Profissionais que cuidam de você junto com a Dra.\u00A0Gabriela, por fora e por dentro.',
  itens: [
    { area: 'Estética', nome: 'Tatiana Barros', registro: 'Conselho nº 848708' },
    { area: 'Nutrição', nome: 'Dra. Karine Segura', registro: 'Nutricionista · CRN-SP 70015' },
  ],
} as const

export const PASSOS = {
  rotulo: 'Como funciona',
  titulo: ['Do primeiro oi', 'ao seu plano.'],
  itens: [
    { numero: '01', titulo: 'Você chama no WhatsApp', texto: 'Conta o que gostaria de cuidar e escolhe o melhor horário para você.' },
    { numero: '02', titulo: 'Avaliação individual', texto: 'Uma conversa sem pressa sobre as suas expectativas, o seu histórico e o que faz sentido.' },
    { numero: '03', titulo: 'O seu plano', texto: 'Você sai sabendo o que fazer e por quê. Sem pacote pronto e sem empurrar nada.' },
  ],
} as const

export const AGENDAR = {
  rotulo: 'Agendamento',
  titulo: ['Vamos conversar', 'sobre você?'],
  texto: 'O atendimento é somente com horário marcado. Chama no WhatsApp e a gente encontra o melhor horário para a sua avaliação.',
  cta: 'Conversar com a Dra. Gabriela',
  mapa: 'Abrir no mapa',
} as const

export const RODAPE = {
  frase: ['Beleza que se vê.', 'Bem-estar que se sente.'],
} as const
