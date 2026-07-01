# victor-ramos-site

Site pessoal de **Victor Ramos Alves de Matos** — contador e analista de dados (Juiz de Fora, MG).

🔗 **https://oceanthief.github.io/victor-ramos-site/**

## Estrutura

```
index.html       Página inicial (layout centralizado)
blog.html        Listagem de posts
posts/           Posts do blog (um HTML por post)
about.html       Sobre (EN + PT)
cv.html          Currículo completo + download em PDF
projetos.html    Projetos de automação e BI
estante.html     Recomendações de livros
js/site.js       Header/footer compartilhados + dark mode + menu mobile
style.css        Estilos (tokens CSS, dark mode, print)
```

## Como funciona

- **Site estático puro** — sem build, sem dependências. Basta abrir `index.html` ou servir a pasta.
- **Header/footer** são injetados por `js/site.js` (fonte única). Cada página declara `<body data-page="...">` para marcar o link ativo; páginas em subpastas usam `data-root="../"`.
- **Dark mode** com persistência em `localStorage` e detecção da preferência do sistema.
- **Novo post**: copie um arquivo de `posts/`, edite o conteúdo e adicione a entrada em `blog.html` e no `sitemap.xml`.

## Publicação

Hospedado no GitHub Pages a partir da branch `main`.
