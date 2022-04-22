import rootStore from '../stores'

const configAPI = () => {
  rootStore.configStore.init({
    apiEndpoint: window.env.REACT_APP_API_ENDPOINT,
    authEndpoint: window.env.REACT_APP_AUTH_ENDPOINT,
    // ckFinderEndpoint: window.env.REACT_APP_CK_FINDER_ENDPOINT,
    version: window.env.REACT_APP_API_VERSION,
    clientId: window.env.REACT_APP_CLIENT_ID,
    grantTypePassword: window.env.REACT_APP_GRANT_TYPE_PASSWORD,
    grantTypeRefreshToken: window.env.REACT_APP_REFRESH_TOKEN,
    appName: window.env.REACT_APP_NAME,
    supportEmail: window.env.REACT_APP_SUPPORT_EMAIL,
  })
}

export const init = () => {
  configAPI()
}
