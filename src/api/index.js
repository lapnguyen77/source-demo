import Request from '../utils/request'

import AuthAPI from './AuthAPI'
import DemoFormUIAPI from './DemoFormUIAPI'

export default class RootAPI {
  authAPI;
  demoFormUIAPI

  constructor(args) {
    const { rootStore } = args
    const request = new Request({ rootStore })

    this.authAPI = new AuthAPI({ request, rootStore })
    this.demoFormUIAPI = new DemoFormUIAPI({ request, rootStore })
  }
}
