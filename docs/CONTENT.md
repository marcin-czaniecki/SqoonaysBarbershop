# Aktualizacja treści i materiałów

Aktualizacja: 01.11.2026. Zakres i status faktów są w [SPEC.md](../SPEC.md). Wartości wyświetlane na stronie edytuj w `src/data/*`; nie zmieniaj wygenerowanego `dist/`.

## Dane biznesowe

| Zmiana | Plik | Zasada |
| --- | --- | --- |
| Marka, dane firmy, kontakt, Booksy, Instagram, dojazd, mapa | `src/data/business.ts` | Weryfikuj dane rejestrowe i zachowaj zgodność adresu salonu z mapą |
| Informacja o prywatności i regulamin serwisu | `src/pages/polityka-prywatnosci.astro`, `src/pages/regulamin.astro` | Aktualizuj po zmianie dostawcy, obsługi rezerwacji lub zakresu przetwarzania |
| Ceny, czasy i nazwy usług | `src/data/services.ts` | Jedyny edytowalny cennik; nie powielaj tabeli w dokumentach |
| Zespół, role i profile | `src/data/team.ts` | Bez wymyślonych biografii, specjalizacji i profili |
| Zdjęcia, alt i podpisy galerii | `src/data/media.ts` | Opisy mają odpowiadać fotografiom i ich źródłom |
| Tekst „O nas” i nagłówki | `src/components/About.astro`, `Hero.astro` | Krótka, naturalna treść oparta na faktach |
| Tytuł i opis SEO | `src/data/business.ts` | Jedna lokalizacja, nazwa marki i rzeczywiste usługi |
| Teksty karty social | `src/data/social.ts` | Po edycji wygeneruj kartę; sprawdź, czy tekst mieści się w grafice |
| Linki do opinii Google i ich przyszły model | `src/data/reviews.ts` | Obecnie wariant bez API; nie wpisuj wymyślonych ocen lub cytatów |

Po potwierdzeniu cennika przez właściciela zmień wartości oraz datę w `serviceReview.sourceDate` i `sourceDateLabel`, a dopiero potem ustaw `confirmed: true`. Po potwierdzeniu zespołu zaktualizuj listę i ustaw `teamConfirmed = true`. Sama zgoda na zdjęcia nie potwierdza tych danych. Zaktualizuj także ich status w SPEC.

Telefon i e-mail są używane w kontakcie, stronach informacyjnych i JSON-LD. NIP firmy pochodzi z `taxId`. Jeśli zmieni się adres do korespondencji, zmień `correspondenceAddress` bez zmiany adresu salonu używanego przez mapę. Godziny dodaj po potwierdzeniu i zaktualizuj weryfikację w `scripts/verify-build.mjs`.

## Zdjęcia i ikony

1. Umieść oryginał z prawem do publikacji w odpowiednim podkatalogu `src/assets/`.
2. Zapisz źródło, datę, zgodę i zakres użycia w [SOURCES.md](../src/assets/SOURCES.md); portrety mają także [osobny wykaz](../src/assets/team/SOURCES.md).
3. Importuj zdjęcie w `src/data/media.ts`, przypisz `image` i rzeczowy `alt`. `null` świadomie przywraca placeholder CSS.
4. Uzupełnij podpis i ewentualny link źródłowy galerii. Obecne posty portfolio pochodzą z wcześniejszego miejsca pracy; nie opisuj ich jako realizacji sfotografowanych na Mylnej.
5. Sprawdź kadry hero, portretów i galerii na telefonie oraz desktopie. `PhotoFrame.astro` generuje AVIF 40 i WebP 65, srcset i wymiary; hero ma wysoki priorytet, pozostałe zdjęcia lazy loading. Nie hotlinkuj.

Obecne zasoby: wnętrze dostarczone przez właściciela, dwa portrety z Booksy i dwa zdjęcia portfolio z Instagrama. Zgody dotyczą tych materiałów; nowych nie pobieraj automatycznie na podstawie dawnych zgód.

Google Material Symbols Outlined są lokalne w `src/assets/icons/material-symbols/`. Zachowaj [źródła](../src/assets/icons/material-symbols/SOURCES.md) i [licencję Apache 2.0](../public/licenses/material-symbols-LICENSE.txt). Nie dodawaj zewnętrznego fontu ikon. Fonty tekstowe Manrope i Barlow Condensed są lokalne z pakietów Fontsource na licencjach OFL zawartych w pakietach; preload i fallbacki konfiguruje Astro.

## Karta social

```sh
pnpm generate:og
```

Karta 1200×630 używa zdjęcia wnętrza, lokalnych fontów i ikon. Kompozycja: `scripts/generate-og.mjs`. `pnpm build` generuje ją automatycznie; ręczna komenda jest przydatna przed `pnpm dev` po edycji tekstów.

Commituj razem źródła, `src/data/social-image.json` i wygenerowane pliki. Główny PNG w `public/social/` ma hash treści w nazwie. Zachowujemy `public/og.png` dla wcześniejszych linków oraz `public/og.svg` jako samodzielny podgląd. Nie usuwaj starszych opublikowanych kart bez sprawdzenia użycia ich URL; komunikatory mogą je pamiętać. Plików źródłowych zdjęć i generatora nie zastępuj samym eksportem PNG.

