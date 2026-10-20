import { describe, expect, it } from 'vitest'
import { isScheduledOn, pomodoroListFor } from './schedule'
import type { Habit, PomodoroSkip, Weekday } from './types'

const createdAt = new Date(2026, 0, 1).getTime()

const habit = (id: number, weekdays: Weekday[], extra: Partial<Habit> = {}): Habit => ({
  id,
  name: `h${id}`,
  weekdays,
  trackTime: false,
  archived: false,
  createdAt,
  ...extra,
})

// 2026-10-19 é segunda, 2026-10-20 é terça
describe('isScheduledOn', () => {
  const corrida = habit(1, [1, 3, 5])

  it('respeita os dias da semana', () => {
    expect(isScheduledOn(corrida, '2026-10-19')).toBe(true)
    expect(isScheduledOn(corrida, '2026-10-20')).toBe(false)
  })

  it('ignora hábitos arquivados', () => {
    expect(isScheduledOn(habit(2, [1], { archived: true }), '2026-10-19')).toBe(false)
  })

  it('não programa datas anteriores à criação', () => {
    const novo = habit(3, [1], { createdAt: new Date(2026, 9, 20).getTime() })
    expect(isScheduledOn(novo, '2026-10-19')).toBe(false)
    expect(isScheduledOn(novo, '2026-10-26')).toBe(true)
  })
})

describe('pomodoroListFor', () => {
  const habits = [habit(1, [1, 3, 5]), habit(2, [0, 1, 2, 3, 4, 5, 6])]

  it('não lista hábitos fora do dia (corrida na terça)', () => {
    expect(pomodoroListFor(habits, [], '2026-10-20').map((h) => h.id)).toEqual([2])
  })

  it('remove só no dia do skip, sem afetar outros dias', () => {
    const skips: PomodoroSkip[] = [{ id: 1, habitId: 2, date: '2026-10-20' }]
    expect(pomodoroListFor(habits, skips, '2026-10-20')).toEqual([])
    expect(pomodoroListFor(habits, skips, '2026-10-21').map((h) => h.id)).toEqual([1, 2])
  })
})
