# Bieżący raport kontroli

Aktualizacja: **01.11.2026**. Wyniki dotyczą lokalnego checkoutu. Nie potwierdzają, że identyczna wersja została wdrożona. Historia wcześniejszych etapów: [archiwum QA](docs/archive/QA-2026-10-31_2026-11-01.md).

## Kontrole wykonane po dodaniu sekcji opinii

| Kontrola | Wynik |
| --- | --- |
| Początkowy `git status --short` | Zastane lokalne porządki dokumentacji zachowano; zmiany ograniczono do sekcji opinii i jej powiązań |
| `pnpm install --frozen-lockfile` | Sukces; bez zmian zależności i lockfile |
| `pnpm cf:check` → Astro / TypeScript | 30 plików, 0 błędów, 0 ostrzeżeń, 0 wskazówek |
| `pnpm cf:check` → build | Sukces; dwie strony, lokalne fonty, AVIF/WebP, karta social i sitemap |
| `pnpm cf:check` → verify | Sukces; semantyka, kotwice, Booksy, lokalne zasoby, JSON-LD, OG, produkcyjne indeksowanie i kontrole wydajności HTML |
| `pnpm cf:check` → Wrangler dry-run | Sukces; 92 pliki assetów, bez publikacji |
| `pnpm cf:preview` + lokalny odczyt HTTP | HTTP 200; sekcja opinii, oba dokładne URL-e Google i brak fikcyjnych danych potwierdzone; serwer zatrzymano |
| Kontrola dokumentacji lokalnym skryptem Node | 12 plików Markdown, 33 poprawne lokalne odnośniki; domknięte bloki kodu i poprawne kodowanie |
| `git diff --check` | Sukces; wyłącznie informacyjne ostrzeżenia o LF/CRLF |

`verify` sprawdza m.in. brak noindex na stronie produkcyjnej, noindex na 404, sześć zdjęć z srcset, preload lokalnych fontów i ich fallbacki, brak aktywnego iframe mapy w początkowym HTML oraz budżet inline JS. Sprawdza także miejsce sekcji opinii, oba linki Google, dostęp przez nawigację i brak gwiazdek / cytatów przy niepodłączonym źródle. Nie jest pomiarem CLS, pełnym walidatorem HTML ani audytem WCAG.

## Autorska sekcja opinii — wariant bez API

Właściciel wybrał darmowy wariant bez API i doprecyzował, że sekcja ma mieć własny projekt, a nie stanowić osadzenia mapy. Dodano `Reviews.astro` między galerią a kontaktem, anchor w menu, link w stopce i numerację Kontakt 06. Sekcja zawiera nagłówek, zaproszenie do podzielenia się doświadczeniem, osobną kartę Google Maps, „Wystaw opinię” do dokładnego formularza właściciela oraz „Zobacz opinie” do podanej wizytówki; zachowano także CTA Booksy. Mapa w kontakcie pozostaje niezależna.

`src/data/reviews.ts` przechowuje linki i kontrakt `GoogleReviewsState`. Aktualny status `not-connected` nie zawiera żadnej oceny, liczby opinii ani komentarzy. Nie zaimportowano danych z publicznego widoku Google Maps. Nie dodano SDK, zależności, klientowego fetch, sekretów, backendu, płatnego API ani dodatkowego iframe. Użyto dwóch lokalnych ikon Material Symbols z dotychczasowej rewizji i licencji.

Na przyszłość prop `data` obsługuje źródłową średnią/liczbę, komentarze, gwiazdki, autora/profil/awatar, daty, linki oryginałów i opis doboru. Kod tego wariantu przeszedł check i kompilację, ale rzeczywista integracja i automatyczne odświeżanie nie zostały wdrożone ani przetestowane na danych API. JSON-LD nie otrzymał opinii ani aggregateRating. Zasady przyszłego adaptera są w CONTENT.

Kontrola wizualna nowego układu na mobile i desktopie pozostaje ręczna: zapisanej blokady dostępu przeglądarki do lokalnego originu nie ponawiano i nie obchodzono. Należy sprawdzić również zawijanie rozszerzonej nawigacji i stopki. Do lokalnego odbioru: `pnpm dev`, następnie `/#opinie`.

## Stan udokumentowany wcześniej

