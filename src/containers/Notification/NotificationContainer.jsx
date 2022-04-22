import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import RootStoreContext from '../../contexts/RootStoreContext'
import Notification from '../../components/Notification/Notification'

class NotificationContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {
  }

  static defaultProps = {

  }

  render() {
    const { notificationStore } = this.context
    const { notifyData } = notificationStore
    return (
      <Notification
        notifyData={notifyData}
      />
    )
  }
}

export default observer(NotificationContainer)
