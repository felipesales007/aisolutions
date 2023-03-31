# Frontend

![version](https://img.shields.io/badge/version-0.0.0-blue.svg)

Este **frontend** é um projeto Vue na versão 3 no Vite.

## Configuração de IDE recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desative o Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Tipo de suporte para importações `.vue` no TS

O TypeScript não pode manipular informações de tipo para importações `.vue` por padrão, então substituímos a CLI `tsc` por `vue-tsc` para verificação de tipo. Nos editores, precisamos [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) para tornar o serviço de linguagem TypeScript ciente dos tipos `.vue`.

Se o plug-in TypeScript autônomo não parecer rápido o suficiente para você, a Volar também implementou um [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) que é mais performático. Você pode habilitá-lo seguindo os seguintes passos:

1. Desabilite a extensão interna do TypeScript.
   1. Execute `Extensions: Show Built-in Extensions` da paleta de comandos do VSCode.
   2. Encontre `TypeScript and JavaScript Language Features`, clique com o botão direito e selecione `Disable (Workspace)`.
2. Recarregue a janela do VSCode executando `Developer: Reload Window` na paleta de comandos.

## Personalizar configuração

Consulte [Referência de configuração do Vite](https://vitejs.dev/config/).

## Para rodar o projeto, basta executar os seguintes comandos

Para fazer download das dependências do Vue.js:

```sh
npm install
```

Para executar o projeto em localhost:

```sh
npm run dev
```

Para verificação de tipo, compilação e minificação para produção:

```sh
npm run build
```

Para executar correções nos arquivos do projeto utilizando o [ESLint](https://eslint.org/):

```sh
npm run lint
```

O frontend agora deve executar em http://localhost:5173

## [PrimeVue](https://primefaces.org/primevue)

> Este projeto é baseado nos componentes e templates disponibilizados em PrimeVue.

Este projeto é desenvolvido para Vue 3 com os componentes do [PrimeVue](https://primefaces.org/primevue).

<img src="https://www.primefaces.org/wp-content/uploads/2021/05/hashnode-vue-3.5.02x.jpg" width="425" height="225"  alt=""/>

## Documentação

Link para a [documentação](https://primefaces.org/primevue/setup).
