# Sqoonay’s Barbershop

Pierwsza, lokalna wersja polskiej strony salonu przy Mylnej 1 w Gdyni. Astro SSG + TypeScript strict + Tailwind CSS 4 (wtyczka Vite). Rezerwacje prowadzą do istniejącej strony Booksy. Źródłem danych jest `SPEC.md`; ceny i skład zespołu pozostają jawnie oznaczone jako wymagające potwierdzenia.

## Uruchomienie

Wymagania: Node.js **22.23.4 lub nowszy**, wspierane parzyste wydanie (w tej sesji Node 26.7.0), pnpm **9.5.0**. Bez globalnej instalacji Astro. Jeśli Windows nie znajduje `node` lub `pnpm`, dodaj katalogi ich instalacji do PATH i otwórz nowy terminal.

```sh
pnpm install
pnpm dev
```

Otwórz adres wypisany w terminalu, domyślnie `http://localhost:4321`. Zatrzymaj serwer przez Ctrl+C.

```sh
pnpm check     # Kontrola Astro i TypeScript
pnpm build     # Statyczne pliki w dist/
pnpm verify    # Sprawdza wynik poprzedniego builda
pnpm preview  # Lokalny podgląd dist/, domyślnie port 4321
```

TypeScript 6 jest celowo zgodny z zakresem wspieranym przez `@astrojs/check`; TypeScript 7 nie jest obecnie obsługiwany przez tę wersję narzędzia. `pnpm-lock.yaml` utrwala konkretne wersje. Po zmianie danych wykonaj ponownie check, build i verify.

## Struktura i edycja

| Plik / katalog | Przeznaczenie |
| --- | --- |
| `src/data/business.ts` | Nazwa, adres, Booksy, Instagram, dojazd, osadzona mapa Google, tytuł i opis SEO, nawigacja |
| `src/data/services.ts` | Jedyne miejsce edycji cen, czasów, nazw usług oraz statusu weryfikacji |
| `src/data/team.ts` | Zespół, role, oficjalne profile, status potwierdzenia |
| `src/data/media.ts` | Lokalne zdjęcia i opisy alternatywne; domyślnie `null` oznacza placeholder |
| `src/components/` | Header, Hero, About, Services, Team, Gallery, Contact, Footer i elementy wspólne |
| `src/layouts/Layout.astro` | Dokument HTML, metadane, canonical i JSON-LD |
| `src/styles/global.css` | Tailwind 4, lokalne fonty, kolory, typografia, układy i breakpointy |
| `astro.config.mjs` | SSG, Vite/Tailwind, konfigurowalna domena i sitemap |
| `scripts/robots.mjs` | Generuje statyczny robots.txt po buildzie; nie jest endpointem |
| `scripts/verify-build.mjs` | Kontrola semantyki, linków, lokalnych assetów i SEO wygenerowanego HTML |
| `src/data/social.ts` | Tytuł, opis i teksty karty udostępniania linku |
| `scripts/generate-og.mjs` | Generator karty ze zdjęciem wnętrza, lokalnymi fontami i ikonami |
| `src/data/social-image.json` | Generowany manifest ścieżki i wymiarów karty |
| `public/social/sqoonays-*.png` | Karta 1200×630 z hashem treści w nazwie |
| `public/og.svg`, `public/og.png` | Generowane SVG i zgodny wstecznie adres PNG karty |
| `wrangler.jsonc` | Gotowa konfiguracja Cloudflare Workers Static Assets, bez kodu Workera |
| `public/_headers` | Nagłówki odpowiedzi i cache dla plików z hashem |
| `src/pages/404.astro` | Własna strona błędu 404 |
| `docs/CLOUDFLARE.md` | Podłączenie GitHub → Workers Builds, lokalny podgląd i ręczny deploy |

### Zdjęcia

Portrety Patryka i Dominiki pobrano z podpisanych kart pracowników na oficjalnym Booksy salonu po potwierdzeniu przez użytkownika zgody na wykorzystanie (31.10.2026). Pliki są lokalne w `src/assets/team/`; źródła i zakres potwierdzenia zapisano w `src/assets/team/SOURCES.md`. Astro generuje responsywne obrazy WebP. Nie ma hotlinkowania ani pobierania zdjęć z Booksy podczas przeglądania strony.

Zdjęcie wnętrza w hero i galerii pochodzi z załącznika użytkownika `IMG_1505.jpeg` (01.11.2026). Dwa zdjęcia realizacji pobrano z publicznych postów `@sqoonaybarbershop` i `@domi.nika_hair` po ponownym potwierdzeniu zgód. Są podpisane jako wcześniejsze portfolio — posty wskazują poprzednie miejsce pracy, więc nie przedstawiamy ich jako zdjęć wykonanych na Mylnej. Źródła są w `src/assets/SOURCES.md`, a podpisy galerii prowadzą do oryginalnych postów. Wszystkie fotografie są lokalne; strona nie ładuje zdjęć ani skryptów z Instagrama.

