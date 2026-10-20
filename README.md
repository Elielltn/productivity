# Productivity

Aplicativo pessoal de produtividade que reúne **hábitos**, **controle de tempo** e **Pomodoro** em um só lugar, com funcionamento **100% offline**.

> **Status:** 🚧 Fase de planejamento. Ainda não há código de aplicação. Veja o [roadmap](.docs/roadmap.md).

## Funcionalidades planejadas

- **Habit Tracker** — hábitos com dias da semana próprios, marcação de conclusão por dia e métricas semanais que consideram apenas os dias programados.
- **Cronômetros por hábito** — sessões de iniciar/pausar/encerrar, com acúmulo de horas por hábito.
- **Pomodoro** — foco/pausa configuráveis e lista do dia derivada dos hábitos; itens podem ser removidos/readicionados no dia sem alterar o hábito.
- **Dados integrados** — uma única fonte de verdade; a conclusão marcada em uma tela aparece nas demais.
- **Offline-first** — dados locais, com exportação/importação em JSON como backup.

## Stack prevista

| Área | Escolha |
|---|---|
| Plataforma | PWA (instalável no Windows; celular depois) |
| Build / UI | Vite + React + TypeScript |
| Armazenamento | IndexedDB via Dexie.js |
| Offline | Service Worker (vite-plugin-pwa) |
| Desktop (futuro) | Tauri, para notificações nativas |

Justificativas em [`.docs/decisions/`](.docs/decisions/).

## Documentação

Toda a documentação vive em [`.docs/`](.docs/README.md) e **deve ser atualizada a cada iteração** (veja as [convenções](.docs/conventions.md)).

- [Visão geral do produto](.docs/product.md)
- [Arquitetura](.docs/architecture.md)
- [Modelo de dados](.docs/data-model.md)
- [Roadmap](.docs/roadmap.md)
- [Decisões de arquitetura (ADRs)](.docs/decisions/)
- [Changelog](CHANGELOG.md)

## Como rodar

_Ainda não aplicável — será preenchido na etapa 1 do roadmap._

## Licença

A definir
