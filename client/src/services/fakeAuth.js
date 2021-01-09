import config from '@/config'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  resetTokensInLocalStorage,
} from '@utils/tokens'

async function a(fn, args) {
  const res = await fn(args)
  if (res.ok) {
    return res
  } else {
    const refreshed = await fakeAuth.refreshAccessToken()
    if (refreshed.ok) {
      const rr = await refreshed.json()
      setAccessToken(rr.accessToken)

      const newRes = await fn(args)
      if (newRes.ok) {
        return newRes
      } else {
        console.log(newRes)
        return newRes
      }
    } else {
      resetTokensInLocalStorage()
      throw new Error('Bad refresh token')
    }
  }
}

const fakeAuth = {
  async getUser() {
    return await a(async () => {
      const accessToken = getAccessToken()
      const res = await fetch(config.API_URL + '/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return res
    })
  },
  async refreshAccessToken() {
    const refreshToken = getRefreshToken()
    const r = await fetch('http://localhost:4000/api/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    })
    return r
  },
  async signin(data) {
    const res = await fetch(config.API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const r = await res.json()
    if (res.ok) {
      return { ok: r }
    } else {
      return { error: r.message }
    }
  },
  async register(data) {
    const res = await fetch(config.API_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const r = await res.json()
    if (res.ok) {
      return { ok: r }
    } else {
      return { error: r.message }
    }
  },
  async signout(data) {
    await fetch(config.API_URL + 'auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  },
  async changePassword(data) {
    return await a(async data => {
      const accessToken = getAccessToken()
      const r = await fetch(config.API_URL + '/auth/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
      const res = await r.json()
      if (r.ok) {
        return { ok: res }
      } else {
        return { error: res.message }
      }
    }, data)
  },
}
export default fakeAuth
