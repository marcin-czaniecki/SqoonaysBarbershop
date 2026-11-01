# GitHub i Cloudflare Workers Static Assets

Aktualizacja: 01.11.2026. Konfiguracja repozytorium jest gotowa do hostingu statycznego. Publiczna wersja była odczytana przez PageSpeed; zgodność wdrożonej wersji z bieżącym kodem oraz ustawienia konta Cloudflare wymagają osobnego sprawdzenia. Historia pomiarów jest w [QA.md](../QA.md).

## Konfiguracja w repozytorium

- `wrangler.jsonc`: Worker `sqoonays-barbershop`, assety `./dist`, obsługa statycznego HTML i własnego `404.html`, bez SSR i kodu serwera.
- `public/_headers`: nosniff, polityka referera oraz roczny immutable cache dla wersjonowanych plików `/_astro/*` i `/social/*`. HTML i robots pozostają odświeżalne.
- `.node-version`: 24.22.1; pnpm 9.5.0 w `package.json`. Konkretne zależności odtwarza `pnpm-lock.yaml`.
- `astro.config.mjs`: domyślna domena `https://sqoonays.pl`, sitemap, robots i lokalne fonty.

Nie potrzeba projektu Pages, adaptera SSR ani GitHub Actions. Nie wysyłaj `dist/` do GitHub — powstaje w buildzie. Zachowaj źródła, lockfile, konfiguracje, licencje oraz wygenerowaną kartę social i manifest.

## Ustawienia Workers Builds

Dla istniejącego Workera sprawdź integrację repozytorium i gałąź publikacji w ustawieniach Builds. Jeżeli integracji jeszcze nie ma, właściciel może świadomie połączyć wybrane repozytorium GitHub. Nazwy etykiet panelu mogą się zmieniać.

| Pole | Wartość |
| --- | --- |
| Worker / Project name | `sqoonays-barbershop` |
| Root directory | Katalog główny repozytorium |
| Production branch | Wybrana gałąź, np. `main`; nie zmieniaj bez ustalenia |
| Build command | `pnpm cf:check` |
| Deploy command | `pnpm exec wrangler deploy` |
| Node / pnpm | Z `.node-version` / `packageManager` |
| Build variable `SITE_URL` | Opcjonalne `https://sqoonays.pl`, już domyślne w kodzie |
| Build variable `SITE_NOINDEX` | Produkcja: brak lub `false`; kopia testowa: `true` |

Cloudflare instaluje zależności z lockfile przed buildem. Przy wyłączonej automatycznej instalacji użyj `pnpm install --frozen-lockfile && pnpm cf:check`. Narzędzia z devDependencies są potrzebne podczas budowania.

`SITE_URL` i `SITE_NOINDEX` są zmiennymi **budowania**, nie zmiennymi runtime w `vars` Workera. Ich zmiana wymaga nowego builda i wdrożenia. Samo podłączenie domeny nie zmienia HTML. Brak lub puste `SITE_URL` nie blokuje indeksowania. Publiczne kopie testowe muszą mieć jawne `SITE_NOINDEX=true`; noindex nie jest kontrolą dostępu.

Push do gałęzi połączonej z Workers Builds może od razu opublikować stronę. Nie wykonuj push ani deploya bez upoważnienia. Tokena Cloudflare nie zapisuj w repozytorium ani czacie.

## Domena sqoonays.pl w OVH

Zakup domeny i wybór adresu bez www zostały potwierdzone. Poniższe kroki dotyczą konfiguracji, której jeszcze nie wykonano lub która wymaga naprawy; nie ponawiaj zmian DNS, jeżeli domena jest już poprawnie podłączona.