Diagnostyka `pnpm dev`, 01.11.2026: użytkownik zgłosił timeout `vite:invoke` przy ładowaniu `virtual:astro:manifest` po starcie serwera. Zweryfikowano PID i polecenie zawieszonego procesu, zatrzymano wyłącznie serwer tego repo przez `pnpm exec astro dev stop`. Po restarcie zwykłe `pnpm dev` odpowiadało HTTP 200 na localhost:4321 (około 0,34 s) z sekcją opinii. Font WOFF2, obraz WebP i moduł CSS również 200. Tymczasowa zmiana atrybutu komponentu została wyrenderowana bez restartu; oryginał przywrócono. Test potwierdza odświeżanie komponentu w dev, nie jest testem renderowania w przeglądarce. Przyczyny pierwotnego timeoutu nie odtworzono; nie zmieniono zależności, timeoutów ani konfiguracji aplikacji. Instrukcja restartu jest w SETUP.

- Lokalny HTTP w emulatorze Cloudflare: strona i zasoby 200, nieistniejąca ścieżka 404, robots i sitemap 200; właściwy cache lokalnych fontów / zdjęć / karty social. Dowody i zakres kontroli są w archiwum.
- Publiczny [PageSpeed mobile z 01.11.2026, 18:00 CET](https://pagespeed.web.dev/analysis/https-sqoonays-pl/c3yc82xmpa?form_factor=mobile): Performance 91, Accessibility 100, Best Practices 100, SEO 66; CLS 0,198. Dotyczy wersji sprzed optymalizacji i odblokowania indeksowania. Nie jest wynikiem obecnego kodu.
- Lokalne poprawki obejmują fonty z dopasowanymi metrykami, inline CSS, AVIF/WebP, ładowanie mapy przy sekcji i domyślnie indexable build dla sqoonays.pl.
- Ostatnia próba podglądu lokalnego została odrzucona przez zapisaną politykę przeglądarki mimo zgody w czacie. Blokady nie obchodzono. W zadaniu dokumentacyjnym nie ponawiano tej operacji.

## Odbiór ręczny i produkcyjny — nadal do wykonania

- [ ] Widok 320/375/390/768/1280/1440 px: brak poziomego scrolla, czytelne nagłówki, poprawne kadry i mobilne CTA.
- [ ] Klawiatura, skip link, menu / Escape, cennik, focus, zoom 200%, reduced motion i czytnik ekranu.
- [ ] Automatyczne pojawienie się mapy przy przewinięciu do adresu i działający link dojazdu; zachowanie bez JS.
- [ ] Sekcja opinii na mobile/desktop: czytelność obu przycisków, nawigacja klawiaturą i przekierowanie do właściwego formularza Google (logowanie może być wymagane).
- [ ] Potwierdzenie danych biznesowych według [CONTENT.md](docs/CONTENT.md).
- [ ] Po zatwierdzonym wdrożeniu: publiczne HTTPS, canonical, index/follow, robots, sitemap, karta social i 404; zapisać wdrożony commit.
- [ ] Nowy PageSpeed mobile/desktop i pomiar CLS po zmianach; cel CLS ≤0,1 oraz Performance / SEO ≥90, bez gwarancji wyniku.
- [ ] JSON-LD w Rich Results Test i podgląd linku w używanych komunikatorach.
- [ ] Search Console i Profil Firmy Google po osobnym upoważnieniu; instrukcja w [CLOUDFLARE.md](docs/CLOUDFLARE.md).

## Porządki dokumentacji

W poprzednim zadaniu zaktualizowano SPEC, AGENTS, SETUP, README i instrukcję Cloudflare, utworzono instrukcję treści oraz roadmapę. Historii nie usunięto — jest wyraźnie oznaczonym archiwum. Uproszczono `.gitignore`, usunięto instrukcje ponownej inicjalizacji i nieistniejącego FIRST_PROMPT. Zachowano fotografie źródłowe, licencje, komponenty oraz istniejące adresy plików OG. Tamten etap poza komentarzem nie zmieniał zachowania strony; bieżąca sekcja opinii jest opisana powyżej.

Nie wykonano commit/push, publikacji, zmian DNS ani działań na kontach Google. Propozycje z [ROADMAP.md](ROADMAP.md) wymagają oddzielnego zlecenia; najbliższy etap to potwierdzenie danych i odbiór obecnych poprawek.
