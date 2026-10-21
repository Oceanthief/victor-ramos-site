"""Gera os PDFs do currículo a partir das páginas do site.

    cv.html     -> curriculo.pdf     (PT)
    en/cv.html  -> curriculo-en.pdf  (EN)

Usa o CSS de impressão de style.css (@media print), o mesmo do botão "Imprimir".

Requisitos (uma vez):
    pip install playwright
    playwright install chromium

Uso, na raiz do repositório e com internet (as fontes vêm do Google Fonts):
    python scripts/gerar_pdf.py

Depois de gerar, confira o texto extraído — é o que um ATS lê:
    python -c "from pypdf import PdfReader; print(PdfReader('curriculo.pdf').pages[0].extract_text())"
"""

from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
PAGINAS = [("cv.html", "curriculo.pdf"), ("en/cv.html", "curriculo-en.pdf")]


def main() -> None:
    with sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page()
        for origem, destino in PAGINAS:
            pagina.goto((RAIZ / origem).as_uri(), wait_until="networkidle")
            # Sem esperar as fontes, o PDF sai com a fonte de sistema.
            pagina.evaluate("document.fonts.ready")
            pagina.emulate_media(media="print")
            pagina.pdf(
                path=str(RAIZ / destino),
                format="A4",
                print_background=True,
                prefer_css_page_size=True,  # respeita as margens do @page
            )
            print(f"{origem} -> {destino}")
        navegador.close()


if __name__ == "__main__":
    main()
