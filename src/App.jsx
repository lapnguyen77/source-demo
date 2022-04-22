import React, { Component } from 'react'
import { observer } from 'mobx-react'
// import { Helmet } from 'react-helmet'
import { ConfigProvider } from 'antd'

import viVNIntl from './utils/viVNIntl'
import Loading from './components/Shared/Loading'
import RootStoreContext from './contexts/RootStoreContext'
import rootStore from './stores'
import Router from './router'
import NotificationContainer from './containers/Notification/NotificationContainer'
import './App.less'

class App extends Component {
  static propTypes = {
  }

  render() {
    // ADD ckFinder
    // const { configStore } = rootStore
    // const { ckFinderEndpoint } = configStore

    return (
      <ConfigProvider locale={viVNIntl}>
        <RootStoreContext.Provider value={rootStore}>
          {/* <Helmet>
            <script src={`${ckFinderEndpoint}/CKFinderScripts/ckfinder.js`} type="text/javascript" />
          </Helmet> */}
          {rootStore.authStore.isSynchronized ? <Router /> : <Loading />}
          <NotificationContainer />
        </RootStoreContext.Provider>
      </ConfigProvider>
    )
  }
}

export default observer(App);
