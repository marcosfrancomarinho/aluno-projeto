# Aluno Projeto

## Descrição

Este projeto é uma aplicação fullstack para gestão de cursos (projetos), leaders e inscrições de alunos, baseada em **Clean Architecture**.

- **Backend:** Node.js + TypeScript + Express + Prisma ORM  
- **Frontend:** Vue.js (em desenvolvimento)

O objetivo é oferecer um sistema escalável, organizado e de fácil manutenção para cadastro e gerenciamento das entidades do domínio educacional.

---

## Arquitetura

O backend segue os princípios da **Clean Architecture**, dividindo o código em camadas bem definidas:

- **Domain:** Entidades e regras de negócio puras.
- **Application (Use Cases):** Lógica de aplicação e orquestração das regras de negócio.
- **Infrastructure:** Implementações concretas externas (ORM, emails, JWT, etc).
- **Interfaces (Controllers, DTOs):** Camada de entrada/saída, conversão de dados, validações e rotas HTTP.

Estrutura típica sugerida:

```
backend/
├── src/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   ├── interfaces/
│   └── main.ts
```

---

## Funcionalidades

- Cadastro de cursos (projetos)
- Cadastro de leaders
- Inscrição de alunos em cursos
- Busca de leaders por nome de curso
- Listagem de todos os cursos
- Cadastro e autenticação de usuários

---

## Tecnologias Utilizadas

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- JWT (autenticação)
- Bcrypt (hash de senhas)
- Nodemailer (email)
- EJS (templates de email)
- UUID (identificadores únicos)
- Vitest (testes)
- Yarn (gerenciador de pacotes)

### Frontend

- Vue.js (em desenvolvimento)

---

## Como rodar o projeto

### Pré-requisitos

- Node.js (v18+ recomendado)
- Yarn
- Banco de dados (ex: PostgreSQL, MySQL, SQLite)

### Backend

1. Instale as dependências:
    ```bash
    cd backend
    yarn install
    ```
2. Configure o arquivo `.env`:
    - Copie o `.env.example` para `.env` e preencha com as configurações do seu banco de dados e outras variáveis necessárias.
3. Rode as migrations do Prisma:
    ```bash
    yarn migrate
    ```
4. Inicie o servidor em modo desenvolvimento:
    ```bash
    yarn dev
    ```
    O backend estará rodando por padrão em `http://localhost:3000`.

### Frontend

1. Instale as dependências:
    ```bash
    cd frontend
    yarn install
    ```
2. Inicie o servidor de desenvolvimento:
    ```bash
    yarn dev
    ```
    O frontend estará disponível em `http://localhost:5173` (ou porta configurada).

---

## Exemplos de Requisições (Backend)

### Criar um novo projeto
```http
POST http://localhost:3000/create-project
Content-Type: application/json

{
    "name": "informatica",
    "timestamp":"2025-07-21T08:00:00"
}
```

### Cadastrar um leader
```http
POST http://localhost:3000/register-leader
Content-Type: application/json

{
    "name": "joao almeida",
    "email": "joaoalmeida@gmail.com",
    "specialty": "informatica"
}
```

### Inscrever um aluno em um projeto
```http
POST http://localhost:3000/enroll-project
Content-Type: application/json

{
    "student_name": "marcos franco marinho",
    "student_email": "marcosmarinho1998@gmail.com",
    "leader_email": "joaoalmeida@gmail.com",
    "project_name": "informatica",
    "timestamp":"2025-07-21T08:00:00"
}
```

### Cadastro de usuário
```http
POST http://localhost:3000/sign-up-user
Content-Type: application/json

{
    "name":"marcos franco marinho", 
    "email":"marcosmatrinho@gmail.com",
    "password":"@Marco123"
}
```

### Login de usuário
```http
POST http://localhost:3000/login-user
Content-Type: application/json

{ 
    "email":"marcosmatrinho@gmail.com",
    "password":"@Marco123"
}
```

### Buscar leaders por nome de curso
```http
GET http://localhost:3000/finder-leader?name=inglês
token: SEU_TOKEN_JWT_AQUI
```

### Listar todos os projetos
```http
GET http://localhost:3000/finder-all-projects
```

---

## Scripts importantes

- `yarn dev` - Executa o servidor em hot-reload para desenvolvimento.
- `yarn build` - Faz o build do projeto e copia templates.
- `yarn start` - Executa o servidor em produção (após o build).
- `yarn migrate` - Gera e aplica as migrations do banco.
- `yarn test` - Executa os testes automatizados.
- `yarn type` - Roda o TypeScript em modo watch (sem emitir arquivos).

---

## Testes

- Os testes são implementados com [Vitest](https://vitest.dev/).
- Para rodar os testes:
    ```bash
    yarn test
    ```

---

## Contribuição

Contribuições são bem-vindas!  
Siga os passos abaixo para contribuir:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`
4. Faça push para a sua branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto está licenciado sob a licença MIT.

---

## Autor

- [Marcos Franco Marinho](https://github.com/marcosfrancomarinho)
