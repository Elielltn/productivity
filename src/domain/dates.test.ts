import { describe, expect, it } from 'vitest'
import { addDays, startOfWeek, toDateKey, weekDates, weekdayOf } from './dates'

describe('dates', () => {
  it('formata e interpreta datas locais', () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(weekdayOf('2026-10-20')).toBe(2) // terça
  })

  it('soma dias atravessando mês e ano', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
  })

  it('semana vai de segunda a domingo', () => {
    expect(startOfWeek('2026-10-20')).toBe('2026-10-19')
    expect(startOfWeek('2026-10-25')).toBe('2026-10-19') // domingo
    expect(startOfWeek('2026-10-19')).toBe('2026-10-19')
    expect(weekDates('2026-10-22')).toHaveLength(7)
    expect(weekDates('2026-10-22')[6]).toBe('2026-10-25')
  })
})
