import type { Weekday } from './types'

export const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const

export type HabitValidationError = 'name-empty' | 'name-too-long' | 'no-weekdays'

export const MAX_HABIT_NAME_LENGTH = 60

/** Valida os dados de um hábito. Retorna a lista de erros (vazia = válido). */
export function validateHabit(input: { name: string; weekdays: Weekday[] }): HabitValidationError[] {
  const errors: HabitValidationError[] = []
  const name = input.name.trim()
  if (name.length === 0) errors.push('name-empty')
  if (name.length > MAX_HABIT_NAME_LENGTH) errors.push('name-too-long')
  if (input.weekdays.length === 0) errors.push('no-weekdays')
  return errors
}

export const HABIT_ERROR_MESSAGES: Record<HabitValidationError, string> = {
  'name-empty': 'Informe um nome para o hábito.',
  'name-too-long': `O nome pode ter no máximo ${MAX_HABIT_NAME_LENGTH} caracteres.`,
  'no-weekdays': 'Escolha ao menos um dia da semana.',
}