Hero, portrety i galeria mają już rzeczywiste zdjęcia. Komponent nadal obsługuje jawny placeholder CSS po ustawieniu zdjęcia na `null`. Tymczasowy wordmark nie jest zatwierdzonym logo.

Po otrzymaniu zdjęć z prawem do publikacji:

1. Umieść je w `src/assets/` (utwórz katalog). Użyj oryginałów o sensownej rozdzielczości, bez zbędnych metadanych lokalizacji.
2. Importuj plik w `src/data/media.ts`, np. `import interior from '../assets/interior.jpg';`.
3. Zmień właściwe `null` na `{ image: interior, alt: 'Rzeczowy opis tego, co faktycznie przedstawia zdjęcie' }`.
4. Komponent `PhotoFrame.astro` wykorzystuje Astro `getImage` i `<picture>`: AVIF (jakość 40) oraz WebP (jakość 65) dla przeglądarek bez AVIF. Generuje `srcset` od 240 px do 1080 px (hero od 320 px do 1440 px), deklaruje rozmiary obrazu i lazy loading. Hero jest ładowane od razu z wysokim priorytetem; jego kadr CSS eksponuje stanowiska. Zdjęcia nie mają podwójnego pobierania: przeglądarka wybiera właściwy format i rozmiar.
5. Przy kolejnych zdjęciach aktualizuj podpisy i źródła w `src/data/media.ts` oraz `src/assets/SOURCES.md`. Sprawdź kadry na telefonie i desktopie.

Fonty Manrope i Barlow Condensed są serwowane lokalnie z pakietów Fontsource na licencji OFL-1.1; licencje znajdują się w odpowiednich pakietach. Konfiguracja `fonts` w Astro używa lokalnego providera, poprawnych zakresów Latin/Latin Ext (w tym polskich znaków), dopasowanych metryk fontów zastępczych oraz preload w `Layout.astro`. Fonty nie są pobierane z zewnętrznych serwisów podczas budowania ani przeglądania. Niewielki CSS strony jest osadzony w HTML, żeby uniknąć dodatkowego żądania blokującego renderowanie.

