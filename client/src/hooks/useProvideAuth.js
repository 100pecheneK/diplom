import { useState, useEffect } from 'react'

import fakeAuth from '@services/fakeAuth'
import {
  resetTokensInLocalStorage,
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
} from '@utils/tokens'

export default function useProvideAuth() {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const res = await fakeAuth.getUser()
        setUser(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    checkAuth()
  }, [login])

  const signin = async data => {
    const r = await fakeAuth.signin(data)
    if (r.ok) {
      setAccessToken(r.ok.accessToken)
      setRefreshToken(r.ok.refreshToken)
      setLogin(true)
    }
    return r
  }
  const register = async data => {
    const r = await fakeAuth.register(data)
    if (r.ok) {
      await signin(data)
      setLogin(true)
    }
    return r
  }
  const signout = async () => {
    setLoading(true)
    const refreshToken = getRefreshToken()
    resetTokensInLocalStorage()
    await fakeAuth.signout({ token: refreshToken })
    setUser(null)
    setLoading(false)
  }
  const changePassword = async data => {
    const res = await fakeAuth.changePassword(data)
    return res
  }
  return {
    signin,
    signout,
    user,
    loading,
    changePassword,
    register,
  }
}
