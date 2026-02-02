# UrbanaPE Frontend

Frontend do projeto **UrbanaPE**, desenvolvido com **Angular**, como parte de um desafio técnico, seguindo boas práticas de organização, componentização e estrutura de aplicações SPA.

O objetivo do projeto é servir como base para uma aplicação web moderna, escalável e de fácil manutenção.

---

## Visão Geral

O **UrbanaPE Frontend** é uma aplicação web construída com **Angular**, preparada para:

- Navegação entre páginas (SPA)
- Organização modular
- Separação clara de responsabilidades
- Integração futura com APIs REST
- Evolução para aplicações de médio e grande porte

---

## Tecnologias Utilizadas

- **Angular**
- **TypeScript**
- **HTML5**
- **CSS3**
- **Node.js**
- **Angular CLI**

---

## Estrutura do Projeto

A estrutura do projeto segue o padrão recomendado pelo Angular:

```bash
├── src
│   ├── app
│   │   ├── auth
│   │   │   ├── auth.guard.ts
│   │   │   ├── auth.service.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors
│   │   │   └── jwt.interceptor.ts
│   │   ├── models
│   │   │   └── user.model.ts
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── admin-cards
│   │   │   │   ├── admin-home
│   │   │   │   └── admin-layout
│   │   │   ├── client
│   │   │   │   ├── client-cards
│   │   │   │   ├── client-home
│   │   │   │   └── client-layout
│   │   │   ├── login
│   │   │   └── register
│   │   ├── services
│   │   │   ├── admin-card.service.ts
│   │   │   ├── client-card.service.ts
│   │   │   └── user.service.ts
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
```
### Como executar o projeto
- Pré-requisitos
  Certifique-se de ter instalado:
  - Node.js (versão LTS recomendada)
  - Angular CLI
  Para instalar o Angular CLI:
```bash
npm install -g @angular/cli
```
  Instalação das dependências:
  - Dentro da pasta do projeto, execute:
```bash
npm i ou npm install
```
Executar a Aplicação:
```bash
ng serve ou npm run start
```
A aplicação estará disponível em:
```bash
http://localhost:4200
```
### Rotas (Planejamento)
O projeto já está preparado para trabalhar com rotas utilizando o Angular Router, permitindo expansão para páginas como:
 - Home
 - Login
 - Cadastro
 - Dashboard
 - Administração
   
### Boas Práticas Aplicadas
 - Componentização
 - Organização por domínio (pages, components, services)
 - Separação de lógica e visual
 - Código tipado com TypeScript
 - Estrutura escalável
