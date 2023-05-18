type Settings = {
  wordLength: number
}

export type SettingsChange = {
  wordLength?: number
}

export default Settings

export function initialWordLength(): number {
  const settings = getSettings()
  return settings.wordLength
}

export function saveSettingsChange(change: SettingsChange): Settings {
  const settings = getSettings()
  const updatedSettings = updateSettings(settings, change)
  saveSettings(updatedSettings)
  return updatedSettings
}

export function updateSettings(
  settings: Settings,
  change: SettingsChange
): Settings {
  return {
    wordLength: change.wordLength ? change.wordLength : settings.wordLength
  }
}

export function getSettings(): Settings {
  const data = localStorage.getItem(key())
  return data ? (JSON.parse(data) as Settings) : initialSettings()
}

export function saveSettings(settings: Settings) {
  const data = JSON.stringify(settings)
  localStorage.setItem(key(), data)
}

function key(): string {
  return 'settings'
}

function initialSettings(): Settings {
  return {
    wordLength: 4
  }
}
