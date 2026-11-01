# Raport kontroli — 31.10.2026

## Potwierdzone wykonaniem

| Kontrola | Wynik |
| --- | --- |
| Stan początkowy Git | Czysty; istniejące SPEC.md, AGENTS.md, SETUP.md i .gitignore pozostawione bez zmian |
| Instalacja `pnpm add …` / `pnpm install` | Sukces; Astro 7.4.4, Tailwind 4.3.3, TypeScript 6.0.3, Vite 8.3.5; lockfile zapisany |
| `pnpm generate:og` | Sukces; lokalny PNG 1200×630, obejrzany wizualnie |
| `pnpm check` | 23 pliki, 0 błędów, 0 ostrzeżeń, 0 wskazówek |
| `pnpm build` bez SITE_URL | Sukces; statyczny HTML, CSS, fonty, favicon, OG i robots.txt |
| `pnpm verify` bez SITE_URL | Sukces; noindex/nofollow, brak fikcyjnego canonical i sitemap, robots Disallow |
| `pnpm build` z tymczasowym SITE_URL=https://sqoonays.example | Sukces; canonical i absolutne OG, sitemap-index.xml i sitemap-0.xml |
| `pnpm verify` z testową domeną | Sukces; zgodność domeny w canonical, JSON-LD, sitemap i robots.txt |
| Przywrócenie bez SITE_URL: `pnpm build`, `pnpm verify` | Oba zakończone sukcesem; to jest końcowy stan dist/ |
| `pnpm preview --host 127.0.0.1` | Serwer uruchomił się na http://127.0.0.1:4321/ |
| `Invoke-WebRequest http://127.0.0.1:4321/` | HTTP 200 |
| `git diff --check` | Kod wyjścia 0; jedynie komunikaty Git o konwersji LF/CRLF istniejących dokumentów |

`pnpm verify` sprawdza polski język dokumentu, jeden H1, metadane, cele kotwic, dokładny URL Booksy, obecność linków Instagram/Google Maps, brak zewnętrznych skryptów, parsowanie i podstawowe pola JSON-LD, pominięcie niepotwierdzonych danych, istnienie lokalnych assetów i wymiary PNG. Nie jest pełnym walidatorem HTML ani audytem WCAG.

Podczas pierwszej instalacji poprawiono nazwę pakietu fontu Barlow Condensed (wariant variable nie istnieje). Po pierwszych kontrolach przypięto zgodny TypeScript 6, dodano jawne Vite do konfiguracji i poprawiono importy Manrope. Końcowe check/build/verify przechodzą.

## Ograniczenie podglądu

Otwarcie `http://127.0.0.1:4321/` w dostępnej przeglądarce zostało odrzucone przez mechanizm uprawnień (odmowa dostępu do originu). Nie obchodzono tej blokady. **Nie wykonano wizualnych testów desktop/mobile ani testów interakcji w przeglądarce.** HTTP 200 i statyczne kontrole nie zastępują tych testów.

Nie uruchomiono Lighthouse, Google Rich Results Test ani testu dostępności z czytnikiem ekranu. Nie potwierdzono dostępności zewnętrznych stron docelowych; dokładne adresy zostały sprawdzone w wygenerowanym HTML względem specyfikacji.

## Następne kroki

1. `pnpm dev` i ręczny przegląd 320, 375, 390, 768, 1280 oraz 1440 px: zawijanie nagłówków, brak poziomego scrolla, kadry placeholderów, menu mobilne i dolne CTA.
2. Klawiatura: skip link, menu (Enter/Spacja), kotwice, Escape, rozwinięcie pozostałych usług, widoczny focus i rezerwacja. Sprawdź reduced motion oraz zoom 200%.
3. Potwierdzenie cen, czasów i zespołu; pozyskanie logo, zdjęć i praw do publikacji; decyzja o domenie oraz ewentualnych danych kontaktowych.
4. Po uzupełnieniu materiałów ponownie uruchom check/build/verify i zmierz Lighthouse mobile na finalnej stronie.
5. Publikacja, Search Console i Profil Firmy Google dopiero po osobnej zgodzie właściciela — instrukcje w README.md.

Nie wdrożono strony, nie zarejestrowano domeny, nie zmieniono Profilu Firmy Google i nie podłączono analityki.

## Aktualizacja — portrety zespołu

