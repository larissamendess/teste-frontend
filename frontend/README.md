# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


# Visão Geral

Este projeto foi desenvolvido como parte de um teste para processo seletivo e tem como objetivo fornecer uma interface para busca e visualização de hotéis com base no destino informado pelo usuário. O sistema permite ao usuário pesquisar hotéis, visualizar detalhes como preço, avaliação, comodidades e realizar a seleção de um hotel para obter mais informações.

Funcionalidades Principais

1. # Busca de Hotéis

O usuário informa o destino desejado.

Ao clicar no botão de busca, o sistema retorna uma lista de hotéis para aquele destino.

Caso nenhum hotel seja encontrado, uma mensagem é exibida informando a indisponibilidade.

2. # Listagem de Hotéis

Os hotéis são exibidos em cards com informações como:

Nome do hotel

Endereço

Nota de avaliação (estrelas)

Preço por noite (com impostos inclusos)

Comodidades principais

Indicação se possui quartos reembolsáveis

É possível filtrar os hotéis por:

"Mais Recomendados" (preço mais baixo primeiro)

"Melhores Avaliados" (hotéis com maior número de estrelas primeiro)

3. # Carrossel de Imagens

Cada hotel possui um carrossel com suas imagens.

O usuário pode navegar entre as imagens do hotel de forma intuitiva.


4. # Detalhamento do Hotel (Drawer)

Ao clicar em "Selecionar", abre-se um drawer lateral com:

Carossel com imagens do hotel

Endereço completo

Avaliação 

Lista completa de facilidades

Descrição detalhada do hotel

O drawer pode ser fechado ao clicar no botão de fechamento.

Tecnologias Utilizadas

Framework: Vue.js 3

Componentes: Quasar Framework

Gerenciamento de Estado: Ref e Computed

Estilização: Quasar e CSS 

Dados: Armazenados localmente em arquivos JSON

Regras de Negócio

A busca de hotéis só ocorre após clicar no botão de busca.

A ordenação segue as opções de filtro escolhidas pelo usuário.

As comodidades são exibidas de forma limitada no card do hotel e expandidas no drawer.
