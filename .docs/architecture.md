# Arquitetura

> Status: **planejada** (nenhum código ainda).

## Visão geral

PWA offline-first, sem backend. Todo o estado fica no navegador (IndexedDB).

```
UI (React)  →  Hooks/serviços  →  Domínio (funções puras)  →  Repositórios (Dexie/IndexedDB)
```

## Camadas

| Camada | Responsabilidade |
|---|---|
| UI | Telas: Hábitos, Pomodoro, Métricas/Histórico, Configurações |
| Serviços/hooks | Orquestram casos de uso (marcar conclusão, iniciar sessão…) |
| Domínio | Regras puras e testáveis: agendamento, lista diária, métricas semanais, somatório de tempo |
| Dados | Dexie sobre IndexedDB; exportação/importação JSON |

A lógica de domínio **não depende** de React nem do banco, para ser testada com testes unitários.

## Stack

- Vite + React + TypeScript
- Dexie.js (IndexedDB) + `navigator.storage.persist()`
- vite-plugin-pwa (Service Worker, cache dos assets)
- Vitest para testes
- Futuro: Tauri para empacotar como app desktop

## Pontos técnicos relevantes

- **Cronômetros por timestamp**: guardar o início e calcular a diferença, em vez de contar com `setInterval`. Isso mantém a precisão com a aba em segundo plano ou após fechar o app.
- **Alertas em segundo plano**: Notification API + som; limitações de abas inativas no navegador motivam o Tauri no futuro.
- **Backup**: exportar/importar JSON, pois dados do navegador podem ser apagados.
- **Datas**: usar `"YYYY-MM-DD"` no fuso local para conclusões, evitando erros de UTC.

Veja as decisões em [decisions/](decisions/).
