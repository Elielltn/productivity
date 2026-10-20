# 0003 — Agendamento simples (sem versionamento)

**Status:** Aceito (revisável)

## Contexto
Alterar os dias da semana de um hábito pode mudar retroativamente as métricas passadas.

## Decisão
Os dias ficam em `habits.weekdays` sem histórico de vigência. Mudanças valem também para o passado.

## Consequências
- Modelo e métricas mais simples.
- Métricas de semanas antigas podem mudar após editar um hábito.
- Se isso incomodar, introduzir `scheduleHistory` com data de vigência (novo ADR).
