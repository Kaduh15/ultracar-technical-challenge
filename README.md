<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Ultracar Technical Challenge" />

  &#xa0;

  <!-- <a href="https://ultracartechnicalchallenge.netlify.app">Demo</a> -->
</div>

<h1 align="center">Ultracar Technical Challenge</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/kaduh15/ultracar-technical-challenge?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/kaduh15/ultracar-technical-challenge?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/kaduh15/ultracar-technical-challenge?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/kaduh15/ultracar-technical-challenge?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/kaduh15/ultracar-technical-challenge?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/kaduh15/ultracar-technical-challenge?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/kaduh15/ultracar-technical-challenge?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	🚧  Ultracar Technical Challenge 🚀 Under construction...  🚧
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#sparkles-desenvolvimento">Desenvolvimento</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requisitos">Requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-iniciando_projetos">Iniciando Projetos</a> &#xa0; | &#xa0;
  <a href="https://github.com/kaduh15" target="_blank">Autor</a>
</p>

<br>

## :dart: Sobre ##

Esse é um repositório para armazenar o projeto desenvolvido no processo seletivo da Ultracar.

O desafio proposto é criar um fluxo para execução de serviços em veículos, com a identificação do cliente via QRCode, inserção do nome da pessoa responsável pelo serviço, seleção de peças (caso necessário) e administração das datas de início e término do serviço. O candidato deve construir telas para apresentar a solução desenvolvida, que será avaliada pelo fluxo funcional, usabilidade e legibilidade.

## :sparkles: Desenvolvimento ##

Para atender ao desafio proposto, optei por desenvolver uma aplicação web utilizando NextJS para o front-end e Node.js para o back-end. Utilizei o banco de dados Postgres para armazenar as informações dos clientes, veículos, serviços e peças.

Na tela inicial da aplicação, é possível fazer a identificação do cliente por meio de um QRCode, que ao ser lido, visualiza os dados do cliente e seu veículo. Em seguida, é possível inserir o nome da pessoa responsável pelo serviço a ser executado no veículo e selecionar a peça envolvida, caso necessário. O valor da peça é automaticamente lido e adicionado ao valor total do serviço.

## :rocket: Tecnologias ##

As seguintes ferramentas foram utilizadas neste projeto:

- [Node.js](https://nodejs.org/en/)
- [NextJS](https://nextjs.org/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requisitos ##

Antes de iniciar :checkered_flag:, você precisa ter [Git](https://git-scm.com), [Node](https://nodejs.org/en/) e [Docker](https://www.docker.com/) instalados.

## :checkered_flag: Iniciando Projeto ##

```bash
# Clone this project
$ git clone https://github.com/kaduh15/ultracar-technical-challenge

# Access
$ cd ultracar-technical-challenge

# Install dependencies
$ npm i

# Run app
$ npm run dev

# The app will initialize in the <http://localhost:3000>
```

Made with :heart: by <a href="https://github.com/kaduh15" target="_blank">Kadu</a>

&#xa0;

<a href="#top">Back to top</a>