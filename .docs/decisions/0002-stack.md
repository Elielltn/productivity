# 0002 — Stack: Vite + React + TypeScript + Dexie

**Status:** Aceito

## Contexto
O app tem estado compartilhado entre várias telas (hábitos, conclusões, sessões, Pomodoro) e precisa de armazenamento estruturado e consultável por data.

## Decisão
- Vite + React + TypeScript para a UI.
- Dexie.js sobre IndexedDB para persistência.
- vite-plugin-pwa para Service Worker.
- Vitest para testes da lógica de domínio.

## Consequências
- Tipagem forte nas regras de negócio e bom ecossistema.
- IndexedDB é mais robusto que `localStorage` e suporta consultas/índices.
- Alternativas consideradas: Svelte e JS puro (React foi preferido pelo usuário).
