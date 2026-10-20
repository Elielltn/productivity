import { describe, expect, it } from 'vitest'
import { formatDuration, totalTimeSec, weeklyMessage, weeklyProgress } from './metrics'
import type { Completion, Habit, TimeSession, Weekday } from './types'

const createdAt = new Date(2026, 0, 1).getTime()

const habit = (id: number, weekdays: Weekday[]): Habit => ({
  id,
  name: `h${id}`,
  weekdays,
  trackTime: true,
  archived: false,
  createdAt,
})

const done = (habitId: number, date: string): Completion => ({ id: Math.random(), habitId, date })

// Semana de 2026-10-19 (seg) a 2026-10-25 (dom)
describe('weeklyProgress', () => {
  const habits = [habit(1, [1, 3, 5]), habit(2, [0, 1, 2, 3, 4, 5, 6])]

  it('conta apenas ocorrências programadas no denominador', () => {
    const p = weeklyProgress(habits, [], '2026-10-22')
    expect(p.scheduled).toBe(3 + 7)
    expect(p.completed).toBe(0)
  })

  it('conta conclusões nos dias programados', () => {
    const completions = [done(1, '2026-10-19'), done(2, '2026-10-19'), done(2, '2026-10-20')]
    const p = weeklyProgress(habits, completions, '2026-10-22')
    expect(p.completed).toBe(3)
    expect(p.ratio).toBeCloseTo(0.3)
  })

  it('ignora conclusão feita em dia não programado', () => {
    const p = weeklyProgress([habit(1, [1])], [done(1, '2026-10-20')], '2026-10-22')
    expect(p).toEqual({ completed: 0, scheduled: 1, ratio: 0 })
  })

  it('ignora conclusões de outras semanas', () => {
    const p = weeklyProgress([habit(1, [1])], [done(1, '2026-10-12')], '2026-10-22')
    expect(p.completed).toBe(0)
  })

  it('semana sem nada programado tem ratio 0', () => {
    expect(weeklyProgress([], [], '2026-10-22')).toEqual({ completed: 0, scheduled: 0, ratio: 0 })
  })
})

describe('weeklyMessage', () => {
  it('varia conforme o desempenho', () => {
    expect(weeklyMessage({ completed: 3, scheduled: 7, ratio: 3 / 7 })).toContain('Dá para melhorar!')
    expect(weeklyMessage({ completed: 5, scheduled: 7, ratio: 5 / 7 })).toContain('Você está evoluindo!')
    expect(weeklyMessage({ completed: 7, scheduled: 7, ratio: 1 })).toContain('Semana perfeita!')
    expect(weeklyMessage({ completed: 0, scheduled: 0, ratio: 0 })).toContain('Nenhuma atividade')
  })
})

describe('tempo', () => {
  const session = (habitId: number, durationSec: number): TimeSession => ({
    id: Math.random(),
    habitId,
    start: 0,
    end: durationSec * 1000,
    durationSec,
  })

  it('soma sessões por hábito', () => {
    const sessions = [session(1, 1800), session(1, 900), session(2, 600)]
    expect(totalTimeSec(sessions, 1)).toBe(2700)
    expect(totalTimeSec(sessions, 3)).toBe(0)
  })

  it('formata duração', () => {
    expect(formatDuration(0)).toBe('0h 00m')
    expect(formatDuration(3600 + 5 * 60 + 59)).toBe('1h 05m')
  })
})
