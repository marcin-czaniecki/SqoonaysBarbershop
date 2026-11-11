# Sqoonay’s Barbershop

Polska strona salonu przy Mylnej 1 w Gdyni: Astro SSG, TypeScript strict, Tailwind CSS 4 i pnpm. Rezerwacje prowadzą do Booksy. Domyślny adres produkcyjny: **https://sqoonays.pl**. Status wymagań i danych: [SPEC.md](SPEC.md).

## Szybki start

Node zgodny z `.node-version` (24.22.1), pnpm 9.5.0. Minimalny Node według `package.json`: 22.23.4.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Podgląd: adres z terminala, zwykle `http://localhost:4321`. Zatrzymanie: Ctrl+C. Nie trzeba tworzyć `.env`. Pełna instrukcja Windows i konfiguracji: [SETUP.md](SETUP.md).

| Komenda | Działanie |
| --- | --- |
| `pnpm check` | Astro i TypeScript |
| `pnpm build` | Karta social i statyczne pliki `dist/` |
| `pnpm verify` | Kontrola poprzedniego builda |
| `pnpm preview` | Podgląd builda w Astro |
| `pnpm generate:og` | Aktualizacja karty social dla podglądu dev |
| `pnpm cf:check` | Check + build + verify + Wrangler dry-run; bez publikacji |
| `pnpm cf:preview` | Lokalna emulacja Cloudflare na porcie 8787 |
| `pnpm cf:deploy` | Pełna kontrola i **rzeczywista publikacja**, tylko po upoważnieniu |

## Dokumentacja

| Plik | Zakres |
| --- | --- |
| [SPEC.md](SPEC.md) | Aktualny zakres, fakty i status potwierdzenia |
| [AGENTS.md](AGENTS.md) | Standardy pracy nad repozytorium |
| [SETUP.md](SETUP.md) | Uruchomienie istniejącego projektu |
| [docs/CONTENT.md](docs/CONTENT.md) | Edycja danych, zdjęć, SEO i karty social; brakujące materiały |
| [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md) | GitHub, Workers Static Assets, domena i checklista publikacji |
| [QA.md](QA.md) | Bieżące wyniki kontroli i ograniczenia |
| [ROADMAP.md](ROADMAP.md) | Proponowane etapy rozwoju i zmiany w plikach |
| [Archiwum QA](docs/archive/QA-2026-10-31_2026-11-01.md) | Historia implementacji; nie jest aktualną instrukcją |

## Gdzie edytować

- `src/data/`: firma i linki (`business.ts`), jedyny edytowalny cennik (`services.ts`), zespół (`team.ts`), zdjęcia i galeria (`media.ts`), teksty social (`social.ts`), linki Google i kontrakt przyszłych opinii (`reviews.ts`).
- `src/components/`: sekcje i wspólne elementy; `src/layouts/Layout.astro`: metadane i JSON-LD; `src/styles/global.css`: wygląd i breakpointy.
- `src/assets/`: lokalne fotografie i ikony wraz z dokumentacją źródeł. Zachowuj oryginały i licencje.
- `astro.config.mjs`: SSG, fonty lokalne, Tailwind, domena, indeksowanie i sitemap.
- `scripts/`: generator karty, robots.txt i kontrola builda. `src/data/social-image.json` oraz `public/social/*.png`, `public/og.png`, `public/og.svg` są generowane — nie edytuj ich ręcznie.
- `wrangler.jsonc` i `public/_headers`: statyczny hosting oraz nagłówki cache. Nie commituj `dist/`, `.env`, tokenów ani `node_modules/`.

## Produkcja, indeksowanie i prywatność

Zwykły build używa `https://sqoonays.pl`, `index, follow`, canonical oraz sitemap. `SITE_URL` opcjonalnie zmienia domenę. **Kopia testowa wymaga `SITE_NOINDEX=true`**; brak lub pusta zmienna `SITE_URL` nie blokuje indeksowania. Zmiana ustawień budowania wymaga ponownego builda i wdrożenia. 404 zawsze ma noindex.

Brak analityki, pikseli, formularzy, zewnętrznych fontów i skryptów social. Na życzenie właściciela mapa Google ładuje się automatycznie przy sekcji kontaktu, bez przycisku aktywacji; połączenie z Google może wiązać się z jego cookies. Szczegóły integracji i zadania dotyczące informacji o prywatności: [docs/CONTENT.md](docs/CONTENT.md).

Ceny, czasy, aktualny skład zespołu i godziny otwarcia wymagają potwierdzenia. Strona korzysta z potwierdzonej nazwy JDG, telefonu i e-maila. Stopka prowadzi do polityki prywatności i regulaminu serwisu. Pełna lista brakujących danych jest w instrukcji treści.

Sekcja opinii między galerią a kontaktem działa bez API, opłat i widgetów. „Wystaw opinię” otwiera podany przez właściciela formularz Google, a „Zobacz opinie” — wizytówkę. `Reviews.astro` przyjmuje typowane dane na przyszłość; bez podłączonego źródła nie wyświetla ocen ani cytatów. Szczegóły rozbudowy są w [instrukcji treści](docs/CONTENT.md#opinie-google).

Publiczna wersja była odczytana przez PageSpeed 01.11.2026. Nie potwierdza to wdrożenia bieżącego checkoutu ani nowych wyników po optymalizacji; dowody są w QA. Zmiany DNS, push uruchamiający auto-deploy, publikacja, Search Console i Profil Firmy Google wymagają osobnego upoważnienia.
