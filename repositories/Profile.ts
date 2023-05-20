type Profile = {
  wordLength: number
}

export type ProfileChange = {
  wordLength?: number
}

export default Profile

export function initialWordLength(): number {
  const settings = getProfile()
  return settings.wordLength
}

export function saveProfileChange(change: ProfileChange): Profile {
  const settings = getProfile()
  const updatedProfile = updateProfile(settings, change)
  saveProfile(updatedProfile)
  return updatedProfile
}

export function updateProfile(
  settings: Profile,
  change: ProfileChange
): Profile {
  return {
    wordLength: change.wordLength ? change.wordLength : settings.wordLength
  }
}

export function getProfile(): Profile {
  const data = localStorage.getItem(key())
  return data ? (JSON.parse(data) as Profile) : initialProfile()
}

export function saveProfile(settings: Profile) {
  const data = JSON.stringify(settings)
  localStorage.setItem(key(), data)
}

function key(): string {
  return 'profile'
}

function initialProfile(): Profile {
  return {
    wordLength: 4
  }
}
