import axios from 'axios'
import qs from 'query-string'

export default class AuthAPI {
  constructor(args) {
    this.request = args.request
    this.rootStore = args.rootStore
  }

  isRefreshTokenLoading = false

  login = ({ username, password }) => {
    const { configStore } = this.rootStore

    const data = qs.stringify({
      client_id: configStore.clientId,
      client_secret: configStore.clientSecret,
      grant_type: configStore.grantTypePassword,
      username,
      password,
      scope: 'openid offline_access',
    })

    return this.request.post('/connect/token', data, {
      baseURL: configStore.authEndpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  refreshToken = (refreshToken) => {
    if (this.isRefreshTokenLoading) return true

    this.isRefreshTokenLoading = true
    const { configStore } = this.rootStore

    const data = qs.stringify({
      client_id: configStore.clientId,
      client_secret: configStore.clientSecret,
      grant_type: configStore.grantTypeRefreshToken,
      refresh_token: refreshToken,
    })

    return axios
      .post('/Connect/Token', data, {
        baseURL: configStore.authEndpoint,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .finally(() => {
        this.isRefreshTokenLoading = false
      })
  }
}
