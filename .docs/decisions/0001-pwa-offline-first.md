# 0001 — PWA offline-first em vez de app nativo

**Status:** Aceito

## Contexto
Uso individual, principalmente no Windows, com desejo de usar no celular depois. Offline é obrigatório. Prioridade: simplicidade e manutenção fácil.

## Decisão
Aplicação web (PWA) offline-first com Service Worker e IndexedDB, instalável pelo navegador. Se necessário, empacotar depois com Tauri.

## Consequências
- Uma única base de código, multiplataforma.
- Limitações de timers/notificações em segundo plano no navegador, mitigadas por timestamps e, futuramente, Tauri.
- Dados dependem do armazenamento do navegador → backup JSON necessário.
- Alternativa descartada: app nativo Windows (WPF/WinUI), por ser restrito ao Windows e mais custoso de manter.
