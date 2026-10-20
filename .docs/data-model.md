# Modelo de dados

> Status: **implementado** em `src/data/db.ts` (schema Dexie versão 1).

Fonte única de verdade: Hábitos, Cronômetro e Pomodoro leem as mesmas tabelas.

## Tabelas (IndexedDB / Dexie)

| Tabela | Campos | Índices |
|---|---|---|
| `habits` | `id`, `name`, `weekdays` (0 = domingo … 6 = sábado), `trackTime`, `archived`, `createdAt` (epoch ms) | `++id`, `archived` |
| `completions` | `id`, `habitId`, `date` (`YYYY-MM-DD`) | `++id`, único `[habitId+date]`, `date` |
| `timeSessions` | `id`, `habitId`, `start`, `end` (epoch ms), `durationSec` | `++id`, `habitId`, `start` |
| `pomodoroSkips` | `id`, `habitId`, `date` | `++id`, único `[habitId+date]`, `date` |
| `settings` | linha única `id: 'main'`, `focusMin`, `breakMin`, `longBreakMin`, `cycles` | `id` |

Padrões das configurações: foco 25 min, pausa 5 min, pausa longa 15 min, 4 ciclos.

## Derivações

- **Programado em uma data**: `habit.weekdays` inclui o dia da semana da data, o hábito não está arquivado e a data não é anterior ao dia de criação (`createdAt`).
- **Lista do Pomodoro de hoje**: hábitos programados hoje − `pomodoroSkips` de hoje.
- **Concluído**: existe `completions` para `(habitId, date)`.
- **Métrica semanal**: `concluídas na semana ÷ ocorrências programadas na semana` (semana de segunda a domingo, a semana inteira, inclusive dias futuros). Dias não programados não entram no denominador, e conclusões em dias não programados são ignoradas. Veja o [ADR 0005](decisions/0005-convencoes-semana-e-datas.md).
- **Total de tempo**: soma de `durationSec` de `timeSessions` do hábito.

## Observações

- Remover do Pomodoro grava em `pomodoroSkips`; **não** altera `habits`.
- O agendamento não é versionado (ver [ADR 0003](decisions/0003-agendamento-simples.md)).
- Arquivar um hábito o remove das métricas, inclusive as passadas (consequência do agendamento simples).
- Backup JSON: `{ app, version, exportedAt, data }`; importar **substitui** todos os dados atuais.
- Ao encerrar um foco do Pomodoro ligado a um hábito com `trackTime`, a sessão pode alimentar `timeSessions` (a definir).
