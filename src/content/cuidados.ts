/*
  Catálogo de cuidados. Cada capítulo vira um bloco na seção "Cuidados"; cada tratamento vira uma linha
  que abre com a descrição e um botão de WhatsApp com a mensagem já falando daquele tratamento.
  Para incluir, tirar ou reordenar, mexa só aqui.
*/

export type Tratamento = {
  nome: string
  /** Etiqueta curta à direita (o que ele trata). */
  tag: string
  descricao: string
  /** Como o nome aparece na mensagem do WhatsApp (se diferente do nome). */
  mensagem?: string
  /** Se tiver fotos de antes e depois, o id do grupo em src/content/resultados.ts. */
  resultados?: string
}

export type Capitulo = {
  id: string
  numero: string
  titulo: string
  resumo: string
  itens: Tratamento[]
}

export const CAPITULOS: Capitulo[] = [
  {
    id: 'rosto',
    numero: '01',
    titulo: 'Rosto',
    resumo: 'Viço, firmeza e expressão, com naturalidade.',
    itens: [
      {
        nome: 'Skinbooster',
        tag: 'Hidratação profunda',
        descricao:
          'Hidratação de dentro para fora com ativos aplicados na pele, para mais viço, textura uniforme e aquele aspecto de pele descansada.',
        mensagem: 'o Skinbooster',
      },
      {
        nome: 'Bioestimulador de colágeno',
        tag: 'Firmeza',
        descricao:
          'Estimula a produção do seu próprio colágeno. O resultado vem aos poucos: pele mais firme, com mais sustentação e qualidade.',
        mensagem: 'o bioestimulador de colágeno',
        resultados: 'gluteos',
      },
      {
        nome: 'Botox',
        tag: 'Linhas de expressão',
        descricao:
          'Suaviza as linhas de expressão respeitando os seus traços, para um rosto descansado sem perder o seu jeito de sorrir.',
        mensagem: 'o botox',
        resultados: 'botox',
      },
      {
        nome: 'Hydra Gloss',
        tag: 'Lips & Color',
        descricao:
          'Cuidado para os lábios em duas versões: Lips, para hidratação e maciez, e Color, que devolve cor e um brilho natural.',
        mensagem: 'o Hydra Gloss',
      },
      {
        nome: 'Jato de plasma',
        tag: 'Textura e firmeza',
        descricao:
          'Tecnologia não cirúrgica que trabalha a textura e a firmeza da pele, inclusive em regiões delicadas.',
        mensagem: 'o jato de plasma',
        resultados: 'jato-de-plasma',
      },
    ],
  },
  {
    id: 'corpo',
    numero: '02',
    titulo: 'Corpo',
    resumo: 'Contorno, medidas e músculo, cada um com o seu protocolo.',
    itens: [
      {
        nome: 'Protocolo de emagrecimento',
        tag: 'Redução de medidas',
        descricao:
          'Um plano corporal montado para você, que combina tecnologias e acompanhamento, com o olhar de nutricionista em cada etapa.',
        mensagem: 'o protocolo de emagrecimento corporal',
      },
      {
        nome: 'Emptiers – Lipo enzimática',
        tag: 'Gordura localizada',
        descricao:
          'Emptiers para redução de gordura localizada por substâncias injetáveis, também chamado comercialmente de “lipo enzimática”.',
        mensagem: 'a lipo enzimática (Emptiers)',
        resultados: 'lipo-enzimatica',
      },
      {
        nome: 'Hidrolipoclasia não aspirativa com Liftera',
        tag: 'Gordura localizada',
        descricao:
          'Protocolo para gordura localizada que combina a aplicação de uma solução com a tecnologia Liftera. Sem cirurgia e sem aspiração.',
        mensagem: 'a hidrolipoclasia não aspirativa com Liftera',
        resultados: 'hidrolipoclasia',
      },
      {
        nome: 'Muscle Boost',
        tag: 'Massa muscular',
        descricao: 'Protocolo voltado ao ganho de massa muscular, com estímulo direcionado para as áreas que você quer trabalhar.',
        mensagem: 'o Muscle Boost',
      },
      {
        nome: 'Volumização de glúteos',
        tag: 'Volume e contorno',
        descricao: 'Protocolos para dar mais volume e contorno aos glúteos, definidos a partir da sua avaliação.',
        mensagem: 'os protocolos de volumização de glúteos',
        resultados: 'gluteos',
      },
    ],
  },
  {
    id: 'cabelo',
    numero: '03',
    titulo: 'Cabelo',
    resumo: 'Tratamento que começa na raiz.',
    itens: [
      {
        nome: 'Mesoterapia capilar',
        tag: 'Queda e fortalecimento',
        descricao:
          'Ativos aplicados direto no couro cabeludo para nutrir a raiz, fortalecer os fios e cuidar da queda.',
        mensagem: 'a mesoterapia capilar',
        resultados: 'mesoterapia-capilar',
      },
    ],
  },
  {
    id: 'sem-agulhas',
    numero: '04',
    titulo: 'Sem agulhas',
    resumo: 'Para quem prefere cuidar sem nenhuma agulha.',
    itens: [
      {
        nome: 'Drenagem linfática',
        tag: 'Inchaço e retenção',
        descricao: 'Movimentos que estimulam a circulação e ajudam a reduzir o inchaço e a retenção de líquidos.',
        mensagem: 'a drenagem linfática',
      },
      {
        nome: 'Ultrassom',
        tag: 'Gordura e celulite',
        descricao: 'Ondas de ultrassom que ajudam a tratar a gordura localizada e a celulite. Confortável e sem agulhas.',
        mensagem: 'o ultrassom',
      },
      {
        nome: 'Manta térmica',
        tag: 'Potencializa o protocolo',
        descricao: 'Calor controlado que potencializa os protocolos corporais e deixa a sessão ainda mais relaxante.',
        mensagem: 'a manta térmica',
      },
      {
        nome: 'Pump Up',
        tag: 'Glúteos',
        descricao: 'Técnica com sucção controlada para levantar e dar mais volume aos glúteos.',
        mensagem: 'o Pump Up',
      },
      {
        nome: 'Corrente russa',
        tag: 'Tonificação',
        descricao: 'Estímulo elétrico que trabalha a musculatura e ajuda na tonificação e no contorno.',
        mensagem: 'a corrente russa',
        resultados: 'gluteos',
      },
      {
        nome: 'Vacuoterapia',
        tag: 'Circulação e celulite',
        descricao: 'Sucção controlada que melhora a circulação e trabalha celulite e gordura localizada.',
        mensagem: 'a vacuoterapia',
      },
    ],
  },
]

/** Palavras que correm na faixa logo abaixo do topo. */
export const FAIXA = [
  'Skinbooster',
  'Bioestimulador de colágeno',
  'Botox',
  'Hydra Gloss',
  'Jato de plasma',
  'Mesoterapia capilar',
  'Muscle Boost',
  'Lipo enzimática',
  'Hidrolipoclasia',
  'Pump Up',
  'Nutrição',
] as const
