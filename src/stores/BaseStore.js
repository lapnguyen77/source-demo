import { action, observable, makeObservable } from 'mobx'

export default class BaseStore {
  isLoading = false

  constructor(args) {
    this.rootStore = args?.rootStore
    this.rootAPI = args?.rootAPI
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action.bound,
    })
  }

  setIsLoading(value) {
    this.isLoading = value
  }

  notify = (type, options) => {
    const { notificationStore } = this.rootStore
    notificationStore.notify(type, options)
  }

  navigateTo = route => {
    const { routingStore } = this.rootStore
    routingStore.push(route)
  }

  notifyInfo = options => this.notify('info', { titleTransKey: 'notification.infoTitle', ...options })
  notifySuccess = options => this.notify('success', { titleTransKey: 'notification.successTitle', ...options })
  notifyWarning = options => this.notify('warning', { titleTransKey: 'notification.warningTitle', ...options })
  notifyConfirm = options => this.notify('confirm', { titleTransKey: 'notification.confirmTitle', ...options })

  notifyError = (err, options) => {
    // const { authStore } = this.rootStore

    // if (err && err.status === 401) {
    //   authStore.logout()
    //   return
    // }

    let description = ''
    if (err && err.description) {
      description = err.description
    } else {
      description = `Unknown error. Details: ${err} ${err.status}`
    }

    this.notify('error', { titleTransKey: 'notification.errorTitle', description, ...options })
  }
}
