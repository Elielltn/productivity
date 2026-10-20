/** Data no formato `YYYY-MM-DD`, no fuso local. */
export type DateKey = string

/** Dia da semana como em `Date#getDay()`: 0 = domingo … 6 = sábado. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Habit {
  id: number
  name: string
  weekdays: Weekday[]
  trackTime: boolean
  archived: boolean
  /** Epoch em ms. Dias anteriores à criação nunca contam como programados. */
  createdAt: number
}

export interface Completion {
  id: number
  habitId: number
  date: DateKey
}

export interface TimeSession {
  id: number
  habitId: number
  /** Epoch em ms. */
  start: number
  /** Epoch em ms. */
  end: number
  /** Tempo efetivo (descontadas as pausas), em segundos. */
  durationSec: number
}

export interface PomodoroSkip {
  id: number
  habitId: number
  date: DateKey
}

export interface Settings {
  focusMin: number
  breakMin: number
  longBreakMin: number
  cycles: number
}

export const DEFAULT_SETTINGS: Settings = {
  focusMin: 25,
  breakMin: 5,
  longBreakMin: 15,
  cycles: 4,
}
