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
  const profile = getProfile()
  return profile.intro
}

export function initialWordLength(): number {
  const profile = getProfile()
  return profile.wordLength
}

export function saveProfileChange(change: ProfileChange): Profile {
  const profile = getProfile()
  const updatedProfile = updateProfile(profile, change)
  saveProfile(updatedProfile)
  return updatedProfile
}

function updateProfile(profile: Profile, change: ProfileChange): Profile {
  return {
    intro: change.intro != null ? change.intro : profile.intro,
    wordLength:
      change.wordLength != null ? change.wordLength : profile.wordLength
  }
}

function getProfile(): Profile {
  const data = localStorage.getItem(key())
  return data ? (JSON.parse(data) as Profile) : initialProfile()
}

function saveProfile(profile: Profile) {
  const data = JSON.stringify(profile)
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
