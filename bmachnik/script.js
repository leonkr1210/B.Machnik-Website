/* ============================================================
   BERND MACHNIK — MALEREI
   script.js

   Diese Datei musst du normalerweise NICHT anfassen.
   Alles, was du pflegst, steht in  daten.js.

   Was hier passiert:
     1  Navigation (Hintergrund beim Scrollen, Menü auf dem Handy)
     2  Sanftes Einblenden beim Scrollen
     3  Arbeiten aufbauen (Vorschau, volles Raster, Filter)
     4  Lightbox (Bild groß anzeigen)
     5  Ausstellungen aufbauen (Vorschau, Register)
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     Kleine Helfer
     -------------------------------------------------------- */

  // Wandelt Sonderzeichen in sicheren HTML-Text um.
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Liest eine Liste aus daten.js aus — fehlt sie, gibt es eine leere Liste.
  function liste(name) {
    return Array.isArray(window[name]) ? window[name] : [];
  }

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }


  /* ========================================================
     1  NAVIGATION
     ======================================================== */

  function initNav() {
    var nav = $('.nav');
    if (!nav) return;

    // Hintergrund einblenden, sobald man ein Stück gescrollt hat.
    // Auf Unterseiten (Klasse nav--solid) ist er immer da.
    if (!nav.classList.contains('nav--solid')) {
      var onScroll = function () {
        nav.classList.toggle('is-solid', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Menü-Schalter für Mobilgeräte
    var toggle = $('.nav__toggle', nav);
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      // Menü schließen, sobald ein Punkt angeklickt wurde
      $$('.nav__links a', nav).forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }


  /* ========================================================
     2  SANFTES EINBLENDEN
     Alles mit der Klasse "reveal" blendet beim Scrollen ein.
     ======================================================== */

  function initReveal() {
    var els = $$('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { observer.observe(el); });
  }

  // Nachträglich eingefügte Elemente ebenfalls beobachten
  function revealNeu(container) {
    $$('.reveal', container).forEach(function (el) {
      el.classList.add('is-visible');
    });
  }


  /* ========================================================
     3  ARBEITEN
     ======================================================== */

  var werkeAktuell = [];   // die gerade sichtbaren Werke (für die Lightbox)

  function werkHTML(werk, index) {
    var meta = [werk.technik, werk.masse, werk.jahr]
      .filter(Boolean)
      .join(' · ');

    return '' +
      '<button class="work" type="button" data-index="' + index + '">' +
        '<img src="' + esc(werk.bild) + '" alt="' +
             esc(werk.titel + ', ' + (werk.jahr || '')) + '" loading="lazy">' +
        '<span class="work__caption">' +
          '<span class="work__title">' + esc(werk.titel) + '</span>' +
          '<span class="work__meta">' + esc(meta) + '</span>' +
        '</span>' +
      '</button>';
  }

  // Zeigt einen Platzhalter, wenn eine Bilddatei noch fehlt,
  // damit die Seite nie „kaputt“ aussieht.
  function bilderAbsichern(container) {
    $$('.work img', container).forEach(function (img) {
      img.addEventListener('error', function () {
        var work = img.closest('.work');
        if (work) {
          work.classList.add('is-missing');
          work.removeAttribute('data-index');
        }
      });
    });
  }

  function renderWerke(container, werke) {
    werkeAktuell = werke;

    if (!werke.length) {
      container.innerHTML = '<p class="works__empty">In dieser Serie sind derzeit keine Arbeiten hinterlegt.</p>';
      return;
    }

    container.innerHTML = werke.map(werkHTML).join('');
    bilderAbsichern(container);
  }

  function initWerkeVorschau() {
    var container = $('[data-works="preview"]');
    if (!container) return;

    var werke = liste('WERKE').filter(function (w) { return w.start; });
    // Höchstens 6 Bilder in der Vorschau
    renderWerke(container, werke.slice(0, 6));
  }

  function initWerkeSeite() {
    var container = $('[data-works="all"]');
    if (!container) return;

    var alle = liste('WERKE');
    var serien = liste('SERIEN');
    var filterBox = $('[data-filters]');

    // Filter-Schaltflächen erzeugen
    if (filterBox && serien.length) {
      var buttons = ['<button class="filter-btn" type="button" data-serie="alle" aria-pressed="true">Alle Arbeiten</button>'];

      serien.forEach(function (serie) {
        var anzahl = alle.filter(function (w) { return w.serie === serie.id; }).length;
        if (!anzahl) return;   // leere Serien gar nicht erst anzeigen
        buttons.push(
          '<button class="filter-btn" type="button" data-serie="' + esc(serie.id) + '" aria-pressed="false">' +
            esc(serie.name) +
            (serie.zeitraum ? '<em>(' + esc(serie.zeitraum) + ')</em>' : '') +
          '</button>'
        );
      });

      filterBox.innerHTML = buttons.join('');

      filterBox.addEventListener('click', function (event) {
        var btn = event.target.closest('.filter-btn');
        if (!btn) return;

        $$('.filter-btn', filterBox).forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        var serie = btn.getAttribute('data-serie');
        renderWerke(container, serie === 'alle'
          ? alle
          : alle.filter(function (w) { return w.serie === serie; }));
      });
    }

    renderWerke(container, alle);
  }


  /* ========================================================
     4  LIGHTBOX
     ======================================================== */

  var lightbox, lbImg, lbCaption, lbIndex = 0, letzterFokus = null;

  function baueLightbox() {
    if (lightbox) return;

    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Bildansicht');
    lightbox.innerHTML = '' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Schließen">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Vorheriges Bild">&#8249;</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Nächstes Bild">&#8250;</button>' +
      '<figure class="lightbox__figure">' +
        '<img alt="">' +
        '<figcaption class="lightbox__caption"></figcaption>' +
      '</figure>';

    document.body.appendChild(lightbox);

    lbImg = $('img', lightbox);
    lbCaption = $('.lightbox__caption', lightbox);

    $('.lightbox__close', lightbox).addEventListener('click', schliessen);
    $('.lightbox__prev', lightbox).addEventListener('click', function () { blaettern(-1); });
    $('.lightbox__next', lightbox).addEventListener('click', function () { blaettern(1); });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) schliessen();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape')     schliessen();
      if (event.key === 'ArrowLeft')  blaettern(-1);
      if (event.key === 'ArrowRight') blaettern(1);
    });
  }

  function zeige(index) {
    var werk = werkeAktuell[index];
    if (!werk) return;

    lbIndex = index;
    lbImg.src = werk.bild;
    lbImg.alt = werk.titel + ', ' + (werk.jahr || '');

    var meta = [werk.technik, werk.masse, werk.jahr].filter(Boolean).join(' · ');
    lbCaption.innerHTML =
      '<strong>' + esc(werk.titel) + '</strong><span>' + esc(meta) + '</span>';
  }

  function blaettern(richtung) {
    if (!werkeAktuell.length) return;
    var next = (lbIndex + richtung + werkeAktuell.length) % werkeAktuell.length;
    zeige(next);
  }

  function schliessen() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (letzterFokus) letzterFokus.focus();
  }

  function initLightbox() {
    document.addEventListener('click', function (event) {
      var btn = event.target.closest('.work[data-index]');
      if (!btn) return;

      baueLightbox();
      letzterFokus = btn;
      zeige(parseInt(btn.getAttribute('data-index'), 10));
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      $('.lightbox__close', lightbox).focus();
    });
  }


  /* ========================================================
     5  AUSSTELLUNGEN
     ======================================================== */

  function bildOderNichts(pfad, klasse, alt) {
    if (!pfad) return '';
    return '<div class="' + klasse + '"><img src="' + esc(pfad) + '" alt="' + esc(alt) + '" loading="lazy"' +
           ' onerror="this.parentNode.style.display=\'none\'"></div>';
  }

  function initShowsVorschau() {
    var featureBox = $('[data-shows="feature"]');
    var cardsBox = $('[data-shows="cards"]');
    if (!featureBox && !cardsBox) return;

    var kommend = liste('AUSSTELLUNGEN')
      .filter(function (a) { return a.status === 'kommend' && a.start; })
      .sort(function (a, b) { return (a.jahr || 0) - (b.jahr || 0); });

    if (featureBox && kommend.length) {
      var a = kommend[0];
      featureBox.innerHTML = '' +
        bildOderNichts(a.bild, 'show-feature__media', 'Ausstellungsort ' + a.ort) +
        '<div>' +
          '<h3 class="show-feature__place">' + esc(a.ort) + '</h3>' +
          '<p class="show-feature__date">' + esc(a.zeitraum) + '</p>' +
          '<p class="show-feature__house">' + esc(a.haus) + '</p>' +
          '<p class="show-feature__text">' + esc(a.text) + '</p>' +
        '</div>';
    }

    if (cardsBox) {
      var rest = kommend.slice(1, 4);
      cardsBox.innerHTML = rest.map(function (a) {
        return '' +
          '<article class="show-card">' +
            bildOderNichts(a.bild, 'show-card__media', 'Ausstellungsort ' + a.ort) +
            '<h3 class="show-card__place">' + esc(a.ort) + '</h3>' +
            '<p class="show-card__date">' + esc(a.zeitraum) + '</p>' +
            '<p class="show-card__house">' + esc(a.haus) + '</p>' +
            '<p class="show-card__text">' + esc(a.text) + '</p>' +
          '</article>';
      }).join('');
      revealNeu(cardsBox);
    }
  }

  function registerHTML(a) {
    return '' +
      '<li class="register__item">' +
        '<div class="register__when">' + esc(a.zeitraum) + '</div>' +
        '<div>' +
          '<div class="register__place">' + esc(a.ort) + '</div>' +
          '<div class="register__house">' + esc(a.haus) + '</div>' +
          (a.text ? '<p class="register__text">' + esc(a.text) + '</p>' : '') +
        '</div>' +
      '</li>';
  }

  function initRegister() {
    var box = $('[data-register]');
    if (!box) return;

    var alle = liste('AUSSTELLUNGEN');

    var kommend = alle
      .filter(function (a) { return a.status === 'kommend'; })
      .sort(function (a, b) { return (a.jahr || 0) - (b.jahr || 0); });

    var vergangen = alle
      .filter(function (a) { return a.status !== 'kommend'; })
      .sort(function (a, b) { return (b.jahr || 0) - (a.jahr || 0); });

    var html = '';

    if (kommend.length) {
      html += '<section class="register__group">' +
                '<h2 class="register__heading">Kommende Ausstellungen</h2>' +
                '<ul class="register__list">' + kommend.map(registerHTML).join('') + '</ul>' +
              '</section>';
    }

    if (vergangen.length) {
      html += '<section class="register__group">' +
                '<h2 class="register__heading">Bisherige Ausstellungen</h2>' +
                '<ul class="register__list">' + vergangen.map(registerHTML).join('') + '</ul>' +
              '</section>';
    }

    box.innerHTML = html || '<p class="works__empty">Derzeit sind keine Ausstellungen hinterlegt.</p>';
  }


  /* ========================================================
     START
     ======================================================== */

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initWerkeVorschau();
    initWerkeSeite();
    initLightbox();
    initShowsVorschau();
    initRegister();
    initReveal();

    // Jahreszahl in der Fußzeile automatisch aktuell halten
    $$('[data-jahr]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });

})();
