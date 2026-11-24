/* ============================================================
   oceanthief-ao-vivo.js — números ao vivo do The Oceanthief Run.

   Lê o data/site.json que o próprio site de corrida publica a cada
   treino e preenche os elementos marcados com data-oc="...":
     atividades · km · horas · ultimo · atualizado · fonte

   O HTML já traz um valor escrito à mão. Se a leitura falhar
   (sem rede, site fora do ar), esse valor continua na tela.
   Se o site de corrida mudar de endereço, trocar URL_DADOS.
   ============================================================ */
(function () {
  'use strict';

  var URL_DADOS = 'https://oceanthief.github.io/oceanthief-run/data/site.json';

  var alvos = document.querySelectorAll('[data-oc]');
  if (!alvos.length || !window.fetch) { return; }

  var en = document.body.getAttribute('data-lang') === 'en';
  var locale = en ? 'en-US' : 'pt-BR';

  function numero(n) { return Math.round(n).toLocaleString(locale); }

  /* "há 3 h", "3 h ago" */
  function relativo(data) {
    var seg = (data.getTime() - Date.now()) / 1000;
    if (isNaN(seg)) { return null; }
    var fmt = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'short' });
    var abs = Math.abs(seg);
    if (abs < 3600) { return fmt.format(Math.round(seg / 60), 'minute'); }
    if (abs < 86400) { return fmt.format(Math.round(seg / 3600), 'hour'); }
    return fmt.format(Math.round(seg / 86400), 'day');
  }

  /* "24 nov", "Nov 24" — a data do treino vem no horário local, sem fuso */
  function dia(texto) {
    var d = new Date(texto);
    if (isNaN(d.getTime())) { return null; }
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).replace('.', '');
  }

  fetch(URL_DADOS, { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (dados) {
      var lista = dados.atividades || [];
      if (!lista.length) { return; }

      var metros = 0, segundos = 0, ultimo = '';
      lista.forEach(function (a) {
        metros += a.m || 0;
        segundos += a.s || 0;
        if (a.d > ultimo) { ultimo = a.d; }
      });

      var valores = {
        atividades: numero(lista.length),
        km: numero(metros / 1000),
        horas: numero(segundos / 3600),
        ultimo: dia(ultimo),
        atualizado: relativo(new Date(dados.gerado_em)),
        fonte: en
          ? 'Read live from the data file the run site publishes.'
          : 'Lidos agora do arquivo de dados que o site de corrida publica.'
      };

      Array.prototype.forEach.call(alvos, function (el) {
        var v = valores[el.getAttribute('data-oc')];
        if (v) { el.textContent = v; }
      });
      document.documentElement.classList.add('oc-ao-vivo');
    })
    .catch(function () { /* fica o valor escrito no HTML */ });
})();
