# Modelo de dados

> Status: **proposta inicial**. Atualizar conforme a implementação.

Fonte única de verdade: Hábitos, Cronômetro e Pomodoro leem as mesmas tabelas.

## Tabelas (IndexedDB / Dexie)

| Tabela | Campos | Índices |
|---|---|---|
| `habits` | `id`, `name`, `weekdays` (0–6), `trackTime`, `archived`, `createdAt` | `id` |
| `completions` | `id`, `habitId`, `date` (`YYYY-MM-DD`) | único `[habitId+date]` |
| `timeSessions` | `id`, `habitId`, `start`, `end`, `durationSec` | `habitId`, `start` |
| `pomodoroSkips` | `id`, `habitId`, `date` | único `[habitId+date]` |
| `settings` | `focusMin`, `breakMin`, `longBreakMin`, `cycles` | — |

## Derivações

- **Programado em uma data**: `habit.weekdays` inclui o dia da semana da data (e o hábito não está arquivado).
- **Lista do Pomodoro de hoje**: hábitos programados hoje − `pomodoroSkips` de hoje.
- **Concluído**: existe `completions` para `(habitId, date)`.
- **Métrica semanal**: `concluídas na semana ÷ ocorrências programadas na semana`. Dias não programados não entram no denominador.
- **Total de tempo**: soma de `durationSec` de `timeSessions` do hábito.

## Observações

- Remover do Pomodoro grava em `pomodoroSkips`; **não** altera `habits`.
- O agendamento não é versionado (ver [ADR 0003](decisions/0003-agendamento-simples.md)).
- Ao encerrar um foco do Pomodoro ligado a um hábito com `trackTime`, a sessão pode alimentar `timeSessions` (a definir).