Ikony interfejsu pochodzą z [Google Material Symbols](https://fonts.google.com/icons), wariant **Outlined**. Dziewięć potrzebnych SVG jest zapisanych lokalnie w `src/assets/icons/material-symbols/`; wspólny, typowany komponent `Icon.astro` składa je bez fontu ikon i dodatkowego JavaScriptu. Pliki źródłowe i przypiętą rewizję opisano w `SOURCES.md` obok ikon. Licencja Apache 2.0 jest dołączona do repozytorium i wynikowego builda w `public/licenses/material-symbols-LICENSE.txt`. Strzałka w grafice OG również pochodzi z tego zestawu. Oznaczenia menu/zamknięcia i plus/minus przełączają się przez CSS oraz natywny stan `details`.

## Dane do potwierdzenia przed publikacją

- Wszystkie usługi, ceny i czasy z odczytu 31.10.2026; po akceptacji ustaw `serviceReview.confirmed` na `true` i zaktualizuj datę.
- Obecność Patryka i Dominiki oraz oficjalne linki; po akceptacji ustaw `teamConfirmed` na `true`.
- Oficjalne logo, kolory i typografia; obecny kierunek wizualny jest propozycją.
- Dalsze zdjęcia i ewentualne materiały marki. Wnętrze oraz obecne zdjęcia portfolio i zespołu mają potwierdzenie zgody użytkownika w czacie; dla kolejnych materiałów zachowaj taki sam sposób dokumentacji źródeł.
- Autentyczny opis salonu od właściciela. Obecny tekst jest neutralny i oparty na specyfikacji.
- Numer telefonu, godziny dla każdego dnia, status działalności i e-mail, jeżeli mają być publikowane. Do tego czasu pola są pominięte, także w JSON-LD.
- Przyłączenie potwierdzonej domeny `sqoonays.pl` do Cloudflare oraz treści prawne adekwatne do faktycznej konfiguracji hostingu.

Nie dodawaj fikcyjnych ocen, opinii, wyróżnień ani niepotwierdzonych specjalizacji.

## Domena i SEO

Docelowa domena potwierdzona przez użytkownika: **https://sqoonays.pl** (rejestrator OVH). Jest domyślną domeną w `astro.config.mjs`; zwykły build dopuszcza indeksowanie także bez zmiennej `SITE_URL` lub z jej pustą wartością. Opcjonalne `SITE_URL` nadpisuje domenę. Astro odczytuje ustawienia podczas budowania, więc zmiana wymaga nowego builda i wdrożenia. Przyłączenie DNS i domeny nie zostało wykonane w ramach zmian w kodzie; instrukcja jest w `docs/CLOUDFLARE.md`.

Domyślnie strona główna ma `index, follow`, robots.txt z `Allow: /`, canonical, absolutne adresy OG oraz `sitemap-index.xml` i `sitemap-0.xml` dla domeny produkcyjnej. Dla publicznej kopii testowej ustaw jawnie **build variable `SITE_NOINDEX=true`**: otrzymasz `noindex, nofollow`, robots.txt z `Disallow: /`, bez canonical i sitemap. Na produkcji usuń tę zmienną lub ustaw `false`. Puste `SITE_URL` nie blokuje już indeksowania. Strona błędu 404 pozostaje zawsze `noindex`. `noindex` nie jest kontrolą dostępu.

JSON-LD `HairSalon` zawiera jedynie nazwę, adres, Booksy, Instagram i adres strony, gdy jest ustalony. Nie dodajemy niepotwierdzonych cen, godzin, telefonu, zdjęć ani ocen. Jedno H1, polski język dokumentu, title/description, OG/Twitter Card i favicon są dostępne od początku.

### Podgląd linku w social media

Karta 1200×630 zawiera autentyczne zdjęcie wnętrza, nazwę, lokalizację, hasło i informację o rezerwacji Booksy. Teksty są w `src/data/social.ts`, a kompozycja w `scripts/generate-og.mjs`. Generator korzysta z lokalnego zdjęcia i fontów; zamienia litery na kształty SVG, dzięki czemu grafika nie zależy od fontów systemowych na Windows lub w Cloudflare. Używa Sharp i narzędzi fontów dostarczanych z Astro, bez dodatkowych zależności ani sieci podczas generowania.

`pnpm generate:og` tworzy PNG, samodzielny SVG i `src/data/social-image.json`. `pnpm build` wywołuje generator automatycznie przed Astro. Po ręcznych zmianach tekstów uruchom generator także dla podglądu `pnpm dev`. Commituj manifest i wygenerowaną kartę razem ze źródłami. Hash treści w nazwie pliku zmienia URL obrazu przy zmianie grafiki; `/og.png` pozostaje zgodnym wstecznie adresem. Starsze, już opublikowane wersje kart warto zachować, jeśli mogą być nadal używane w pamięci podręcznej komunikatorów.

Layout publikuje tytuł, krótki opis, adres kanoniczny, absolutny HTTPS URL grafiki, MIME, wymiary i opis alternatywny Open Graph oraz Twitter `summary_large_image`. Domyślnie używa `https://sqoonays.pl`; przy zmianie domeny ustaw poprawne `SITE_URL` podczas builda. Nie trzeba instalować skryptów Facebooka, SDK ani trackerów.

Po wdrożeniu sprawdź publiczny HTML oraz URL obrazu z manifestu: oba muszą odpowiadać bez logowania i blokad dla botów. Serwisy mają własną pamięć podręczną, zasady i różne kadry; karta nie gwarantuje identycznego wyglądu w każdej aplikacji. Przy starym podglądzie Facebook/Messenger możesz ręcznie użyć [Sharing Debugger](https://developers.facebook.com/tools/debug/) i ponownego pobrania (`Scrape Again`). Grafika nie będzie widoczna online, dopóki zmiany nie zostaną wdrożone. W chwili lokalnej kontroli 01.11.2026 domena `sqoonays.pl` nie rozwiązywała się przez używany resolver, więc testu pobierania karty z produkcji nie wykonano.

## Prywatność i dostępność

Brak analityki, pikseli, cookies ustawianych przez kod aplikacji, formularzy, backendu, zewnętrznych fontów i skryptów ładowanych do głównego dokumentu. Na wyraźne życzenie użytkownika sekcja „Nasz adres” zawiera mapę Google w iframe, wyszukującą Mylna 1, 81-009 Gdynia. `IntersectionObserver` uruchamia pobieranie mapy automatycznie, gdy sekcja znajdzie się w odległości do 200 px od widoku; wcześniej iframe pozostaje w nieaktywnym `<template>`, więc skrypty Google nie obciążają początku strony. Nie wymaga kliknięcia. Przy wyłączonym JS mapę obsługuje `<noscript>` z natywnym lazy loadingiem. Miejsce na mapę ma zawsze wysokość 280 px, iframe ma dostępny tytuł; nie potrzebuje klucza API ani zależności. Jej wyświetlenie łączy przeglądarkę z Google, które otrzymuje dane połączenia (np. adres IP) i może korzystać z własnych cookies. Nie ma dodatkowego przycisku zgody ani zapisywania preferencji. `referrerpolicy="no-referrer"` ogranicza przekazywanie adresu strony. Zasady dostawcy: [Prywatność Google](https://policies.google.com/privacy). Przed publikacją uwzględnij tę integrację w informacji o prywatności i oceń docelowe ustawienia zgód.

Przeglądanie strony nie ładuje Booksy ani Instagrama. Linki otwierają się w tej samej karcie, bez `target="_blank"` i bez dostępu do `window.opener`. Zachowano bezpośredni link do wyznaczenia trasy, także na wypadek niedostępności mapy lub zablokowania jej przez przeglądarkę. Przed publikacją oceń także logi i ustawienia wybranego hostingu. Nie utworzono fikcyjnej polityki prywatności.

Menu mobilne i rozwinięcie cennika wykorzystują natywne `details/summary`. Mały skrypt zamyka menu po wybraniu kotwicy, kliknięciu poza menu lub Escape. Strona ma skip link, widoczny focus, semantyczne sekcje, obsługę reduced motion i dolne CTA z zarezerwowanym miejscem w dokumencie. Wszystkie informacje i rezerwacje działają bez JavaScriptu.

## Cloudflare Workers Static Assets i GitHub

**W tej sesji niczego nie opublikowano. Nie uruchamiaj poleceń wdrożenia bez zgody właściciela.** Nie potrzeba adaptera SSR, API ani kodu Workera.

Repozytorium jest przygotowane do połączenia z **Cloudflare Workers Builds**, które pobiera kod bezpośrednio z GitHub. Po świadomym włączeniu integracji push do wybranej gałęzi uruchamia build i publikację. Nie potrzeba GitHub Actions, adaptera Cloudflare do Astro, własnego backendu ani ręcznego wysyłania `dist` do GitHub.

```sh
pnpm install --frozen-lockfile
pnpm cf:check    # Astro check + build + verify + Wrangler dry-run, bez publikacji
pnpm cf:preview  # Lokalna emulacja Cloudflare: http://127.0.0.1:8787
```

Ustawienia Workers Builds: root katalog główny repozytorium, build `pnpm cf:check`, deploy `pnpm exec wrangler deploy`, nazwa Workera `sqoonays-barbershop`. Node jest wskazany w `.node-version`, pnpm w `packageManager`. Produkcja domyślnie używa `https://sqoonays.pl` i dopuszcza indeksowanie. Upewnij się, że produkcyjna **build variable** `SITE_NOINDEX` jest usunięta lub ma wartość `false`.

Pełna instrukcja krok po kroku, w tym GitHub oraz alternatywny ręczny deploy: [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md). Zainstalowano lokalny, przypięty Wrangler; `pnpm cf:deploy` jest komendą faktycznie publikującą i nie została uruchomiona.

Oficjalne instrukcje: [Astro — instalacja](https://docs.astro.build/en/install-and-setup/), [Tailwind 4](https://docs.astro.build/en/guides/styling/#tailwind), [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/).

## Ręczna checklista po zatwierdzonym wdrożeniu

- [ ] Obejrzyj 320/375/390 px, tablet 768 px, desktop 1280/1440 px. Brak poziomego scrolla; dolne CTA nie zasłania treści. Sprawdź zoom 200%.
- [ ] Przejdź stronę klawiaturą: skip link, menu, Escape, cennik, CTA. Sprawdź czytnik ekranu, kontrast i preferencję ograniczenia animacji.
- [ ] Zweryfikuj faktyczne strony docelowe Booksy i Instagrama oraz trasę do Mylnej 1. Kontrola lokalnego HTML potwierdza adresy, nie dostępność usług zewnętrznych.
- [ ] Zmierz Lighthouse mobile (cel Performance i SEO ≥90) na finalnym buildzie ze zdjęciami. Wynik nie jest gwarantowany. Sprawdź LCP/CLS/INP oraz pobierane zasoby.
- [ ] Zweryfikuj JSON-LD w Google Rich Results Test i metadane przy udostępnianiu.
- [ ] W Google Search Console dodaj usługę domenową, ręcznie zweryfikuj DNS, wyślij `https://sqoonays.pl/sitemap-index.xml`, sprawdź adres główny w Inspekcji URL. Zweryfikuj, że produkcja nie ma `noindex`.
- [ ] Po osobnej zgodzie właściciela dodaj zatwierdzony URL w Profilu Firmy Google. Sprawdź spójność nazwy, adresu oraz potwierdzonych godzin/telefonu; zachowaj oficjalny link rezerwacji Booksy.
- [ ] Obserwuj raporty indeksowania i Core Web Vitals. Nie obiecujemy pozycji ani terminu indeksacji.

Wyniki kontroli wykonanych w tej sesji i ograniczenia podglądu znajdują się w `QA.md`.
