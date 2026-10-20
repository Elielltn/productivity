import { toDateKey, weekdayOf } from './dates'
import type { Completion, DateKey, Habit, PomodoroSkip } from './types'

/** O hábito está programado nesta data? (dia da semana, não arquivado, já criado) */
export function isScheduledOn(habit: Habit, date: DateKey): boolean {
  if (habit.archived) return false
  if (date < toDateKey(new Date(habit.createdAt))) return false
  return habit.weekdays.includes(weekdayOf(date))
}

export function habitsScheduledOn(habits: Habit[], date: DateKey): Habit[] {
  return habits.filter((h) => isScheduledOn(h, date))
}

export function isCompleted(completions: Completion[], habitId: number, date: DateKey): boolean {
  return completions.some((c) => c.habitId === habitId && c.date === date)
}

/** Lista do Pomodoro: hábitos programados na data, menos os removidos naquele dia. */
export function pomodoroListFor(habits: Habit[], skips: PomodoroSkip[], date: DateKey): Habit[] {
  const skipped = new Set(skips.filter((s) => s.date === date).map((s) => s.habitId))
  return habitsScheduledOn(habits, date).filter((h) => !skipped.has(h.id))
}
