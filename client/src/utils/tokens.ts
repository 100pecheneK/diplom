const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'

export function resetTokensInLocalStorage() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  if (!refreshToken) throw new Error('No refreshToken')
  return JSON.parse(refreshToken)
}

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  if (!accessToken) throw new Error('No accessToken')
  return JSON.parse(accessToken)
}
export function setRefreshToken(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken))
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken))
}
