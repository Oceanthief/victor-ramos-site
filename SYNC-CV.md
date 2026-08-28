# Sincronização entre o PDF e o site

O `curriculo.pdf` passou a ser um **documento autoral**, escrito no Word e exportado via
ilovepdf — não é mais gerado a partir de `cv.html`. Os dois documentos agora podem
divergir, e esta é a lista de conferência.

Última verificação: **28/08/2026** — PDF de 28/08/2026, 2 páginas, 207 KB.

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
| Credit Card Portfolio Analytics | **presente** | ausente |
| Extrator de Extratos Bancários em PDF | **presente** | ausente |
| Calculadora Fiscal Freelancer | ausente | Projeto 03 |
| I Got It | ausente | Projeto 04 |

O ponto mais relevante: **o Football Intel não está no PDF**, embora seja o projeto mais
forte tecnicamente e o primeiro do site. E os dois projetos que só existem no PDF
— carteira de cartão de crédito e extrator de extratos — não aparecem em lugar nenhum do
site, apesar de o `pdfplumber` estar listado na stack.

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
