# 0005 — Convenções de semana e de datas

**Status:** Aceito

## Contexto
Métricas semanais e conclusões por data exigem definições claras de semana e de formato de data, para evitar erros de fuso e ambiguidades.

## Decisão
- Datas de conclusão e skips como `YYYY-MM-DD` no **fuso local** (`DateKey`).
- Dias da semana como em `Date#getDay()`: 0 = domingo … 6 = sábado.
- Semana vai de **segunda a domingo**.
- A métrica semanal considera a semana inteira (inclusive dias futuros) no denominador, como em "3 de 7".
- Dias anteriores ao `createdAt` do hábito não contam como programados.

## Consequências
- Sem problemas de UTC na virada do dia.
- Alterar o início da semana (ex.: domingo) exige mudar apenas `startOfWeek` em `src/domain/dates.ts`.
- Hábitos novos não são penalizados por dias anteriores à criação.
