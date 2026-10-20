import { describe, expect, it } from 'vitest'
import { MAX_HABIT_NAME_LENGTH, validateHabit } from './habits'

describe('validateHabit', () => {
  it('aceita hábito válido', () => {
    expect(validateHabit({ name: 'Ler', weekdays: [1, 3] })).toEqual([])
  })

  it('rejeita nome vazio ou só com espaços', () => {
    expect(validateHabit({ name: '   ', weekdays: [1] })).toEqual(['name-empty'])
  })

  it('rejeita nome muito longo', () => {
    const name = 'a'.repeat(MAX_HABIT_NAME_LENGTH + 1)
    expect(validateHabit({ name, weekdays: [1] })).toEqual(['name-too-long'])
  })

  it('exige ao menos um dia da semana', () => {
    expect(validateHabit({ name: 'Ler', weekdays: [] })).toEqual(['no-weekdays'])
  })

  it('acumula vários erros', () => {
    expect(validateHabit({ name: '', weekdays: [] })).toEqual(['name-empty', 'no-weekdays'])
  })
})
