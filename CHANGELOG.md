# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não lançado]

### Adicionado
- Documentação inicial: README, `.docs/` (produto, arquitetura, modelo de dados, roadmap, convenções) e ADRs 0001–0004.
- Etapa 1: projeto Vite + React + TypeScript com PWA (vite-plugin-pwa) e Vitest.
- Regras de domínio puras: datas, agendamento, lista do Pomodoro, métricas semanais e totais de tempo.
- Camada de dados com Dexie (IndexedDB), repositórios, persistência solicitada ao navegador e backup JSON (exportar/importar).
- 22 testes unitários e de integração (com `fake-indexeddb`).
- ADR 0005: convenções de semana e de datas.
