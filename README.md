# Les Vivée Clinic

Apresentação responsiva da clínica no Tatuapé, com React, TypeScript, Vite, Motion e Lenis. A imagem texturizada da marca é usada no topo e no rodapé. O hero usa uma versão WebP com transparência derivada da mesma imagem.

```sh
npm ci
npm run dev
npm run check
npm run build
```

A Vercel usa o framework Vite, com saída em `dist/`. A prévia usa `noindex`. Ao conectar o domínio da Les Vivée, ajuste `VITE_LES_VIVEE_URL` para a nova origem HTTPS nas variáveis do projeto e refaça o deploy. As áreas de cuidados, o percurso da avaliação, a galeria e as perguntas frequentes estão em `src/App.tsx`. Telefone, endereço e Instagram estão em `src/config/site.ts`.
