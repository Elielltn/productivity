import type { DateKey, Weekday } from './types'

const pad = (n: number) => String(n).padStart(2, '0')

/** Converte uma `Date` em `YYYY-MM-DD` usando o fuso local. */
export function toDateKey(date: Date): DateKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Converte `YYYY-MM-DD` em `Date` à meia-noite local. */
export function fromDateKey(key: DateKey): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function weekdayOf(key: DateKey): Weekday {
  return fromDateKey(key).getDay() as Weekday
}

export function addDays(key: DateKey, days: number): DateKey {
  const date = fromDateKey(key)
  date.setDate(date.getDate() + days)
  return toDateKey(date)
}

/** Segunda-feira da semana que contém a data (semanas vão de segunda a domingo). */
export function startOfWeek(key: DateKey): DateKey {
  const offset = (weekdayOf(key) + 6) % 7
  return addDays(key, -offset)
}

/** As 7 datas (segunda a domingo) da semana que contém a data. */
export function weekDates(key: DateKey): DateKey[] {
  const start = startOfWeek(key)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}
