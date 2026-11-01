# GitHub → Cloudflare Workers Static Assets

Projekt jest gotowy do hostingu statycznego. Nie został jeszcze połączony z kontem Cloudflare ani opublikowany. Utworzenie aplikacji z integracją Git i pierwszym deployem jest etapem, który wykonujesz dopiero, gdy chcesz udostępnić stronę w internecie.

## Co jest przygotowane

- `wrangler.jsonc`: nazwa `sqoonays-barbershop`, katalog `./dist`, standardowe obsługiwanie HTML i własna strona 404. Brak `main`, SSR, API, bazy i bindings.
- Wrangler w `devDependencies` i w lockfile; nie używamy losowej wersji `latest` podczas wdrożenia.
- `.node-version`: Node 24.22.1, dostępny w obrazie Workers Builds według dokumentacji Cloudflare. pnpm 9.5.0 wskazany w `package.json`.
- `public/_headers`: `nosniff`, polityka referera i roczny cache `immutable` wyłącznie dla fingerprintowanych plików `/_astro/*`. HTML pozostaje przy domyślnej obsłudze cache Cloudflare.
- `src/pages/404.astro`: polska strona błędu, zawsze `noindex`, z linkiem powrotu i Booksy. Nie ma fallbacku SPA zwracającego 200 dla nieistniejących adresów.
- `.gitignore` pomija `node_modules`, `dist`, `.env`, `.wrangler`, lokalny store pnpm i pliki `.dev.vars`.

## 1. Repozytorium na GitHub

1. Utwórz repozytorium na swoim GitHub (może być prywatne).
2. Dodaj ten projekt do repozytorium i wypchnij wybraną gałąź, np. `main`, używając GitHub Desktop lub Git. Jeżeli repozytorium już istnieje, użyj istniejącego `origin` — nie nadpisuj go.
3. W repozytorium powinny znaleźć się źródła `src/`, `public/`, `scripts/`, dokumentacja, `package.json`, **`pnpm-lock.yaml`**, **`wrangler.jsonc`** i `.node-version`.
4. Nie wysyłaj `.env`, tokenów Cloudflare ani danych logowania. Nie commituj `dist` ani `node_modules`; Cloudflare odtworzy je przy buildzie.

Nie musisz tworzyć workflow GitHub Actions. Cloudflare Workers Builds sam odbiera zmiany z GitHub.

## 2. Połączenie z Cloudflare — etap publikacji

W panelu Cloudflare przejdź do **Workers & Pages**, rozpocznij tworzenie aplikacji **Worker** i wybierz import/połączenie z repozytorium GitHub (nazwy etykiet w panelu mogą się zmieniać). Dla istniejącego Workera połączenie znajdziesz w jego ustawieniach **Builds**.

1. Zaloguj się do GitHub i autoryzuj aplikację Cloudflare Workers and Pages. Wybierz dostęp do konkretnego repozytorium, zamiast wszystkich repozytoriów, jeśli taki zakres Ci wystarcza.
2. Wybierz repozytorium oraz gałąź produkcyjną. Jeśli używasz `main`, push do `main` będzie wyzwalał publikację.
3. Ustaw dokładnie:

| Pole | Wartość |
| --- | --- |
| Worker / Project name | `sqoonays-barbershop` — zgodne z `name` w `wrangler.jsonc` |
| Root directory | Katalog główny repozytorium (`/` lub puste pole według panelu) |
| Build command | `pnpm cf:check` |
| Deploy command | `pnpm exec wrangler deploy` |
| Node | Z `.node-version`: `24.22.1` |
| pnpm | Z `packageManager`: `pnpm@9.5.0` |
| Build variable `SITE_URL` | `https://sqoonays.pl` dla produkcji; puste dla wersji testowej `noindex` |

`assets.directory = "./dist"` jest już zapisane w konfiguracji. To **Workers Static Assets**, nie projekt Pages — pole „Build output directory” z instrukcji Pages nie zastępuje tutaj `wrangler.jsonc`.