Po potwierdzeniu przez użytkownika zgody na wykorzystanie zdjęć pobrano portrety z jednoznacznie podpisanych kart Patryka i Dominiki na Booksy. Pliki zapisano w `src/assets/team/`, a źródła i zakres zgody w `src/assets/team/SOURCES.md`. Zmieniono przypisanie zdjęć w `src/data/media.ts`, dopasowano `sizes` i kadrowanie CSS. Pozostałe miejsca na fotografie nadal są placeholderami.

Wykonano ponownie `pnpm check` (23 pliki, 0 błędów/ostrzeżeń/wskazówek), `pnpm build` oraz `pnpm verify` — wszystkie zakończone sukcesem. Astro wygenerowało lokalne warianty WebP o szerokościach 320/480/768/1080 px i obrazy domyślne. Źródłowe pliki obejrzano; przypisanie osób wynika z podpisów Booksy, a nie rozpoznawania twarzy. Nie zmieniono zależności, więc instalacja nie była ponawiana. Kontrola HTML potwierdziła dwa lokalne obrazy z opisami alternatywnymi, srcset, sizes i lazy loading.

Ograniczenie przeglądarki opisane powyżej pozostaje aktualne: kadry na mobile i desktopie wymagają ręcznego obejrzenia. Potwierdzenie praw do portretów nie zastępuje potwierdzenia cen, aktualnego składu zespołu ani praw do innych fotografii.

## Aktualizacja — widoczna mapa Google

Na wyraźne życzenie użytkownika dodano mapę Google bezpośrednio pod adresem w sekcji Kontakt. Komponent `GoogleMap.astro` zawiera responsywny iframe o stałej wysokości 280 px, z polskim tytułem, lazy loading i `referrerpolicy="no-referrer"`. Adres osadzenia jest w typowanych danych firmy, bez klucza API. Zachowano link wyznaczania trasy. Mapa ładuje się bez dodatkowego kliknięcia; połączenie z Google i konsekwencje dla prywatności opisano w README.

`Invoke-WebRequest` do źródła mapy: HTTP 200, odpowiedź HTML zawiera adres Mylna, bez nagłówka X-Frame-Options blokującego iframe. `pnpm check`: 24 pliki, 0 błędów/ostrzeżeń/wskazówek. `pnpm build` i `pnpm verify`: sukces. Kontrola wygenerowanego HTML potwierdziła src, title i lazy loading mapy. Nie dodano zależności. Poprzednie ograniczenie przeglądarki pozostaje: widok mapy oraz jej kadrowanie na mobile i desktopie wymagają ręcznego sprawdzenia. Położenie jest wyszukiwane po adresie ze SPEC.md, bez wymyślania współrzędnych ani identyfikatora wizytówki.

## Aktualizacja — Cloudflare Workers Static Assets / GitHub

Przygotowano `wrangler.jsonc`, lokalny Wrangler 4.156.0, komendy `cf:check`, `cf:preview`, `cf:deploy`, nagłówki `public/_headers`, własne `404.html` generowane przez Astro i instrukcję `docs/CLOUDFLARE.md`. `.node-version` wskazuje Node 24.22.1 obsługiwany przez Workers Builds; lokalne kontrole wykonywano na zainstalowanym Node 26.7.0 i pnpm 9.5.0. Git ma już remote `origin` do GitHub i gałąź `main`; nie modyfikowano zdalnego repozytorium.

- `pnpm add -D wrangler`: sukces; lockfile zaktualizowany.
- `pnpm install --frozen-lockfile`: sukces.
- `pnpm cf:check`: sukces; check 25 plików bez błędów, ostrzeżeń i wskazówek; statyczny build dwóch stron; verify oraz `wrangler deploy --dry-run` zakończone sukcesem.
- Dodatkowy build/verify z testowym `SITE_URL=https://sqoonays.example`: sukces, canonical i sitemap poprawne, 404 wykluczone z sitemap i zawsze noindex. Końcowy build przywrócono bez domeny.
- `pnpm cf:preview`: lokalny runtime uruchomił się na 127.0.0.1:8787. Początkową datę zgodności 2026-10-31 poprawiono na **2026-10-30**, najnowszą obsługiwaną przez zainstalowany workerd.
- Lokalne żądania HTTP potwierdziły: strona główna 200, nieistniejąca ścieżka 404 z własną treścią, CSS 200, `Cache-Control: public, max-age=31536000, immutable` dla pliku z hashem, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- `git diff --check`: kod 0. Lokalny serwer Cloudflare zatrzymano po kontroli.

