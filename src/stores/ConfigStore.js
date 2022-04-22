import { makeAutoObservable } from 'mobx'
import { persistence, StorageAdapter } from 'mobx-persist-store'

import { readStore, writeStore } from '../utils/localStorage'

class ConfigStore {
  apiEndpoint = ''
  authEndpoint = ''
  // ckFinderEndpoint = ''
  version = '1.0'
  clientId = 'fpt-ssc-ui'
  clientSecret = ''
  grantTypePassword = 'password'
  grantTypeRefreshToken = 'refresh_token'
  appName = ''
  supportEmail = ''

  constructor() {
    makeAutoObservable(this)
  }

  initStore(args) {
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
  }

  init({
    apiEndpoint,
    authEndpoint,
    // ckFinderEndpoint,
    version,
    clientId,
    grantTypePassword,
    grantTypeRefreshToken,
    appName,
    supportEmail,
  }) {
    this.apiEndpoint = apiEndpoint
    this.authEndpoint = authEndpoint
    // this.ckFinderEndpoint = ckFinderEndpoint
    this.version = version
    this.clientId = clientId
    this.grantTypePassword = grantTypePassword
    this.grantTypeRefreshToken = grantTypeRefreshToken
    this.appName = appName
    this.supportEmail = supportEmail
  }
}

export default persistence({
  name: 'ConfigStore',
  properties: [
    'apiEndpoint',
    'authEndpoint',
    // 'ckFinderEndpoint',
    'version',
    'clientId',
    'grantTypePassword',
    'grantTypeRefreshToken',
    'appName',
    'supportEmail',
  ],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore,
  }),
  reactionOptions: {

  },
})(new ConfigStore())
