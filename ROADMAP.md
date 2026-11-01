# Plan rozwoju strony

Aktualizacja: **01.11.2026**. To propozycja kolejności prac, nie zlecenie automatycznej realizacji ani zgoda na publikację. Obecny zakres określa [SPEC.md](SPEC.md). Etapy można zamykać osobno; następny rozpoczyna się po spełnieniu zależności i uzgodnieniu zakresu.

## Co już uporządkowano

- README jest indeksem dokumentacji i komend; SETUP dotyczy istniejącego repozytorium, bez instrukcji ponownego `git init` i nieistniejącego FIRST_PROMPT.
- SPEC i AGENTS uwzględniają domenę, zgody na bieżące zdjęcia, zamówioną mapę, lokalne fonty/ikony, kartę social oraz jawne blokowanie indeksowania kopii testowej.
- `docs/CONTENT.md` opisuje aktualizację danych i brakujące materiały. Cennik jest edytowany tylko w `src/data/services.ts`.
- QA opisuje aktualne kontrole; historyczny dziennik pozostaje w `docs/archive/QA-2026-10-31_2026-11-01.md`.
- `.gitignore` obejmuje narzędzia używane w tym projekcie; usunięto sekcje dla nieużywanych frameworków.
- Zachowano używane komponenty, oryginały zdjęć, licencje oraz generowane pliki OG. Nie utworzono pustych stron ani fikcyjnych treści.
- Dodano na osobne zlecenie autorską sekcję opinii z linkami Google, bez API. Jej typowany kontrakt umożliwia późniejsze podłączenie ocen i komentarzy; pobieranie i odświeżanie pozostają nieaktywne.

## P0 — potwierdzenie danych i odbiór aktualnej wersji

**Cel:** wiedzieć, co publikujemy i czy poprawki rzeczywiście działają.

| Praca | Pliki do aktualizacji / utworzenia | Warunek zakończenia |
| --- | --- | --- |
| Potwierdzenie cennika i zespołu z właścicielem | `src/data/services.ts`, `src/data/team.ts`, `SPEC.md` | Potwierdzone wartości, data i flagi; znikają wyłącznie uzasadnione notatki tymczasowe |
| Test mobile, desktop i dostępności | `QA.md`; w razie błędów właściwe komponenty / CSS | Menu, cennik, focus, zoom, kadry, brak poziomego scrolla i poprawne ładowanie mapy |
| Zatwierdzone wdrożenie obecnych optymalizacji | `QA.md`; po pierwszym odbiorze opcjonalnie `docs/RELEASE.md` | Zapisany wdrożony commit, data, build i publiczny URL; bez domyślania się stanu DNS |
| Ponowny PageSpeed oraz SEO na produkcji | `QA.md` | Raport nowego wdrożenia dla mobile/desktop; sprawdzone CLS, noindex, sitemap, 404 i karta social |
| Powtarzalna kontrola publicznych metadanych | Opcjonalnie `scripts/verify-production.mjs`, komenda w `package.json` | Odczyt HTTP produkcji sprawdza canonical, robots, sitemap i obraz OG; bez publikacji i nowych usług |

Zależności: potwierdzenie danych przez właściciela, upoważnienie do publikacji oraz dostęp do podglądu. Obecny blokujący warunek testu wizualnego: zapisana polityka przeglądarki odrzuca lokalny origin. Nie wolno przedstawiać statycznych kontroli jako pomiaru CLS. Ostatni raport starej wersji: Performance 91, SEO 66, CLS 0,198 — punkt odniesienia, nie rezultat poprawek.

## P1 — pełne dane kontaktowe i marka

**Cel:** usunąć tymczasowość i ułatwić kontakt bez rozwijania backendu.