Nie uruchomiono `wrangler login`, właściwego deploya, połączenia kont GitHub/Cloudflare ani push do GitHub. Nie ma potwierdzenia builda w zdalnym Workers Builds — przygotowanie zweryfikowano lokalnie. Do ustalenia pozostają domena (`SITE_URL`), konto/projekt Cloudflare i biznesowe materiały wskazane w README. Automatyczne publikowanie zacznie działać dopiero po świadomym skonfigurowaniu integracji i wybraniu gałęzi w Cloudflare.

## Aktualizacja — domena sqoonays.pl

Użytkownik potwierdził zakup domeny w OVH. W `.env.example` przygotowano `SITE_URL=https://sqoonays.pl`; README i `docs/CLOUDFLARE.md` opisują konkretną domenę i ręczne połączenie OVH → strefa Cloudflare → Worker Custom Domain. Plik przykładowy nie ustawia automatycznie zmiennej budowania w Cloudflare.

Wykonano `pnpm cf:check` z procesową zmienną `SITE_URL=https://sqoonays.pl`: check 25 plików bez błędów i ostrzeżeń, statyczny build, verify (canonical/sitemap/OG/JSON-LD dla tej domeny, brak 404 w sitemap) oraz Wrangler dry-run — sukces. Końcowe `dist/` pochodzi z tego builda dla domeny produkcyjnej; nie jest dowodem jej działania w internecie. Lokalnie nie utworzono `.env`. Nie zmieniono DNS, nameserverów, ustawień konta OVH ani Cloudflare, nie wykonano push lub publikacji.

Publiczne zapytania DNS w czasie kontroli wskazały nameservery OVH. Przyłączenie do Cloudflare, certyfikat HTTPS i przekierowanie www wymagają wykonania instrukcji przez użytkownika. Pozostałe materiały i fakty biznesowe nadal wymagają potwierdzenia według README.

## Aktualizacja — zdjęcie salonu i portfolio, 01.11.2026

Dodano dostarczone `IMG_1505.jpeg` jako lokalne `src/assets/salon/interior.jpg`: hero i pierwszy element galerii. Dodatkowo pobrano po jednym zdjęciu realizacji z publicznych postów `@sqoonaybarbershop` (C69KGwmorG6) i `@domi.nika_hair` (C5eIdVmrPgR). Użytkownik ponownie potwierdził zgody. Źródła i zakres wykorzystania zapisano w `src/assets/SOURCES.md`. Posty tagują poprzednie miejsce pracy, dlatego galeria opisuje je jako wcześniejsze portfolio, a nie realizacje sfotografowane na Mylnej. Nie dodano niepotwierdzonej indywidualnej atrybucji Patryka.

Zmieniono dane mediów, podpisy i tekst galerii, rozmiary obrazów oraz kadr CSS hero. Fotografia wnętrza w galerii ma poziomy kadr. Domyślny `src` ograniczono do 1080 px, w hero do 1440 px; zachowano srcset, lazy loading poza hero i wysoki priorytet hero. Źródłowe fotografie nie były retuszowane ani modyfikowane generatywnie.

- `pnpm cf:check` z `SITE_URL=https://sqoonays.pl`: sukces. Astro check 25 plików, 0 błędów/ostrzeżeń/wskazówek; build, verify i Wrangler dry-run zakończone sukcesem.
- Kontrola wynikowego HTML: sześć lokalnych elementów img, poprawne opisy alt i srcset, wszystkie wskazane warianty WebP istnieją, brak renderowanych placeholderów zdjęć.
- Kontrola Sharp metadata: 13 wygenerowanych wariantów wnętrza i portfolio bez źródłowych danych EXIF. Zdjęcie wnętrza ma warianty od około 10 KB do 130 KB zamiast 2,6 MB oryginału.
- Nie zmieniono zależności, więc instalacji nie ponawiano. Zachowano zastane lokalne zmiany dokumentacji i konfiguracji domeny.
- Publiczne profile i pobrane fotografie obejrzano. Nie ponawiano wcześniej zablokowanego dostępu przeglądarki do lokalnego podglądu. Ostateczne kadry strony na mobile i desktopie pozostają do ręcznego obejrzenia przez `pnpm dev`.

Nie wykonano commit/push ani publikacji. Dalsze nierozstrzygnięte dane biznesowe pozostają wskazane w README.
