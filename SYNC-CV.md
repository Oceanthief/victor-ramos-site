# Sincronização entre o PDF e o site

O `curriculo.pdf` passou a ser um **documento autoral**, escrito no Word e exportado via
ilovepdf — não é mais gerado a partir de `cv.html`. Os dois documentos agora podem
divergir, e esta é a lista de conferência.

Última verificação: **29/08/2026** — PDF de 28/08/2026, 2 páginas, 207 KB.

---

## 1. Divergências que precisam de decisão

### 🔴 O link do GitHub no PDF está quebrado

| | Endereço | Status HTTP |
|---|---|---|
| **PDF** | `github.com/victorramosdematos` | **404** |
| **Site** | `github.com/Oceanthief` | 200 |

Um recrutador que clicar no GitHub do currículo cai numa página de erro. Ou o PDF é
corrigido para `Oceanthief`, ou a conta precisa ser renomeada para
`victorramosdematos` — e, nesse caso, o site inteiro e a URL do GitHub Pages mudam junto.

### 🟡 O LinkedIn tem dois endereços diferentes

| | Endereço |
|---|---|
| **PDF** | `linkedin.com/in/victorramosdematos` |
| **Site** | `linkedin.com/in/victor-ramos-alves-de-matos-1b3007116` |

O LinkedIn bloqueia verificação automática (responde 999 a qualquer robô), então não deu
para conferir qual está ativo. Se a URL personalizada já foi criada, o site deve adotá-la
— ela é mais curta e mais profissional. Aparece em 6 arquivos: `index.html`,
`about.html`, `cv.html`, `experiencia.html`, `js/site.js` e os equivalentes em `en/`.

### 🟡 Projetos que estão num documento e não no outro

| Projeto | PDF | Site |
|---|---|---|
| Football Intel | ausente | **Projeto 01 em destaque** |
| Chicago Marathon Analytics | presente | Projeto 02 |
| I Got It | ausente | **Projeto 03 em destaque, com demo ao vivo** |
| Bet Tracker | ausente | Projeto 04 |
| Calculadora Fiscal Freelancer | ausente | Projeto 05 |
| Credit Card Portfolio Analytics | **presente** | ausente |
| Extrator de Extratos Bancários em PDF | **presente** | ausente |

A distância aumentou em 29/08/2026. O PDF não traz **três** dos projetos que hoje
ocupam o site — Football Intel, I Got It e Bet Tracker — e um deles, o I Got It, é o
único com **demo ao vivo** (`i-got-it-eosin.vercel.app`), ou seja, a prova mais
imediata que um recrutador pode abrir. No sentido inverso, carteira de cartão de
crédito e extrator de extratos continuam existindo só no PDF.

Enquanto os dois documentos não convergirem, vale saber qual está sendo enviado: **o
site está mais atualizado que o currículo em PDF.**

### 🟡 Os números do Football Intel envelhecem rápido

A base cresceu de 7.512 para **9.051 partidas** entre 27 e 29 de agosto de 2026, e todos
os números derivados mudaram junto (cartões, árbitros, percentuais de quarentena e
variância). O site foi atualizado; qualquer material impresso feito antes disso está
desatualizado. Ver a seção correspondente no `README.md`.

### 🟡 Volume do Chicago Marathon

| | Valor |
|---|---|
| **PDF** | "~935 mil registros" |
| **Site** | 931.958 registros |

O número exato vem do próprio dataset publicado no Kaggle, cujo subtítulo diz
*"931,958 finishers"*. Como o dataset é público e linkado, vale usar o número exato nos
dois documentos — ele é verificável em um clique.

---

## 2. Divergências menores

| Item | PDF | Site |
|---|---|---|
| Kaggle | ausente | `kaggle.com/ramostherunning` |
| Telefone | presente (celular pessoal) | ausente |
| Nome do curso | "Ciências da Computação" | "Ciência da Computação" (nome oficial) |
| Inglês | "Avançado (B2/C1)" | "avançado" |
| Power BI Completo (Udemy) | ausente | presente |
| Inglês CCAA / Italiano UFJF | ausentes | presentes |

O Kaggle merece entrar no PDF: é onde está publicado o dataset do Chicago Marathon, ou
seja, a única prova externa e clicável de trabalho concluído.

Uma observação sobre o próprio PDF: a linha de posicionamento mistura idiomas —
*"Data & Business Analytics | SQL · Python · Power BI | **Finance & Accounting
Background**"* — enquanto todo o resto do documento está em português.

---

## 3. O que está alinhado

Experiência profissional (Addcon como cargo atual, Maximum com a promoção de jan/2026,
Universal Imóveis, MRS Logística), CRC-MG 136287/O, formação, competências técnicas,
sistemas ERP, obrigações acessórias e atividades complementares batem entre os dois
documentos.

---

## 4. Como manter isso em dia

1. Ao trocar o `curriculo.pdf`, rode a extração de texto e compare com `cv.html`:
   ```bash
   python -c "from pypdf import PdfReader; print('\n'.join(p.extract_text() for p in PdfReader('curriculo.pdf').pages))"
   ```
2. Confira os links do PDF com `curl -o /dev/null -w "%{http_code}" -L <url>`.
3. Atualize a data e a tabela deste arquivo.
