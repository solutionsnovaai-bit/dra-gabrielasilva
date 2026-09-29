import { SEO, SITE } from '../../config/site'
import { CAPITULOS } from '../../content/cuidados'
import { temWhatsApp } from '../../lib/whatsapp'

/** Dados para o Google entender o negócio (clínica de estética com nutricionista). */
export default function DadosEstruturados() {
  const e = SITE.endereco
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'MedicalBusiness'],
    name: SITE.marca,
    alternateName: SITE.nome,
    description: SEO.descricao,
    url: `${__SITE_ORIGIN__}/`,
    image: `${__SITE_ORIGIN__}/og.jpg`,
    logo: `${__SITE_ORIGIN__}/icon-512.png`,
    address: {
      '@type': 'PostalAddress', streetAddress: e.rua, addressLocality: e.cidade, addressRegion: e.uf, addressCountry: 'BR',
      ...(e.cep ? { postalCode: e.cep } : {}),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Cuidados',
      itemListElement: CAPITULOS.map(c => ({
        '@type': 'OfferCatalog', name: c.titulo,
        itemListElement: c.itens.map(t => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t.nome } })),
      })),
    },
  }
  if (temWhatsApp) dados.telephone = `+${SITE.whatsapp.replace(/\D/g, '')}`
  if (SITE.instagram) dados.sameAs = [SITE.instagram]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
}
