# Sqoonay's Barbershop - Etap I / MVP

Status: specyfikacja startowa, 2026-10-31. Weryfikacja danych biznesowych z właścicielem jest wymagana przed publikacją.

## 1. Cel biznesowy

Stworzyć szybki, atrakcyjny wizualnie i łatwy do indeksowania serwis dla lokalnego barbershopu w Gdyni. Strona ma być docelowym adresem WWW w Profilu Firmy w Google i kierować odwiedzających do istniejącego systemu rezerwacji Booksy. Priorytet: użytkownik mobilny i konwersja „Umów wizytę”.

## 2. Zweryfikowane źródła startowe

- Nazwa: **Sqoonay's Barbershop**.
- Lokalizacja podana w Booksy: **Mylna 1, 81-009 Gdynia, Polska**.
- Booksy: https://booksy.com/pl-pl/363234_sqoonay-s-barbershop_barber-shop_21029_gdynia
- Instagram salonu: https://www.instagram.com/sqoonaybarbershop/
- Instagram Dominiki: https://www.instagram.com/domi.nika_hair/
- Pracownicy wskazani na stronie Booksy: **Patryk - Barber** i **Dominika - Barber**. Aktualność trzeba potwierdzić.
- Booksy wskazuje, że rezerwacja następuje przez Booksy, a płatność na miejscu.

### Wybrane ceny z Booksy, odczyt: 2026-10-31

| Usługa | Cena | Czas |
|---|---:|---:|
| Strzyżenie męskie | 70 zł | 50 min |
| Combo (włosy + broda) | 110 zł | 80 min |
| Strzyżenie brody | 50 zł | 30 min |
| Strzyżenie długich włosów | 90 zł | 60 min |
| Golenie głowy na zero (golarką) | 40 zł | 25 min |
| Combo długie włosy + broda | 130 zł | 90 min |

Ceny mogą się zmieniać. Trzy pierwsze pokazać wyraźnie; inne mogą być widoczne w rozwiniętej liście. Przed publikacją właściciel potwierdza stawki. Cennik musi mieć jedno miejsce edycji w kodzie.

## 3. Elementy do potwierdzenia

- Oficjalne logo i branding (logo z prawem do wykorzystania, kolory, krój pisma).
- Zdjęcia: wnętrze, barberzy, realizacje; prawa do publikacji oraz zgoda osób na zdjęciach, jeśli wymagana.
- Telefon do salonu, godziny otwarcia w rozbiciu na dni, status działalności.
- Czy wszystkie wymienione usługi i pracownicy pozostają aktualni.
- Docelowa domena, kontaktowy e-mail (jeśli będzie publikowany).
- Pozycjonowanie marki i autentyczny opis salonu, najlepiej 2-4 zdania od właściciela.
- Czy istnieją osobne oficjalne odnośniki Booksy do konkretnych barberów.

Nie wymyślać tych informacji. Jeśli brak, ukryć sekcję/pole lub pokazać dyskretny, jawnie tymczasowy placeholder bez udawania prawdziwej fotografii.

## 4. Zakres pierwszej wersji

Jednostronicowa polska witryna na `/`, opcjonalnie osobna `/polityka-prywatnosci` po uzgodnieniu tekstu i używanych narzędzi. Nawigacja z anchorami.

1. **Header**: logo lub tymczasowy wordmark; Usługi, O nas, Barberzy, Galeria, Kontakt; CTA do Booksy.
2. **Hero**: hasło oparte na faktach i lokalizacji, np. „Sqoonay's Barbershop. Strzyżenie z charakterem w Gdyni.”; przycisk „Umów wizytę”; link „Zobacz usługi”; duży, dobrze skomponowany obszar na autentyczne zdjęcie.
3. **O nas**: krótki, neutralny opis, bez fikcyjnych historii i nagród.
4. **Usługi / cennik**: 3 wyróżnione usługi plus opcjonalnie pełna lista, czas, cena, link Booksy.
5. **Zespół**: Patryk, Dominika; bez wymyślania specjalizacji/biografii. Zdjęcia tylko po dostarczeniu zasobów.
6. **Galeria**: przygotowana siatka z miejscami na rzeczywiste zdjęcia; nie używać losowych zdjęć innych salonów jako portfolio.
7. **Kontakt / dojazd**: adres, przycisk do Google Maps z wyszukiwaniem adresu, Booksy, Instagram. Godziny i telefon tylko po potwierdzeniu.
8. **Footer**: nazwa, adres, linki, © aktualny rok; dokumentacja prawna, jeśli potrzebna.

### CTA