1. Na właściwym koncie Cloudflare sprawdź strefę `sqoonays.pl`, jej status oraz przypisanie do Workera.
2. Jeśli strefa nie istnieje, dodaj ją i zweryfikuj import rekordów względem OVH. Zachowaj rekordy poczty i innych usług. Przy istniejącym DNSSEC zastosuj procedurę migracji dostawcy.
3. Tylko jeśli zmiana delegacji jest potrzebna: skopiuj dwa serwery nazw przydzielone **tej strefie** przez Cloudflare. W OVH zmień serwery w zakładce domeny „Serwery DNS”, nie przez dodanie rekordów NS w strefie. Nie używaj dawnych lub przykładowych nameserverów.
4. Gdy strefa jest aktywna, sprawdź Worker → Settings → Domains & Routes → Custom Domain: `sqoonays.pl`, bez protokołu i wildcardu. Cloudflare obsługuje rekord i TLS dla Custom Domain. Nie wpisuj wymyślonego IP Workera.
5. Upewnij się, że produkcyjny build nie ma `SITE_NOINDEX=true`. Po zatwierdzonym wdrożeniu sprawdź robots i canonical w publicznej odpowiedzi.
6. Sprawdź `www.sqoonays.pl`: jeśli ma być obsługiwane, skonfiguruj HTTPS i przekierowanie 301/308 do `https://sqoonays.pl`, zachowując ścieżkę i query. Sam canonical nie wykonuje przekierowania.

Nie ma potrzeby przenoszenia rejestracji domeny z OVH. Nie kasuj istniejącej strefy ani rekordów pocztowych w ramach zwykłej publikacji kodu.

## Kontrola lokalna i publikacja

```sh
pnpm install --frozen-lockfile
pnpm cf:check
pnpm cf:preview
```

Ostatnia komenda udostępnia lokalny podgląd na `http://127.0.0.1:8787`; zatrzymanie Ctrl+C. `cf:check` kończy się `wrangler deploy --dry-run` i **nie publikuje**.

Alternatywa dla Workers Builds, wyłącznie po upoważnieniu:

```sh
pnpm exec wrangler login
pnpm cf:deploy
```

`cf:deploy` ponawia kontrole i wykonuje rzeczywisty deploy. Sprawdź konto, nazwę Workera i zakres publikacji przed uruchomieniem. Nie uruchamiaj obu sposobów jednocześnie.

## Checklista po zatwierdzonym wdrożeniu

- [ ] Strona główna i zasoby odpowiadają 200 bez logowania; nieistniejący adres daje 404.
- [ ] `https://sqoonays.pl/robots.txt` ma `Allow: /` i wskazuje `https://sqoonays.pl/sitemap-index.xml`.
- [ ] HTML głównej strony ma `index, follow`, canonical `https://sqoonays.pl/` oraz absolutne URL karty social. 404 pozostaje noindex i poza sitemap.
- [ ] Sprawdzono HTTPS i docelowe zachowanie wariantu www.
- [ ] Na mobile/desktop działają menu, cennik, Booksy, dojazd i mapa po przewinięciu; fotografie mają właściwe kadry.
- [ ] Powtórz PageSpeed mobile i desktop oraz test karty linku. Zapisz URL raportu, datę i wdrożony commit w QA; nie opisuj wyniku starej wersji jako wyniku nowych zmian.
- [ ] Potwierdź dane firmy i przygotuj informację o prywatności zgodną z faktycznymi integracjami.

## Ręcznie: Google Search Console i Profil Firmy Google

Te kroki są oddzielne od wdrożenia i wymagają upoważnienia właściciela:

1. W Search Console dodaj usługę domenową `sqoonays.pl`. Weryfikacyjny rekord TXT skopiuj dokładnie z panelu i dodaj w aktywnej strefie DNS.
2. Po weryfikacji zgłoś `https://sqoonays.pl/sitemap-index.xml`.
3. W Inspekcji URL sprawdź stronę główną i jej dostępność dla Google. Ewentualne zgłoszenie ponownej indeksacji nie gwarantuje terminu pojawienia się w wynikach.
4. W Profilu Firmy Google ustaw stronę `https://sqoonays.pl/`, zachowaj Booksy jako rezerwację i zweryfikuj spójność nazwy/adresu. Telefon i godziny dodawaj wyłącznie po potwierdzeniu.
5. Obserwuj raporty indeksowania i Core Web Vitals; stan zapisuj w QA bez publikowania danych dostępowych.

## Źródła dostawców

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Workers Builds z GitHub](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
- [Komendy build i deploy](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Zmiana nameserverów](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
- [OVH — edycja serwerów DNS](https://docs.ovhcloud.com/pl/guides/web-cloud/domains/dns-server-edit)
