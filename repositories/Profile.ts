type Profile = {
  intro: boolean
  wordLength: number
}

export type ProfileChange = {
  intro?: boolean
  wordLength?: number
}

export default Profile

export function alreadyIntroduced(): boolean {
  const settings = getProfile()
  return settings.intro
}

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

function updateProfile(settings: Profile, change: ProfileChange): Profile {
  return {
    intro: change.intro != null ? change.intro : settings.intro,
    wordLength:
      change.wordLength != null ? change.wordLength : settings.wordLength
  }
}

function getProfile(): Profile {
  const data = localStorage.getItem(key())
  return data ? (JSON.parse(data) as Profile) : initialProfile()
}

function saveProfile(settings: Profile) {
  const data = JSON.stringify(settings)
  localStorage.setItem(key(), data)
}

function key(): string {
  return 'profile'
}

function initialProfile(): Profile {
  return {
    intro: false,
    wordLength: 4
  }
}
