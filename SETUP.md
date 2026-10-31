# Szybki start Codex + Cursor na Windows 11

1. Zainstaluj oficjalne rozszerzenie Codex w Cursor: https://developers.openai.com/codex/ide
2. Otwórz panel Codex i wybierz `Sign in with ChatGPT`.
3. W panelu Codex ustaw model `GPT-6.1 Sol` (jeśli dostępny), reasoning `High`, tryb `Local`, permission `Ask for approval`.
4. W `Codex Settings > Open config.toml` ustaw (na poziomie użytkownika, zwykle `%USERPROFILE%\.codex\config.toml`):

```toml
model = "gpt-6.1-sol"
model_reasoning_effort = "high"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

5. W PowerShell otwórz docelowy katalog projektu:

```powershell
mkdir sqoonays-barbershop
cd sqoonays-barbershop
git init
cursor .
```

6. Skopiuj `AGENTS.md` oraz `SPEC.md` do katalogu głównego `sqoonays-barbershop`. `FIRST_PROMPT.md` zawiera instrukcję do wklejenia w panelu Codex. Możesz też skopiować `FIRST_PROMPT.md` do repozytorium jako notatkę.
7. Uruchom nowy czat w panelu Codex (po umieszczeniu plików w repozytorium) i wklej treść `FIRST_PROMPT.md` bez nagłówka.
8. Pozwól na uzasadnioną instalację zależności i kontroluj zmiany Git. Nie włączaj `Full access` bez powodu.
9. Po implementacji sprawdź lokalnie `pnpm dev`, a następnie porównaj widok z wymaganiami w `SPEC.md`.

Jeśli polecenie `cursor .` nie jest dostępne, otwórz folder ręcznie przez `File > Open Folder`.

Przy instalacji projektu w WSL2 trzymaj pliki w systemie Linux i uruchamiaj narzędzia w WSL; nie mieszaj środowisk bez potrzeby.
