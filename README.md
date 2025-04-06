# Projeto CRUD com Safras, Insumos, Categorias e Produtos

## Descrição
Este é um sistema desenvolvido para gerenciar entidades relacionadas a processos agrícolas, incluindo **Usuários**, **Plantações**, **Produtos**, **Categorias**, **Safras** e **Insumos**. O sistema realiza operações de CRUD (Criar, Ler, Atualizar e Deletar) para cada entidade, utilizando **Node.js** no back-end e **HTML/CSS/JavaScript** no front-end. Ideal para demonstrar habilidades em desenvolvimento web.

## Funcionalidades
O sistema inclui funcionalidades completas para:
- **Usuários**: Gerencie os dados de usuários cadastrados.
- **Plantações**: Registre e acompanhe plantações agrícolas.
- **Produtos**: Controle produtos associados às plantações e categorias.
- **Categorias**: Organize os produtos em categorias para facilitar a gestão.
- **Safras**: Administre os ciclos produtivos agrícolas, incluindo datas e plantações associadas.
- **Insumos**: Controle materiais agrícolas, como fertilizantes, sementes e defensivos.

## Tecnologias Utilizadas
- **Back-end**:
  - Node.js
  - Express.js
- **Front-end**:
  - HTML, CSS e JavaScript
- **Servidor local**:
  - Live Server

## Estrutura do Projeto
```plaintext
projeto/
├── index.html           # Página principal (Usuários)
├── plantations.html     # Página de Plantações
├── products.html        # Página de Produtos
├── categories.html      # Página de Categorias
├── harvests.html        # Página de Safras
├── supplies.html        # Página de Insumos
├── js/                  # Scripts JavaScript
│   ├── user.js          # CRUD de Usuários
│   ├── plantation.js    # CRUD de Plantações
│   ├── product.js       # CRUD de Produtos
│   ├── category.js      # CRUD de Categorias
│   ├── harvest.js       # CRUD de Safras
│   ├── supply.js        # CRUD de Insumos
├── css/                 # Estilos CSS
│   └── styles.css       # Design do sistema
├── README.md            # Documentação do projeto