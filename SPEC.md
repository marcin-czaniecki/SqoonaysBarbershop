# Sqoonay’s Barbershop — specyfikacja serwisu

Aktualizacja: **01.11.2026**. Dokument opisuje aktualny zakres i status danych. Propozycje kolejnych etapów są w [ROADMAP.md](ROADMAP.md); nie stanowią części zaakceptowanego MVP.

## Cel i zakres

Polska, statyczna strona lokalnego barbershopu w Gdyni. Ma ułatwiać poznanie salonu, dojazd i rezerwację przez istniejący Booksy. Priorytety: użytkownik mobilny, dostępność, szybkość i lokalna widoczność.

Jedna strona `/` z sekcjami Header, Hero, O nas, Usługi i cennik, Zespół, Galeria, Opinie klientów, Kontakt/Dojazd oraz Footer. Osobna strona błędu 404. Strona polityki prywatności pozostaje planowana do czasu uzgodnienia rzeczywistych danych administratora i integracji.

## Fakty i ich potwierdzenie

| Dane / decyzja | Wartość / źródło | Status |
| --- | --- | --- |
| Nazwa | Sqoonay’s Barbershop | Według oficjalnego Booksy |
| Adres | Mylna 1, 81-009 Gdynia, Polska | Według oficjalnego Booksy |
| Rezerwacje | [Booksy salonu](https://booksy.com/pl-pl/363234_sqoonay-s-barbershop_barber-shop_21029_gdynia) | Główny cel CTA „Umów wizytę” |
| Instagram salonu | [@sqoonaybarbershop](https://www.instagram.com/sqoonaybarbershop/) | Link oficjalnego profilu |
| Instagram Dominiki | [@domi.nika_hair](https://www.instagram.com/domi.nika_hair/) | Link podany w źródłach startowych |
| Wizytówka Google | [Google Maps](https://maps.app.goo.gl/YjZ2wrKRy9YpHzVGA) | Link dostarczony przez właściciela |
| Wystawienie opinii | [Bezpośredni formularz Google](https://g.page/r/CULNfIfXWZ_jEBM/review) | Link dostarczony przez właściciela |
| Domena | `https://sqoonays.pl`, bez www; rejestrator OVH | Zakup potwierdzony przez właściciela |
| Zespół | Patryk — Barber; Dominika — Barber | Booksy, odczyt 31.10.2026; aktualność wymaga potwierdzenia |
| Usługi, ceny i czasy | `src/data/services.ts`, odczyt Booksy 31.10.2026 | `serviceReview.confirmed = false` |
| Telefon, godziny, e-mail | Brak potwierdzonych wartości | Pominięte w UI i JSON-LD |
| Logo i branding | Tymczasowy wordmark, propozycja kolorów i typografii | Docelowa identyfikacja wymaga akceptacji |
| Opis salonu | Neutralna treść oparta na znanych faktach | Autentyczny opis właściciela do uzupełnienia |

Wykonywalne dane są w typowanych plikach `src/data/*`. Cennik ma jedno miejsce edycji: `src/data/services.ts`; nie powielamy tabeli cen w dokumentacji. Trzy usługi wyróżnione, pozostałe dostępne w rozwijanej liście. Do potwierdzenia stawek strona pokazuje informację o ich statusie. Po akceptacji aktualizuje się dane, status i datę, zgodnie z [instrukcją treści](docs/CONTENT.md).

Zgoda na zdjęcia nie oznacza potwierdzenia cen, zespołu, biografii ani innych danych. Nie wolno wymyślać opinii, ocen, nagród, numerów telefonu, godzin lub specjalizacji.

## Zdjęcia, ikony i mapa

- Wnętrze: zdjęcie `IMG_1505.jpeg` dostarczone przez właściciela 01.11.2026; używane lokalnie w hero, galerii i karcie social.
- Portrety Patryka i Dominiki: podpisane karty pracowników Booksy; zgoda użytkownika 31.10.2026.
- Dwa zdjęcia wcześniejszego portfolio: publiczne posty salonu i Dominiki; zgoda użytkownika 01.11.2026. Nie przypisujemy ich do obecnego lokalu ani niepotwierdzonego indywidualnego autora.
- Źródła i zgody: `src/assets/SOURCES.md` i `src/assets/team/SOURCES.md`. Wszystkie fotografie serwowane lokalnie, bez hotlinkowania lub embedów Instagrama/Booksy. Placeholder CSS pozostaje stanem awaryjnym po ustawieniu zdjęcia na `null`.
- Ikony: lokalne Google Material Symbols Outlined; źródła obok SVG, licencja Apache 2.0 w `public/licenses/`.
- Na życzenie właściciela widoczna mapa Google pod adresem. Ładuje się automatycznie przy zbliżeniu sekcji do widoku, bez kliknięcia, z rezerwacją wysokości 280 px i fallbackiem bez JS. Link do wyznaczenia trasy pozostaje dostępny.

## Architektura i wygląd

- Astro SSG, TypeScript strict, Tailwind CSS 4 przez Vite, pnpm; konfiguracja i lockfile są źródłem wersji.
- Komponenty `.astro`, typowane dane, CSS mobile first; brak frameworka klienckiego, SSR, API, CMS, bazy, kont lub własnego systemu rezerwacji.
- Editorial design: mocna typografia, papier / ciemny tusz / mosiądz. Manrope i Barlow Condensed lokalnie, z preload i dopasowanymi fallbackami.
- Responsywne AVIF z fallbackiem WebP, srcset, stałe wymiary, wysoki priorytet zdjęcia hero i lazy loading pozostałych.
- Natywne `details` dla menu i cennika. Mały JS obsługuje zamykanie menu i ładowanie mapy. Rezerwacje, treść i dojazd działają bez JS.
- Semantyczne nagłówki, jeden H1, etykiety, widoczny focus, skip link, reduced motion; mobilne CTA nie przesłania treści.

## SEO, social i prywatność

- Tytuł i opis SEO w `src/data/business.ts`; canonical, Open Graph, Twitter Card, sitemap i statyczny robots.txt.
- Domyślna domena w `astro.config.mjs`: `https://sqoonays.pl`. Opcjonalne `SITE_URL` nadpisuje origin; brak lub pusta wartość pozostawia domenę domyślną.
- Domyślnie `index, follow` oraz `Allow: /`. Kopia testowa wymaga jawnego `SITE_NOINDEX=true`; wtedy brak canonical i sitemap. Strona 404 zawsze noindex i poza sitemap.
- JSON-LD `HairSalon` oparty wyłącznie na znanych faktach; bez niepotwierdzonych godzin, telefonu i ocen.
- Opinie: na życzenie właściciela darmowy wariant bez API i widgetu. Autorska sekcja po galerii, przed kontaktem, z przyciskami „Wystaw opinię” oraz „Zobacz opinie”. Obecnie nie pokazuje średniej, liczby ocen ani cytatów. Typowany model `src/data/reviews.ts` i prop komponentu umożliwiają późniejsze podłączenie zweryfikowanych danych, bez przechowywania sekretów w kliencie. Pobieranie i automatyczne odświeżanie nie są obecnie aktywne.
- Karta social 1200×630 ze zdjęciem salonu; teksty w `src/data/social.ts`, generator uruchamiany przy buildzie. Wersjonowany PNG, manifest i zgodny wstecznie `/og.png`; `/og.svg` pozostaje generowanym podglądem.
- Bez trackerów, zewnętrznych fontów i SDK social. Mapa nawiązuje połączenie z Google po zbliżeniu do sekcji. Informacja o prywatności musi opisywać rzeczywiste działanie mapy, hostingu i ewentualnych przyszłych narzędzi.

## Hosting i weryfikacja

Cloudflare Workers Static Assets, `wrangler.jsonc`, katalog `dist/`; możliwość budowania z GitHub. Nie dodajemy adaptera SSR. Szczegóły: [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md).

Publiczna wersja została odczytana przez PageSpeed Insights 01.11.2026; nie jest to potwierdzenie wdrożenia najnowszego checkoutu. Aktualne wyniki kontroli i ograniczenia są w [QA.md](QA.md). Publikacja, push uruchamiający auto-deploy, DNS, Search Console, Profil Firmy Google i analityka wymagają wyraźnego upoważnienia właściciela.

Kryteria odbioru zmian:

- `pnpm install --frozen-lockfile` i `pnpm cf:check` przechodzą; brak błędów Astro/TS, build i verify potwierdzone.
- Ręcznie: 320/375/390/768/1280/1440 px, brak poziomego scrolla, kadry zdjęć, menu, cennik, klawiatura, zoom 200%, reduced motion i mapa po przewinięciu.
- Publicznie po zatwierdzonym wdrożeniu: HTTPS, robots/canonical/sitemap, właściwe 404, Booksy, karta social i zgodność danych.
- Cel Lighthouse mobile: Performance i SEO ≥90; cel CLS ≤0,1. Wymaga pomiaru po zmianach, nie jest gwarancją wyniku ani terminu indeksacji.

Poza bieżącym zakresem pozostają e-commerce, płatności, newsletter, blog, CMS, backend i masowe strony dzielnic. Nowe funkcje wymagają uzasadnionej potrzeby i osobnego zlecenia.
