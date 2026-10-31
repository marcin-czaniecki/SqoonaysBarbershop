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
