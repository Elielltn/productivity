import type { ProductivityDB } from './db'

export const BACKUP_VERSION = 1

export interface Backup {
  app: 'productivity'
  version: number
  exportedAt: string
  data: {
    habits: unknown[]
    completions: unknown[]
    timeSessions: unknown[]
    pomodoroSkips: unknown[]
    settings: unknown[]
  }
}

export async function exportBackup(db: ProductivityDB): Promise<Backup> {
  const [habits, completions, timeSessions, pomodoroSkips, settings] = await Promise.all([
    db.habits.toArray(),
    db.completions.toArray(),
    db.timeSessions.toArray(),
    db.pomodoroSkips.toArray(),
    db.settings.toArray(),
  ])
  return {
    app: 'productivity',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: { habits, completions, timeSessions, pomodoroSkips, settings },
  }
}

/** Substitui todos os dados atuais pelos do backup. */
export async function importBackup(db: ProductivityDB, backup: Backup): Promise<void> {
  if (backup?.app !== 'productivity' || backup.version !== BACKUP_VERSION) {
    throw new Error('Arquivo de backup inválido ou de versão incompatível.')
  }
  const { data } = backup
  await db.transaction('rw', [db.habits, db.completions, db.timeSessions, db.pomodoroSkips, db.settings], async () => {
    await Promise.all([
      db.habits.clear(),
      db.completions.clear(),
      db.timeSessions.clear(),
      db.pomodoroSkips.clear(),
      db.settings.clear(),
    ])
    await db.habits.bulkAdd(data.habits as never[])
    await db.completions.bulkAdd(data.completions as never[])
    await db.timeSessions.bulkAdd(data.timeSessions as never[])
    await db.pomodoroSkips.bulkAdd(data.pomodoroSkips as never[])
    await db.settings.bulkAdd(data.settings as never[])
  })
}