Cloudflare instaluje zależności przed buildem, rozpoznając pnpm i lockfile. Jeśli wyłączysz automatyczną instalację, użyj komendy budowania `pnpm install --frozen-lockfile && pnpm cf:check`. Nie ustawiaj instalacji wyłącznie zależności produkcyjnych — kompilator Tailwind, kontrola Astro i Wrangler są narzędziami deweloperskimi potrzebnymi podczas budowania.

4. Na początek nie włączaj automatycznych preview builds dla innych gałęzi. Możesz skonfigurować je osobno później, z własnymi zmiennymi i `noindex`; nie współdziel produkcyjnego `SITE_URL` z kopią testową.
5. Utworzenie projektu i uruchomienie deploya opublikuje stronę. Po jego sukcesie użyj rzeczywistego adresu `workers.dev` zwróconego przez Cloudflare. Nie zgadujemy nazwy Twojej subdomeny konta.

Nie potrzebujesz tokena Cloudflare zapisanego w GitHub Actions. Uwierzytelnianie Workers Builds jest konfigurowane w Cloudflare. Nie wklejaj danych dostępu do repozytorium ani czatu.

## 3. Pierwsza wersja i domena

Możesz najpierw udostępnić testową wersję `workers.dev` bez `SITE_URL`: będzie miała `noindex` i robots blokujący indeksowanie. Jest to nadal publicznie dostępna strona — `noindex` nie jest hasłem ani kontrolą dostępu.

Po wybraniu domeny:

1. Podłącz zatwierdzoną domenę w ustawieniach domen Workera. DNS i rejestracja domeny są osobnym krokiem.
2. Ustaw `SITE_URL` jako **build variable**, np. pełny zatwierdzony adres strony. Nie jest to zmienna runtime ani sekret i nie należy umieszczać jej w `vars` Workera.
3. Uruchom ponowny build/deploy. Dopiero nowy build otrzyma canonical, absolutne OG, sitemap i robots dopuszczający indeksowanie.
4. Sprawdź HTTPS i wybierz jeden wariant domeny. Przekierowania pozostałych wariantów skonfiguruj świadomie w Cloudflare — konfiguracja repozytorium nie zakłada własności żadnej domeny.

Jeśli produkcją ma pozostać adres `workers.dev`, ustaw `SITE_URL` na ten **faktyczny** adres po potwierdzeniu, że ma być indeksowany.

## Domena sqoonays.pl zakupiona w OVH

Docelowy adres produkcji: **https://sqoonays.pl**, bez `www`. Użytkownik potwierdził zakup domeny w OVH. Poniższe kroki wykonuje właściciel w panelach dostawców — repozytorium nie zmienia delegacji DNS ani konfiguracji kont.

1. W Cloudflare na tym samym koncie co Worker dodaj domenę `sqoonays.pl` jako strefę DNS (Add a domain / Onboard a domain) i wybierz plan Free, jeżeli odpowiada Twoim potrzebom. Nie przenosisz rejestracji ani płatności za domenę z OVH.
2. Sprawdź zaimportowane rekordy DNS względem strefy OVH. Jeżeli korzystasz z poczty lub innych usług pod domeną, zachowaj ich rekordy MX/TXT/DKIM i odpowiednie rekordy subdomen — skan Cloudflare może nie odtworzyć całej strefy. Jeśli panel zgłasza istniejący DNSSEC, wykonaj oficjalną procedurę migracji przed zmianą delegacji.
3. Cloudflare wyświetli **konkretną parę serwerów nazw dla tej strefy**. Skopiuj dokładnie te wartości; nie używaj przykładów z poradników.
4. W OVH przejdź do domeny `sqoonays.pl` → **Serwery DNS** → modyfikacja serwerów. Zastąp dotychczasowe serwery dwoma wskazanymi przez Cloudflare. To zmiana serwerów DNS domeny, a nie dodanie rekordów NS w zakładce „Strefa DNS”. Poczekaj, aż strefa w Cloudflare uzyska status **Active**.
5. W Cloudflare otwórz **Workers & Pages → sqoonays-barbershop → Settings → Domains & Routes → Add → Custom Domain**. Wpisz **`sqoonays.pl`**, bez `https://` i bez `/*`. Potwierdź podłączenie. Cloudflare tworzy rekord DNS i obsługuje certyfikat TLS dla Custom Domain. Jeśli importowany rekord dla tego samego hosta powoduje konflikt, sprawdź go przed zastąpieniem; nie kasuj całej strefy ani rekordów pocztowych. Nie wpisuj ręcznie adresu IP Workera.
6. W **Settings → Builds → Build variables and secrets** dodaj zwykłą zmienną `SITE_URL` o wartości **`https://sqoonays.pl`**. To zmienna budowania, nie `Variables & Secrets` dla runtime. Uruchom ponowny build/deploy po podłączeniu domeny. Nowy build ma canonical, OG i sitemap dla `sqoonays.pl` oraz dopuszcza indeksowanie.
7. Sprawdź `https://sqoonays.pl/`, `/robots.txt`, `/sitemap-index.xml` i nieistniejącą ścieżkę. Dla `www.sqoonays.pl` przygotuj osobno przekierowanie 301/308 do `https://sqoonays.pl`, z zachowaniem ścieżki i query string; docelowe DNS i HTTPS wariantu `www` także muszą być obsłużone. Sam canonical nie wykonuje przekierowania.

