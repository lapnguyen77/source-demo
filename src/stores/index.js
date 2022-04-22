//
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router'

import RootAPI from '../api'

import NotificationStore from './NotificationStore'
import ConfigStore from './ConfigStore'
import NavStore from './NavStore'

import AuthStore from './AuthStore'

// Import store by function
import DemoFormUIStore from './DemoFormUIStore'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

export const history = syncHistoryWithStore(browserHistory, routingStore)

class RootStore {
  constructor() {
    //
    const rootAPI = new RootAPI({ rootStore: this })

    this.authStore = AuthStore
    this.authStore.initStore({ rootStore: this, rootAPI })

    this.routingStore = routingStore

    this.notificationStore = new NotificationStore({ rootStore: this, rootAPI })

    this.navStore = NavStore
    this.configStore = ConfigStore

    this.navStore.initStore({ rootStore: this, rootAPI })
    this.configStore.initStore({ rootStore: this, rootAPI })

    // Add store by function
    this.demoFormUIStore = new DemoFormUIStore({ rootStore: this, rootAPI })
  }
}

export default new RootStore()
