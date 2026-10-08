# Dra. Gabriela Silva · Estética e Nutrição

Site de uma página do centro estético da Dra. Gabriela Silva (Jardim Indaia, São Paulo).

React 19, TypeScript 5.9, Vite 6.4, Tailwind 4.3, Motion 12 e Lenis 1.3 (versões fixas no package.json).
Fonte Mona Sans (variável, licença OFL) servida pelo próprio site. Imagens em AVIF com reserva em WebP.
Sem dependência de serviço externo.

Lighthouse (build local): computador 97 · 100 · 100 · 100; celular 89 · 100 · 100 · 100
(desempenho · acessibilidade · boas práticas · SEO). No celular, o LCP é o GS da abertura, de propósito.

## Rodar

Requisito: Node.js 20 ou superior.

```bash
npm ci
npm run dev      # http://localhost:4173
npm run build    # gera a pasta dist/
npm run check    # confere os tipos (opcional)
```

## Publicar na Vercel

Suba a pasta no GitHub e importe na Vercel. Framework: Vite. Build: `npm run build`. Saída: `dist`.
Não precisa de variável de ambiente. Com domínio próprio, defina `VITE_SITE_URL`
(ex.: `https://dragabrielasilva.com.br`) nas variáveis do projeto e publique de novo.

Ao atualizar pelo GitHub, apague do repositório os arquivos que saíram do projeto (subir por cima não apaga).

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| WhatsApp, endereço, CEP, Instagram, SEO e mensagens prontas | `src/config/site.ts` |
| Tratamentos (capítulos, nomes, etiquetas, descrições) | `src/content/cuidados.ts` |
| Textos de todas as seções | `src/content/textos.ts` |
| Cores | `src/styles/tema.css` |
| Antes e depois (carrossel e Nutrição) | `src/content/resultados.ts` + imagens em `public/resultados/` |
| Fotos da Dra., monograma e texturas | `public/fotos`, `public/marca`, `public/texturas` |

Todos os botões abrem o WhatsApp com uma mensagem pronta do contexto (avaliação, nutrição, dúvida ou o
tratamento que a pessoa abriu no catálogo).

## Pendências antes de publicar

- **CEP**: não foi informado. Preencha `SITE.endereco.cep` em `src/config/site.ts` (aparece no cartão de
  agendamento e nos dados para o Google).
- **Instagram**: não foi informado. Preencha `SITE.instagram` e `SITE.instagramHandle`; vazio, o link não aparece.
- **Revisão dos textos dos tratamentos** pela Dra. Gabriela (nomes, etiquetas e descrições em
  `src/content/cuidados.ts`), principalmente o que ela oferece dentro da consulta de nutrição.

## O que tem no site

Abertura (peça de motion) → topo com a foto → faixa de palavras → filosofia → dois cuidados →
cuidados em 4 capítulos → antes e depois (carrossel automático) → nutrição → a Dra. →
como funciona → dúvidas → agendamento → rodapé. Balão do WhatsApp sempre visível.

**Abertura**, em quatro tempos: no escuro, um fio de ouro desenha o GS; o ouro preenche o monograma e um
brilho atravessa a folha; a luz se abre a partir do GS e revela o papel com sombra de folhas, junto com o
nome; o GS voa em curva até o topo do site e pousa atrás da foto da Dra., que sobe em seguida.
A barra dourada acompanha o carregamento real (fonte, monograma e foto). Na 1ª visita dura cerca de 4 s;
ao voltar na mesma sessão, uma versão curta; com "reduzir movimento" ligado no aparelho, não há abertura.

**Antes e depois**: carrossel que anda sozinho, devagar e sem fim. Para quando o mouse passa por cima, com o foco
do teclado e no botão "Pausar"; dá para arrastar com o mouse e com o dedo (com inércia), sem atrapalhar a rolagem
da página. Filtros por tratamento; ao lado do título, uma ficha mostra o tratamento escolhido, quantas fotos tem e o
protocolo (texto da própria Dra. Gabriela). Tocar numa foto abre a versão ampliada (setas, teclado e deslize; no
celular, antes em cima e depois embaixo). Os links "Ver antes e depois" do catálogo já abrem o carrossel no
tratamento certo. Com "reduzir movimento", vira uma fileira que a pessoa rola. Cada foto só é baixada quando está
chegando perto da tela, então o carrossel pode crescer sem pesar a página.

Os antes e depois das dietas ficam na seção Nutrição (`RESULTADOS_NUTRICAO`, no mesmo arquivo), com a mesma foto ampliada.

Para incluir uma foto: monte o par com as duas metades do mesmo tamanho (antes à esquerda e depois à direita; ou
antes em cima e depois embaixo, marcando `layout: 'v'`), salve em `public/resultados/` como `id-largura.avif` e
`id-largura.webp` (duas larguras, até 820 px de altura) e acrescente o item no grupo certo em
`src/content/resultados.ts`. Para ligar um tratamento do catálogo às fotos, use `resultados: 'id-do-grupo'` em
`src/content/cuidados.ts`.

**Balão do WhatsApp**: nunca some. A velocidade da rolagem puxa o balão por uma mola amortecida; ao parar,
ele volta com um leve quique, inclinando e esticando conforme a velocidade. Sobre seções escuras, fica dourado.

## Imagens da marca

O monograma, o nome e a assinatura do logotipo foram vetorizados (`src/components/marca/vetores.ts`) e são
usados no cabeçalho, rodapé, faixa e favicon. O GS em folha de ouro (`public/marca/monograma-folha-*.webp`)
foi recortado da arte original, com transparência, e é o mesmo da abertura, do topo e da seção de nutrição.
A textura de papel e a sombra de folhas também saíram da arte original.

## Estrutura

```text
src/
  config/site.ts          Dados da clínica, SEO e mensagens do WhatsApp
  content/                Textos e catálogo de cuidados
  components/
    abertura/             Abertura (motion)
    layout/               Cabeçalho + menu, rodapé, balão do WhatsApp, dados para o Google
    secoes/               Uma seção por arquivo
    marca/                Vetores do logotipo
    ui/                   Botão, entradas ao rolar
  hooks/                  Movimento reduzido, rolagem suave, cenas ativas, media query
  lib/                    WhatsApp e mapa
  styles/                 Tema, base, abertura, topo, seções, balão
public/
  fotos/  marca/  texturas/  fonts/  og.jpg  ícones
```

## Desempenho e acessibilidade

- Só `transform`, `opacity` e `clip-path` animam; animações contínuas param fora da tela.
- Rolagem com inércia (Lenis) só com mouse; no celular a rolagem é nativa.
- O Lenis roda dentro do relógio do Motion (etapa "setup", antes da medição da rolagem), então parallax e
  rolagem saem no mesmo quadro, sem a tremida de um quadro de atraso. O relógio só gira enquanto há rolagem.
- Motion carregado em modo leve (`LazyMotion` + `m`), sem o código de layout e arraste que o site não usa.
- Imagens principais em AVIF (metade do peso do WebP) com `<picture>`; a foto do topo e o GS são pré-carregados.
- `robots.txt` e `sitemap.xml` gerados no build com o domínio certo; cabeçalhos de segurança e cache em `vercel.json`.
- Respeita "reduzir movimento" do sistema e tem o botão "Pausar animações" no rodapé.
- Catálogo e dúvidas navegáveis por teclado; menu do celular fecha com Esc.
