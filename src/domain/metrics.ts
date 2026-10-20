import { weekDates } from './dates'
import { isCompleted, isScheduledOn } from './schedule'
import type { Completion, DateKey, Habit, TimeSession } from './types'

export interface WeeklyProgress {
  completed: number
  scheduled: number
  /** 0 a 1; 0 quando nada estava programado. */
  ratio: number
}

/**
 * Concluídas ÷ programadas na semana (segunda a domingo) que contém `date`.
 * Dias não programados não entram no denominador nem no numerador.
 */
export function weeklyProgress(habits: Habit[], completions: Completion[], date: DateKey): WeeklyProgress {
  let scheduled = 0
  let completed = 0
  for (const day of weekDates(date)) {
    for (const habit of habits) {
      if (!isScheduledOn(habit, day)) continue
      scheduled++
      if (isCompleted(completions, habit.id, day)) completed++
    }
  }
  return { completed, scheduled, ratio: scheduled === 0 ? 0 : completed / scheduled }
}

export function weeklyMessage({ completed, scheduled, ratio }: WeeklyProgress): string {
  if (scheduled === 0) return 'Nenhuma atividade programada para esta semana.'
  const summary = `Nesta semana, você concluiu ${completed} de ${scheduled} atividades programadas.`
  if (ratio >= 1) return `${summary} Semana perfeita!`
  if (ratio >= 0.6) return `${summary} Você está evoluindo!`
  return `${summary} Dá para melhorar!`
}

/** Total de segundos registrados para um hábito (soma das sessões). */
export function totalTimeSec(sessions: TimeSession[], habitId: number): number {
  return sessions.filter((s) => s.habitId === habitId).reduce((sum, s) => sum + s.durationSec, 0)
}

/** Formata segundos como `Hh MMm`. */
export function formatDuration(totalSec: number): string {
  const minutes = Math.floor(totalSec / 60)
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`
}
