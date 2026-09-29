# Dra. Gabriela Silva · Estética e Nutrição

Site de uma página do centro estético da Dra. Gabriela Silva (Jardim Indaia, São Paulo).

React 19, TypeScript, Vite 6, Tailwind 4, Motion e Lenis. Fonte Mona Sans (variável, licença OFL) servida
pelo próprio site. Imagens em WebP. Sem dependência de serviço externo.

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
| Fotos dos procedimentos (carrossel) | `src/assets/procedimentos/` (veja o LEIA-ME de lá) |
| Fotos da Dra., monograma e texturas | `public/fotos`, `public/marca`, `public/texturas` |

Todos os botões abrem o WhatsApp com uma mensagem pronta do contexto (avaliação, nutrição, dúvida ou o
tratamento que a pessoa abriu no catálogo).

## Pendências antes de publicar

- **CEP**: não foi informado. Preencha `SITE.endereco.cep` em `src/config/site.ts` (aparece no cartão de
  agendamento e nos dados para o Google).
- **Instagram**: não foi informado. Preencha `SITE.instagram` e `SITE.instagramHandle`; vazio, o link não aparece.
- **Fotos dos procedimentos**: coloque em `src/assets/procedimentos/`. A seção "Por dentro" aparece sozinha.
- **Revisão dos textos dos tratamentos** pela Dra. Gabriela (nomes, etiquetas e descrições em
  `src/content/cuidados.ts`), principalmente o que ela oferece dentro da consulta de nutrição.

## O que tem no site

Abertura (peça de motion) → topo com a foto → faixa de palavras → filosofia → dois cuidados →
cuidados em 4 capítulos → carrossel de procedimentos (quando houver fotos) → nutrição → a Dra. →
como funciona → dúvidas → agendamento → rodapé. Balão do WhatsApp sempre visível.

**Abertura**, em quatro tempos: no escuro, um fio de ouro desenha o GS; o ouro preenche o monograma e um
brilho atravessa a folha; a luz se abre a partir do GS e revela o papel com sombra de folhas, junto com o
nome; o GS voa em curva até o topo do site e pousa atrás da foto da Dra., que sobe em seguida.
A barra dourada acompanha o carregamento real (fonte, monograma e foto). Na 1ª visita dura cerca de 4 s;
ao voltar na mesma sessão, uma versão curta; com "reduzir movimento" ligado no aparelho, não há abertura.

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
  assets/procedimentos/   Fotos do carrossel
public/
  fotos/  marca/  texturas/  fonts/  og.jpg  ícones
```

## Desempenho e acessibilidade

- Só `transform`, `opacity` e `clip-path` animam; animações contínuas param fora da tela.
- Rolagem com inércia (Lenis) só com mouse; no celular a rolagem é nativa.
- Respeita "reduzir movimento" do sistema e tem o botão "Pausar animações" no rodapé.
- Catálogo e dúvidas navegáveis por teclado; menu do celular fecha com Esc.
