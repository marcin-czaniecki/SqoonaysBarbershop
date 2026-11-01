# Uruchomienie istniejącego projektu

Aktualizacja: 01.11.2026. Projekt jest już zainicjalizowany; nie twórz ponownie repozytorium ani aplikacji Astro. Użyj bieżącego checkoutu.

## Wymagania

- Node wskazany w `.node-version`: **24.22.1**. `package.json` wymaga co najmniej 22.23.4; kontrole lokalne wykonywano również na 26.7.0.
- pnpm **9.5.0**, zgodnie z `packageManager` w `package.json`.
- Edytor jest dowolny. Ustawienia konta, modelu i uprawnień asystenta nie należą do konfiguracji strony.

## PowerShell

```powershell
Set-Location -LiteralPath "E:\Sqoonay's Barbershop"
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

Jeśli klon znajduje się gdzie indziej, zmień pierwszą ścieżkę. Otwórz adres podany w terminalu, zwykle `http://localhost:4321`. Zatrzymanie: Ctrl+C. Jeżeli `node` lub `pnpm` nie są rozpoznawane, dodaj katalog instalacji do PATH i otwórz ponownie terminal.

## Konfiguracja domeny

Do lokalnego uruchomienia nie potrzebujesz `.env`. Domyślnie strona używa `https://sqoonays.pl` jako adresu kanonicznego.

Opcjonalnie skopiuj `.env.example` do `.env`. `SITE_URL` nadpisuje domenę; `SITE_NOINDEX=true` blokuje indeksowanie kopii testowej. Na produkcji pozostaw `SITE_NOINDEX` nieustawione lub `false`. Zmiana tych wartości wymaga ponownego builda; w dev uruchom ponownie serwer. Nie commituj `.env` ani tokenów.

## Kontrola przed przekazaniem zmian

```sh
pnpm cf:check
pnpm cf:preview
```

`cf:check` uruchamia Astro/TypeScript, build, weryfikację plików i Wrangler **dry-run**. Nie publikuje strony. `cf:preview` udostępnia gotowe `dist/` na `http://127.0.0.1:8787`; po zmianach wykonaj ponowny build. Zatrzymanie: Ctrl+C.

Sam build: `pnpm build`. Weryfikacja istniejącego builda: `pnpm verify`. Podgląd Astro bez emulacji Cloudflare: `pnpm preview`.

W przeglądarce sprawdź widok 320/390/768/1440 px, menu, cennik, focus, Booksy i mapę po przewinięciu do adresu. Instrukcja treści: [docs/CONTENT.md](docs/CONTENT.md). Wdrożenie i konfiguracja GitHub: [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md).

## Gdy dev zgłasza timeout modułu Astro

Jeżeli po komunikacie „ready” pojawi się `Failed to create the dev server app` / `vite:invoke` z timeoutem dla `virtual:astro:manifest`, zatrzymaj zawieszoną instancję i uruchom serwer ponownie:

```sh
pnpm exec astro dev stop
pnpm dev
```

Następnie odśwież `http://localhost:4321/#opinie`. Pierwsza komenda zatrzymuje instancję Astro przypisaną do tego repozytorium; nie zabija pozostałych procesów Node. Jeśli masz dostęp do terminala działającego serwera, możesz zatrzymać go przez Ctrl+C.

W kontroli 01.11.2026 restart przywrócił odpowiedzi strony i zasobów oraz odświeżanie po zmianie komponentu. Dokładnej przyczyny pierwszego timeoutu nie odtworzono. Jeżeli błąd wróci, zachowaj pełny log i wersje z `node --version` / `pnpm --version`.
