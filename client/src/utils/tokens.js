const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'

export function resetTokensInLocalStorage() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export function getRefreshToken() {
  return JSON.parse(localStorage.getItem(REFRESH_TOKEN))
}

export function getAccessToken() {
  return JSON.parse(localStorage.getItem(ACCESS_TOKEN))
}
export function setRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken))
}

export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken))
}
