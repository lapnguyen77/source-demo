import { observable, action, makeObservable } from 'mobx'
import { persistence, StorageAdapter } from 'mobx-persist-store'
import { readStore, writeStore } from '../utils/localStorage'
import { SCREEN_ORIENTATIONS } from '../constants'

class NavStore {
  sidebarCollapsed = false
  drawerCollapsed = true
  orientation = SCREEN_ORIENTATIONS.LANDSCAPE

  constructor() {
    makeObservable(this, {
      sidebarCollapsed: observable,
      drawerCollapsed: observable,
      orientation: observable,
      setSidebarCollapsed: action.bound,
      setDrawerCollapsed: action.bound,
      setOrientation: action.bound,
    })
  }

  initStore(args) {
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI
  }

  setSidebarCollapsed(value) {
    this.sidebarCollapsed = value
  }

  setDrawerCollapsed(value) {
    this.drawerCollapsed = value
  }

  setOrientation() {
    if (window.screen?.orientation?.type === 'portrait-primary') {
      this.orientation = SCREEN_ORIENTATIONS.PORTRAIT

      this.setSidebarCollapsed(true)
    }

    if (window.screen?.orientation?.type === 'landscape-primary') {
      this.orientation = SCREEN_ORIENTATIONS.LANDSCAPE
    }
  }
}

export default persistence({
  name: 'NavStore',
  properties: ['sidebarCollapsed', 'drawerCollapsed', 'orientation'],
  adapter: new StorageAdapter({
    read: readStore,
    write: writeStore,
  }),
  reactionOptions: {

  },
})(new NavStore())