| Praca | Pliki do aktualizacji / utworzenia | Dane wejściowe i odbiór |
| --- | --- | --- |
| Telefon, godziny i e-mail | Rozszerzyć typ w `src/data/business.ts`, `Contact.astro`, `Layout.astro`, `scripts/verify-build.mjs`, SPEC | Wyłącznie potwierdzone dane; `tel:`/`mailto:`, czytelne godziny i zgodny JSON-LD; verify nadal chroni przed niepotwierdzonymi polami |
| Autentyczny opis salonu i ewentualnie barberów | `About.astro`, `src/data/team.ts`, `Team.astro` | Tekst właściciela; bez dopisywania stażu, specjalizacji i nagród |
| Oficjalna identyfikacja | Nowe pliki `src/assets/brand/*`, aktualizacja Header/Footer/CSS/favicon i generatora OG | Logo z prawem użycia, czytelność na mobile, kontrast i aktualna karta linku |
| Informacja o prywatności | Po uzgodnieniu nowy `src/pages/polityka-prywatnosci.astro`, odpowiednia treść w `src/data/`, link w Footer | Rzeczywiste dane administratora oraz opis mapy i hostingu; brak szablonowych fikcyjnych danych |

Nie tworzyć pustego `contact.ts`, `privacy.ts` ani gotowego dokumentu z placeholderami na publicznej stronie. Wybrać finalną strukturę danych dopiero po otrzymaniu treści. Jeśli powstanie nowa strona, rozszerzyć kontrolę builda; obecne założenia dotyczą głównie strony głównej i 404.

## P2 — aktualna galeria i lokalna widoczność

**Cel:** pokazać aktualny salon i odpowiedzieć na rzeczywiste pytania klientów.

| Praca | Pliki do aktualizacji / utworzenia | Kryterium odbioru |
| --- | --- | --- |
| Nowa sesja salonu i realizacji | `src/assets/salon/*`, `src/assets/gallery/*`, `src/data/media.ts`, SOURCES | Zgody i podpisy, poprawne kadry, brak hotlinkowania, kontrola rozmiaru obrazów |
| FAQ o wizycie | Opcjonalne `src/data/faq.ts`, `src/components/Faq.astro`, aktualizacja `index.astro` | Pytania od klientów i odpowiedzi właściciela; semantyczna sekcja, bez obietnicy rozszerzonych wyników Google |
| Search Console i Profil Firmy Google | `QA.md` lub `docs/RELEASE.md`, checklista w [CLOUDFLARE.md](docs/CLOUDFLARE.md) | Ręczna weryfikacja domeny i sitemap, spójny URL i dane; działania w panelach tylko po upoważnieniu |

Nie dodawać osobnych stron dzielnic ani usług wyłącznie dla liczby URL. Podstrony usług rozważyć dopiero, gdy będą miały własną, użyteczną treść i rzeczywisty cel dla klientów.

## P3 — utrzymanie i rozwój na podstawie potrzeb

- Przy każdej zmianie zależności zachować aktualny lockfile, uruchomić `pnpm cf:check` i odnotować regresje w QA; nie aktualizować narzędzi tylko po to, żeby zmienić wersję.
- Jeśli powstaną dodatkowe strony, rozwinąć `scripts/verify-build.mjs` o ich metadane, linki i indeksowanie. Testy mają chronić rzeczywiste funkcje, bez rozbudowy infrastruktury dla prostych zmian tekstu.
- Po pierwszym kontrolowanym wydaniu można utworzyć `docs/RELEASE.md` jako krótką ewidencję wdrożeń i planu powrotu do poprzedniej wersji. Bez kopiowania całego dziennika sesji.
- Analitykę rozważyć dopiero przy konkretnym pytaniu biznesowym, wyborze zakresu i osobnym upoważnieniu. Bez automatycznego dodawania trackerów.
- CMS, konta, sklep i własne rezerwacje pozostają poza planem bieżących etapów. Rezerwacja nadal przez Booksy.

## Zasady dokumentacji

Bieżące instrukcje są w README / SETUP / CONTENT / CLOUDFLARE; fakty i zakres w SPEC, a plan w tym pliku. QA zawiera aktualny wynik i wyraźne ograniczenia. Po zamknięciu etapu zaktualizuj status i odpowiednie dokumenty; nie twórz plików „final”, „final2” lub kopii tej samej checklisty. Archiwum służy historii, nie do kierowania bieżącym buildem.