- Primary CTA: `Umów wizytę` → dokładny URL Booksy.
- Na mobile: dyskretne, łatwo dostępne CTA, nieprzesłaniające treści.
- Linki zewnętrzne z właściwymi atrybutami bezpieczeństwa i czytelnymi etykietami.

## 5. Styl wizualny

Kierunek startowy: **modern premium barbershop** / męski, editorial, dopracowany, nieprzeładowany. Propozycja palety na potrzeby pierwszego prototypu: `#111111`, `#242424`, `#B99A69`, `#F1EEE8`; to nie jest zatwierdzona identyfikacja marki. Typografia z kontrastem między nagłówkami i treścią, dobre odstępy, ostre zdjęcia, ograniczone animacje. Responsywność od 320 px do szerokiego desktopu. Interfejs wyłącznie po polsku.

## 6. SEO i lokalna widoczność

- Title (wstępny): `Sqoonay's Barbershop | Barber Gdynia, Mylna 1`.
- Description (wstępny): `Strzyżenie męskie, pielęgnacja brody i usługi barberskie w Gdyni. Poznaj Sqoonay's Barbershop i zarezerwuj wizytę przez Booksy.`
- Semantyczne H1/H2, opisowe alt, responsywne obrazy, favicon, OG, Twitter Card, canonical, sitemap, robots.
- Uporządkowane dane JSON-LD dla `HairSalon` / `LocalBusiness` z nazwą, adresem, Booksy oraz social links. Telefon i godziny tylko po potwierdzeniu. Docelowy URL domeny po wybraniu adresu.
- `site` w Astro konfigurowalne za pomocą zmiennej środowiskowej lub jasnego placeholdera w konfiguracji. Nie zakładać, że domena jest kupiona.
- Google Search Console oraz podpięcie strony w Google Business Profile: osobny ręczny etap po zatwierdzeniu domeny, nie wykonywać bez zgody.
- Nie obiecywać konkretnych pozycji Google ani szybkiego zaindeksowania.

## 7. Architektura

- Astro SSG, TypeScript strict, Tailwind CSS 4, pnpm.
- Brak backendu. Brak CMS. Brak bazy, kont użytkowników, SSR, ISR, własnych rezerwacji, formularza kontaktowego i skryptów trackingowych w Etapie I.
- Dane biznesowe w `src/data/business.ts`, usługi w `src/data/services.ts`, zespół w `src/data/team.ts`.
- Komponenty Astro, np. `Header`, `Hero`, `About`, `Services`, `Team`, `Gallery`, `Contact`, `Footer`.
- Zoptymalizowane lokalne obrazy; brak przypadkowego hotlinkingu do Instagrama lub Booksy.
- Hosting docelowo Cloudflare Workers Static Assets. Nie wdrażać automatycznie bez potwierdzenia konta i domeny. W projekcie może znaleźć się przykład konfiguracji Wrangler oraz instrukcja deploya.

## 8. Jakość i kryteria akceptacji

- `pnpm install` i `pnpm build` działają; dołożyć i uruchomić kontrolę TypeScript/Astro, jeśli to potrzebne.
- Wszystkie CTA, anchory i linki zewnętrzne działają.
- Mobile 320/375/390 px, tablet 768 px, desktop 1280/1440 px bez poziomego scrolla.
- Dostępna nawigacja klawiaturą; kontrast, poprawna hierarchia nagłówków, etykiety i focus states.
- Brak fikcyjnych treści, ocen, opinii, zdjęć i danych kontaktowych.
- SEO metadata obecne, walidowalny JSON-LD, jeden H1; poprawny canonical po podaniu domeny.
- Docelowo wynik Lighthouse mobile >= 90 w Performance oraz SEO, traktowany jako cel do zweryfikowania, a nie gwarancja.
- `README.md` dokumentuje uruchomienie, aktualizację danych, materiały do pozyskania oraz kroki Search Console / Profilu Firmy w Google.

## 9. Poza zakresem

- Panel administratora, CMS, e-commerce, newsletter, blog, logowanie.
- Własny kalendarz, synchronizacja Booksy API, płatności, newsletter.
- Automatyczna publikacja domeny lub modyfikowanie Profilu Firmy Google.
- Programmatic SEO / masowe strony dzielnic bez sensownej treści.

## 10. Źródła

- Booksy: https://booksy.com/pl-pl/363234_sqoonay-s-barbershop_barber-shop_21029_gdynia
- Instagram: https://www.instagram.com/sqoonaybarbershop/
- Instagram Dominiki: https://www.instagram.com/domi.nika_hair/
- Google LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Astro Cloudflare: https://docs.astro.build/en/guides/deploy/cloudflare/
