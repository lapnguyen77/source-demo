import { action, computed, observable, makeObservable, runInAction } from 'mobx'
import { persistence, isSynchronized, clearPersist, stopPersist, StorageAdapter } from 'mobx-persist-store'
import moment from 'moment'
import BaseStore from './BaseStore'

import { readStore, writeStore } from '../utils/localStorage'

class AuthStore extends BaseStore {
  auth = { accessToken: '' }
  loginLoading = false

  get isAuthenticated() {
    return !!this.auth.accessToken
  }

  constructor() {
    super()
    makeObservable(this, {
      auth: observable,
      loginLoading: observable,
      isAuthenticated: computed,
      isSynchronized: computed,
      login: action.bound,
      refreshToken: action.bound,
      logout: action.bound,
      checkTokenValid: action.bound,
    })
  }

  initStore(args) {
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
  }

  async login(data, redirectPath) {
    runInAction(() => {
      this.loginLoading = true
    })
    try {
      const res = await this.rootAPI.authAPI.login(data)

      runInAction(() => {
        this.auth = {
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
          expiresIn: res.expires_in,
          tokenType: res.token_type,
          timestamp: new Date(),
        }
      })

      if (redirectPath) {
        this.navigateTo(redirectPath)
      }

      return true
    } catch (err) {
      if (err.status === 400) {
        this.notifyError(err, {
          descriptionTransKey: 'login.message.invalid-credentials',
        })
      } else {
        this.notifyError(err)
      }
    } finally {
      runInAction(() => {
        this.loginLoading = false
      })
    }

    return false
  }

  async refreshToken() {
    let success = false

    try {
      const res = await this.rootAPI.authAPI.refreshToken(this.auth.refreshToken)

      if (res) {
        this.auth = {
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
          expiresIn: res.expires_in,
          tokenType: res.token_type,
          timestamp: new Date(),
        }

        success = true
      }
    } catch (err) {
      if (err) {
        if (err.status === 401 || err.status === 400) {
          this.logout()
        } else {
          this.notifyError(err)
        }
      }
    }

    return success
  }

  logout() {
    runInAction(() => {
      this.auth = {
        accessToken: '',
      }
    })

    this.clearStore()

    window.location.reload()
  }

  async checkTokenValid() {
    let valid = true
    const { timestamp, expiresIn } = this.auth
    if (timestamp && expiresIn) {
      const loginTime = moment(timestamp)
      const currentTime = moment()

      const duration = moment.duration(currentTime.diff(loginTime))
      const seconds = duration.asSeconds()

      if (seconds > expiresIn) {
        valid = await this.refreshToken()
      }
    }

    return valid
  }

  get isSynchronized() {
    return isSynchronized(this)
  }

  clearStore() {
    clearPersist(this)
    stopPersist(this)
  }
}

export default persistence({
  name: 'AuthStore',
  properties: ['auth'],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore,
  }),
  reactionOptions: {
    delay: 2000,
  },
})(new AuthStore())
