import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ENDERECO_COMPLETO, SEO, SITE } from './src/config/site'

const html = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function dadosDaClinica(origin?: string): Plugin {
  const dados = {
    __NOME__: html(SITE.nome),
    __TITULO__: html(SEO.titulo),
    __DESCRICAO__: html(SEO.descricao),
    __COR_TEMA__: SEO.tema,
    __SEM_JS__: html(`${SITE.nome}. ${ENDERECO_COMPLETO}. WhatsApp ${SITE.whatsappExibicao}.`),
  }
  return {
    name: 'dados-da-clinica',
    transformIndexHtml(page) {
      const meta = origin ? [
        `<link rel="canonical" href="${html(origin)}/" />`,
        `<meta property="og:url" content="${html(origin)}/" />`,
        `<meta property="og:image" content="${html(origin)}/lesvivee/compartilhar.jpg" />`,
        '<meta property="og:image:width" content="1200" />',
        '<meta property="og:image:height" content="630" />',
        '<meta property="og:image:alt" content="Les Vivée Clinic, estética avançada no Tatuapé" />',
      ].join('\n    ') : ''
      return Object.entries(dados).reduce((s, [k, v]) => s.replaceAll(k, v), page).replace('<!-- __URL_METADATA__ -->', meta)
    },
  }
}
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const publicUrl = env.VITE_LES_VIVEE_URL
  const origin = publicUrl ? new URL(publicUrl) : undefined
  if (origin && !['http:', 'https:'].includes(origin.protocol)) throw new Error('VITE_LES_VIVEE_URL precisa usar HTTP ou HTTPS.')
  return {
    plugins: [react(), tailwindcss(), dadosDaClinica(origin?.origin)],
    server: { host: '0.0.0.0', port: 4173, strictPort: true },
    preview: { host: '0.0.0.0', port: 4173 },
    build: { target: 'es2022', sourcemap: false, cssCodeSplit: false },
  }
})
