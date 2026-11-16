export const SITE = {
  nome: 'Les Vivée Clinic',
  instagram: 'https://www.instagram.com/lesvivee/',
  whatsapp: '5511915266708',
  whatsappExibicao: '(11) 91526-6708',
  rua: 'Rua Padre Estevão Pernet, 718',
  bairro: 'Tatuapé',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '03315-000',
} as const

export const ENDERECO_COMPLETO = `${SITE.rua}, ${SITE.bairro}, ${SITE.cidade} – ${SITE.uf}, ${SITE.cep}`
export const SEO = {
  titulo: `${SITE.nome} | Estética avançada no Tatuapé`,
  descricao: 'Conheça os cuidados faciais, corporais e capilares da Les Vivée Clinic, no Tatuapé, em São Paulo. Agende sua avaliação pelo WhatsApp.',
  tema: '#4a3a31',
} as const
