import { action, observable, makeObservable } from 'mobx'

export default class NotificationStore {
  notifyData = {}
  constructor(args) {
    this.rootStore = args.rootStore
    this.rootAPI = args.rootAPI

    makeObservable(this, {
      notifyData: observable,
      notify: action.bound,
    })
  }

  notify = (type, options) => {
    this.notifyData = {
      type,
      ...options,
    }
  }
}
