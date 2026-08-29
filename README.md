# victor-ramos-site

Portfólio profissional de **Victor Ramos Alves de Matos** — Data & Business Analytics
(Juiz de Fora, MG).

🔗 **https://oceanthief.github.io/victor-ramos-site/**

## Posicionamento

O site comunica a interseção **Negócios × Dados × Tecnologia**: formação em contabilidade
e finanças corporativas (CRC-MG 136287/O, 8 anos de experiência, ERP corporativo)
combinada com capacidades técnicas em SQL, Python, Power BI e engenharia de dados.

O conteúdo é sincronizado com o currículo mais recente. Ao atualizar um emprego,
formação ou projeto, altere **os quatro lugares**: `cv.html`, `en/cv.html`,
`experiencia.html` e a seção de experiência de `index.html` / `en/index.html`.

## Estrutura

```
index.html                                  Home (hero, prova, projeto, posicionamento,
                                            stack, experiência, foco, contato)
projetos.html                               Trabalho — índice de projetos
projetos/football-intel.html                Estudo de caso — em desenvolvimento
projetos/chicago-marathon-analytics.html    Estudo de caso — concluído
projetos/i-got-it.html                      Estudo de caso — produto no ar
imagens/football-intel/                     Capturas reais do dashboard
imagens/i-got-it/                           Capturas do app em produção
experiencia.html                            Linha do tempo profissional + formação
about.html                                  Sobre — narrativa de evolução
estante.html                                Aprendizado (livros) — fora da nav principal
blog.html                                   Lab — notas técnicas
posts/                                      Artigos (um HTML por post)
cv.html                                     Currículo web (fonte do PDF)
curriculo.pdf                               Documento autoral — NÃO regenerar (ver abaixo)
404.html                                    Página de erro

en/                                         Versão em inglês
  index.html · about.html · cv.html
  projetos/football-intel.html
  projetos/chicago-marathon-analytics.html
  projetos/i-got-it.html

style.css                                   Sistema de design (tokens, componentes,
                                            dark mode, responsivo, impressão)
js/site.js                                  Header/rodapé bilíngues, tema, menu,
                                            reveal e contadores
```

## Como funciona

- **Site estático puro** — sem build, sem dependências, sem framework. Abrir `index.html`
  ou servir a pasta já funciona.
- **Header e rodapé** são injetados por `js/site.js` (fonte única). Cada página declara:
  ```html
  <body data-page="trabalho" data-lang="pt" data-root="../">
  ```
  - `data-page` marca o link ativo na navegação;
  - `data-lang` (`pt` | `en`) escolhe o dicionário de rótulos e o destino do seletor de idioma;
  - `data-root` é o caminho até a raiz do site (vazio na raiz, `../` em subpastas).
- **Dark mode** com persistência em `localStorage` e detecção da preferência do sistema.
  O script inline no `<head>` aplica o tema antes da primeira pintura, evitando flash.
- **Animações** (reveal e contadores numéricos) degradam para o estado final quando
  `prefers-reduced-motion` está ativo ou quando o JavaScript não roda.

## Sistema de design

Tokens em `:root` no topo de `style.css`. O tema escuro redefine **apenas os tokens**.

| Token | Claro | Escuro |
|---|---|---|
| `--paper` | `#F5F4EF` | `#121110` |
| `--ink` | `#111111` | `#EDECE7` |
| `--ink-2` | `#6B6B6B` | `#9A968D` |
| `--accent` | `#A0442A` | `#E0785A` |

Contraste do texto secundário e do destaque verificado em ≥ 4.5:1 nos dois temas.
Tipografia: **Inter** (interface e texto) + **IBM Plex Mono** (rótulos, métricas e código).
Espaçamento em escala 4pt (`--s-1` … `--s-10`).

## O PDF do currículo

⚠️ **`curriculo.pdf` é mantido à mão — NÃO regenere a partir de `cv.html`.**

O arquivo servido pelo botão "Baixar PDF" é um documento autoral (Word → ilovepdf),
substituído manualmente. Rodar um comando de impressão headless sobre `cv.html`
sobrescreveria essa versão. Para atualizar o PDF, copie o novo arquivo por cima de
`curriculo.pdf`.

Como o PDF e a página `cv.html` são documentos independentes, **precisam ser conferidos
um contra o outro a cada atualização**. As divergências conhecidas estão em `SYNC-CV.md`.

O botão "Imprimir" de `cv.html` continua gerando uma versão impressa da página web — é
um documento diferente do PDF, e não o substitui.

## Novo post no Lab

1. Copie um arquivo de `posts/` e edite o conteúdo (envolva o texto em `class="prose"`).
2. Adicione a entrada em `blog.html`.
3. Acrescente a URL em `sitemap.xml`.

## Números do Football Intel

Os números citados no site (partidas, cartões, árbitros, percentuais de quarentena e
variância) vêm de `output/DIAGNOSTICO.md` do projeto, e as duas estatísticas do bloco
de validação são recalculadas sobre `output/data.json`. **Quando a base crescer, os
dois precisam ser atualizados juntos** — em `projetos/football-intel.html`,
`en/projetos/football-intel.html`, `index.html`, `en/index.html`, `projetos.html`,
`cv.html` e `en/cv.html`. As capturas em `imagens/football-intel/` também mostram os
totais no cabeçalho do dashboard e envelhecem junto.

## Demo ao vivo do Football Intel

O dashboard é um arquivo HTML autocontido (~2 MB) gerado por `python build.py` no
repositório do projeto. Para publicá-lo como demo navegável:

1. Copie `football-intel/output/dashboard.html` para `demos/football-intel.html`.
2. Descomente os blocos marcados `DEMO AO VIVO` em quatro arquivos:
   `projetos/football-intel.html`, `en/projetos/football-intel.html`,
   `index.html` e `projetos.html`.

Os botões e os caminhos relativos já estão escritos e corretos — basta remover os
comentários. Considere antes se a base de dados pode ser publicada.

## Publicação

GitHub Pages a partir da branch `main`. O arquivo `.nojekyll` desativa o processamento
Jekyll, garantindo que pastas e arquivos sejam servidos como estão.
