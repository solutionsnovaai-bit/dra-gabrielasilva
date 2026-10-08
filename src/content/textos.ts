/* Textos das seções. Linhas separadas em listas viram quebras de linha nos títulos. */

export const NAV = [
  { href: '#cuidados', rotulo: 'Cuidados' },
  { href: '#resultados', rotulo: 'Resultados' },
  { href: '#nutricao', rotulo: 'Nutrição' },
  { href: '#doutora', rotulo: 'A Dra.' },
  { href: '#duvidas', rotulo: 'Dúvidas' },
] as const

export const HERO = {
  sobretitulo: 'Estética facial e corporal · Nutrição',
  sobretituloCurto: 'Estética · Nutrição',
  linhas: ['Beleza que', 'se vê.'],
  linhasDestaque: ['Bem-estar que', 'se sente.'],
  texto:
    'Tratamentos para rosto, corpo e cabelo pensados a partir de você, com avaliação individual e o olhar de quem também é nutricionista.',
  cta: 'Agendar minha avaliação',
  ctaCurto: 'Agendar avaliação',
  ctaSecundario: 'Conhecer os cuidados',
  rodape: 'Atendimento com hora marcada',
} as const

export const MANIFESTO = {
  rotulo: 'Filosofia',
  /** Palavras entre *asteriscos* aparecem em dourado. */
  texto:
    'Ninguém é igual. O seu cuidado também não. Antes de qualquer procedimento, a gente *conversa*: sobre o que te incomoda, o que você espera e o que faz sentido para a sua pele, o seu corpo e a sua rotina. Estética com *critério*. Nutrição para *sustentar* o resultado.',
} as const

export const UNIVERSOS = {
  rotulo: 'Dois cuidados',
  titulo: ['Dois cuidados.', 'Um só plano.'],
  estetica: {
    numero: '01',
    titulo: 'Estética',
    texto: 'Rosto, corpo e cabelo, com e sem agulhas. Cada protocolo nasce de uma avaliação, nunca de um pacote pronto.',
    itens: ['Rosto', 'Corpo', 'Cabelo', 'Sem agulhas'],
    link: 'Ver os cuidados',
  },
  nutricao: {
    numero: '02',
    titulo: 'Nutrição',
    texto: 'Consulta com nutricionista para cuidar do que o espelho não mostra e fazer o resultado durar.',
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
    'Além da estética, a Dra. Gabriela é nutricionista. Isso muda o jeito de olhar para o seu resultado: a pele, o corpo e a disposição também respondem ao que acontece por dentro.',
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
    'Como também sou nutricionista, olho para o cuidado por inteiro. Por fora, com a estética. Por dentro, com a nutrição.',
  ],
  principios: ['Avaliação individual', 'Naturalidade em primeiro lugar', 'Acompanhamento de perto'],
  legenda: 'No consultório, no Jardim Indaia.',
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

export const DUVIDAS = {
  rotulo: 'Dúvidas',
  titulo: ['Ficou alguma', 'dúvida?'],
  texto: 'Se a sua pergunta não estiver aqui, é só chamar. A resposta vem da própria Dra. Gabriela.',
  cta: 'Perguntar no WhatsApp',
  itens: [
    {
      pergunta: 'Preciso agendar?',
      resposta:
        'Sim. O atendimento é somente com horário marcado, para que você seja atendida com calma e sem espera. É só chamar no WhatsApp.',
    },
    {
      pergunta: 'Como sei qual tratamento é para mim?',
      resposta:
        'Na avaliação. A Dra. Gabriela conversa com você, entende o que te incomoda e indica o que faz sentido. Às vezes, um protocolo que combina mais de um cuidado.',
    },
    {
      pergunta: 'Vai ficar natural?',
      resposta: 'Esse é o ponto de partida de todo plano: realçar o que é seu, sem exageros e respeitando os seus traços.',
    },
    {
      pergunta: 'Tem opções sem agulha?',
      resposta:
        'Tem. Drenagem linfática, ultrassom, manta térmica, Pump Up, corrente russa e vacuoterapia são cuidados sem nenhuma agulha.',
    },
    {
      pergunta: 'Posso fazer estética e nutrição juntas?',
      resposta:
        'Pode, e muitas vezes é o melhor caminho. Como a Dra. Gabriela também é nutricionista, os dois cuidados podem caminhar no mesmo plano.',
    },
    {
      pergunta: 'Quanto custa?',
      resposta:
        'Os valores dependem do tratamento e do plano indicado para você. Chame no WhatsApp que a gente te passa tudo com transparência.',
    },
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
