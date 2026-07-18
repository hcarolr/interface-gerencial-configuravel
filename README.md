# Interface Gerencial Configurável

Protótipo acadêmico de uma interface gerencial configurável, desenvolvido como parte do Trabalho de Conclusão de Curso do MBA em Engenharia de Software da USP/ESALQ.

O projeto tem como objetivo demonstrar a aplicação de componentização, reutilização de software e parametrização por metadados na construção de interfaces front-end voltadas a sistemas gerenciais.

## Visão geral

A aplicação foi desenvolvida com uma arquitetura front-end modular, utilizando componentes reutilizáveis e arquivos de configuração em JSON para adaptar a interface a diferentes cenários de negócio.

Nesta versão, foram implementados dois cenários demonstrativos:

- Academia
- Borracharia

Cada cenário utiliza a mesma base de componentes, mas possui módulos, campos, dados, temas visuais e regras de apresentação configurados de forma independente.

## Funcionalidades

- Login demonstrativo por perfil de usuário
- Carregamento automático do cenário conforme o usuário autenticado
- Interface parametrizada por arquivos JSON
- Temas visuais configuráveis
- Módulos gerenciais reutilizáveis
- Cadastro funcional de alunos no cenário Academia
- Cadastro funcional de produtos no estoque da Borracharia
- Persistência local dos registros via `localStorage`
- Relatórios com prévia em tela
- Exportação de relatórios em CSV
- Área administrativa demonstrativa para criação de usuários
- Layout responsivo para uso em desktop e dispositivos móveis

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- JSON
- localStorage

## Estrutura do projeto

    src/
        components/
        auth/
        dashboard/
        layout/
        reports/
        settings/
        ui/
        configs/
        data/
        utils/

## Cenários de acesso demonstrativo

Admin geral
E-mail: admin@demo.com
Senha: admin123

Academia
E-mail: academia@demo.com
Senha: academia123

Borracharia
E-mail: borracharia@demo.com
Senha: borracharia123

## Demonstração

    https://interface-gerencial-configuravel.vercel.app/

## Observação acadêmica

Este projeto possui finalidade acadêmica e foi desenvolvido como protótipo funcional para estudo de arquitetura front-end modular, componentização, reutilização de software e parametrização por metadados.

A persistência de dados foi implementada localmente no navegador, por meio de localStorage, com o objetivo de demonstrar os fluxos funcionais da interface sem a implementação de uma camada completa de back-end e os dados utilizados são fictícios.

O projeto não representa um produto comercial finalizado, mas sim uma proposta técnica e acadêmica de aplicação configurável para diferentes contextos gerenciais.

## Autoria

Projeto desenvolvido por Carolina Rangel, como parte do MBA em Engenharia de Software da USP/ESALQ.
