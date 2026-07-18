# Interface Gerencial Configurável

Protótipo acadêmico de uma interface gerencial configurável, desenvolvido como parte do Trabalho de Conclusão de Curso do MBA em Engenharia de Software da USP/ESALQ.

O projeto tem como objetivo demonstrar a aplicação de componentização, reutilização de software e parametrização por metadados na construção de interfaces front-end voltadas a sistemas gerenciais.

## Sobre o projeto

A aplicação apresenta uma base de interface reutilizável capaz de se adaptar a diferentes cenários de negócio por meio de arquivos de configuração.

Nesta versão, foram implementados dois cenários demonstrativos:

- Academia
- Borracharia

Cada cenário utiliza a mesma estrutura de componentes, mas com módulos, campos, dados e identidade visual configurados de forma independente.

## Funcionalidades

- Login demonstrativo por perfil de usuário
- Carregamento de cenário conforme o usuário autenticado
- Interface parametrizada por arquivos JSON
- Temas visuais configuráveis
- Módulos gerenciais reutilizáveis
- Cadastro funcional de alunos no cenário Academia
- Cadastro funcional de produtos no estoque da Borracharia
- Persistência local dos registros via localStorage
- Relatórios com prévia em tela
- Exportação de relatórios em CSV
- Área administrativa demonstrativa para criação de usuários

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- JSON
- localStorage

## Cenários de acesso demonstrativo

```text
Admin geral
E-mail: admin@demo.com
Senha: admin123

Academia
E-mail: academia@demo.com
Senha: academia123

Borracharia
E-mail: borracharia@demo.com
Senha: borracharia123
```