Odczyt publicznego DNS 31.10.2026 podczas przygotowania: serwery `dns103.ovh.net` i `ns103.ovh.net`, rekord A domeny `213.186.33.5`, TXT `1|www.sqoonays.pl` i `v=spf1 -all`. Zapytanie MX nie zwróciło rekordów pocztowych; nie jest to pełny audyt strefy. Są to obserwacje, nie wartości do kopiowania do nowej konfiguracji. DNS nie został zmieniony.

Źródła: [Cloudflare — dodanie domeny i zmiana nameserverów](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [OVH — zmiana serwerów DNS](https://docs.ovhcloud.com/pl/guides/web-cloud/domains/dns-server-edit).

## Komendy lokalne

```sh
pnpm install --frozen-lockfile
pnpm cf:check
pnpm cf:preview
```

`cf:check` uruchamia `pnpm check`, `pnpm build`, `pnpm verify` oraz `wrangler deploy --dry-run`. Dry-run nie przesyła projektu do Cloudflare i nie uruchamia publikacji. `cf:preview` uruchamia lokalne środowisko Cloudflare pod `http://127.0.0.1:8787`; po zmianach źródeł wykonaj ponownie build i odśwież stronę. Zakończ przez Ctrl+C.

Sprawdź stronę główną, pliki CSS/WebP i nieistniejący adres, np. `/nie-ma-takiej-strony` — powinien zwrócić **404** z własną polską stroną. `pnpm dev` nadal uruchamia zwykły podgląd Astro na porcie 4321.

## Alternatywa: ręczny deploy z komputera

Te komendy są przeznaczone do późniejszego, świadomego wdrożenia. Nie zostały wykonane w ramach przygotowania.

```sh
pnpm exec wrangler login
pnpm cf:deploy
```

Sprawdź konto i nazwę Workera przed publikacją. `cf:deploy` ponawia cały check/build/verify/dry-run, a następnie wykonuje **rzeczywisty deploy**. Lokalne `SITE_URL` ustaw w `.env` na podstawie `.env.example`. Nie ma potrzeby logowania do Cloudflare przy zwykłym buildzie lub dry-run.

## Kontrola po publikacji

Potwierdź adresy Booksy i mapę, wersję mobilną, canonical, OG, robots i sitemap. Potwierdź ceny i dane zespołu oraz uzupełnij pozostałe zdjęcia. Mapa Google na życzenie właściciela łączy użytkownika z zewnętrznym dostawcą — uwzględnij to w docelowej informacji o prywatności. Search Console i Profil Firmy Google pozostają osobnymi ręcznymi krokami opisanymi w README.

## Oficjalne źródła

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Workers Builds — GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
- [Komendy build i deploy](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Wersje Node i pnpm w buildzie](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)
- [Statyczne strony i 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
- [Nagłówki i cache](https://developers.cloudflare.com/workers/static-assets/headers/)