Po zatwierdzonym wdrożeniu sprawdź publiczny HTML oraz URL grafiki z manifestu. Przy starym podglądzie Facebook/Messenger użyj ręcznie [Sharing Debugger](https://developers.facebook.com/tools/debug/). Zachowanie cache i kadry zależą od aplikacji; nie dodajemy SDK ani trackerów.

## Opinie Google

Wybrany przez właściciela wariant jest darmowy i nie używa API ani widgetu. `Reviews.astro` jest autorską sekcją po galerii, przed kontaktem; mapa pozostaje niezależnie pod adresem. Linki w `src/data/reviews.ts` kierują dokładnie do formularza wystawienia opinii i wizytówki podanych przez właściciela. Google może wymagać zalogowania przy wystawianiu opinii. Nie ma nowego JS, skryptów Google, cookies ani dodatkowego iframe w tej sekcji.

`googleReviewsState` ma obecnie status `not-connected`. W tym stanie (również przy `unavailable`) strona pokazuje zaproszenie do Google zamiast pustych kart, zera opinii, przykładowych gwiazdek lub fikcyjnych cytatów. Nie pobiera ani nie kopiuje danych z Google Maps.

Późniejsza integracja powinna dostarczyć prop `data: GoogleReviewsState` do `Reviews.astro`, bez zmieniania układu całej strony. Wariant `ready` wymaga średniej i liczby opinii pochodzących ze źródła, czasu aktualizacji, opisu doboru i kolejności komentarzy oraz tablicy `GoogleReview`. Komponent obsługuje gwiazdki, tekst, autora i link do jego profilu, awatar jeśli go dostarczono, datę, link do oryginalnej opinii oraz oznaczenie tłumaczenia. Tekst jest renderowany jako tekst Astro, bez `set:html`. Nie oblicza średniej na podstawie kilku wybranych komentarzy ani nie dodaje ocen do JSON-LD.

Nie implementowano adaptera, harmonogramu aktualizacji ani dostępu do konta Google. Przed ich dodaniem należy wybrać źródło zgodne z warunkami Google, uzyskać dostęp właściciela, zweryfikować odpowiedzi i URL-e, wymagania przypisania autorów, cache i aktualność danych. Ewentualne sekrety pozostają po stronie serwera; nie używaj `PUBLIC_*` ani statycznego pliku danych do tokenów. Nie włączaj płatnego Places API ani scrapingu.

Oficjalne [Business Profile API jest bez opłat dla zarejestrowanych użytkowników](https://developers.google.com/my-business/content/pricing), ale [wymaga zatwierdzonego dostępu](https://developers.google.com/my-business/content/prereqs) i podlega [zasadom użycia oraz przechowywania treści](https://developers.google.com/my-business/content/policies). Sam link do wizytówki nie zapewnia dostępu. To możliwość do osobnego uzgodnienia, nie aktywna integracja. Przy przyszłym Places API trzeba uwzględnić także [wymagania prezentacji opinii i autorów](https://developers.google.com/maps/documentation/places/web-service/policies).

## Prywatność

Kod aplikacji nie ustawia cookies, nie zbiera formularzy i nie ma analityki. Mapa Google w `GoogleMap.astro` rozpoczyna pobieranie przy odległości do 200 px od widoku; bez JS korzysta z noscript i natywnego lazy loadingu. Nie wymaga kliknięcia. Ma stałą wysokość 280 px, tytuł i `referrerpolicy="no-referrer"`; link dojazdu jest niezależny od mapy.

Po uruchomieniu mapy Google otrzymuje dane połączenia, np. IP, i może używać własnych cookies. Link przy mapie prowadzi do jej opisu w polityce prywatności. Booksy i Instagram otwierają się po wybraniu odnośnika. Przed wdrożeniem potwierdź ustawienia logów, retencję i warunki powierzenia w Cloudflare oraz dane udostępniane salonowi w Booksy. Sprawdź, czy mapa odczytuje lub zapisuje opcjonalne dane na urządzeniu. Jeśli tak, uzgodnij wczytywanie po uprzedniej zgodzie.

## Brakujące materiały / decyzje właściciela

- Potwierdzenie usług, cen, czasów oraz składu zespołu.
- Docelowy adres do korespondencji i godziny otwarcia według dni.
- Docelowe logo, favicon i akceptacja kolorów / typografii.
- Autentyczny opis salonu i ewentualne opisy barberów.
- Kolejne zdjęcia aktualnego salonu i realizacji wraz ze źródłami i zgodami.
- Warunki rezerwacji, płatności i anulowania w Booksy oraz ustawienia prywatności Cloudflare.
- Status Search Console i Profilu Firmy Google.

## Po zmianie

Uruchom `pnpm cf:check`, sprawdź podgląd przez `pnpm dev` lub `pnpm cf:preview`, zaktualizuj [QA.md](../QA.md). Ręcznie sprawdź linki, kadry i czytelność. Publikacja i push uruchamiający auto-deploy są oddzielnym, upoważnionym krokiem.
