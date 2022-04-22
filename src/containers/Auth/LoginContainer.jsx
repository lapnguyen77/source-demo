import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import RootStoreContext from '../../contexts/RootStoreContext'

import Loading from '../../components/Shared/Loading'

const LoginForm = loadable(() => import('../../components/Auth/Login/LoginForm'), {
  fallback: <Loading />,
})

class LoginContainer extends Component {
  static contextType = RootStoreContext;

  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }

  submitLogin = async (values, redirectPath) => {
    const { routingStore } = this.context
    routingStore.push("/dashboard")
  }

  render() {
    const { authStore } = this.context

    const { isAuthenticated, loginLoading } = authStore

    const { location } = this.props

    const redirectPath = new URLSearchParams(location.search).get('redirectPath')

    if (isAuthenticated) {
      return (<Redirect to="/dashboard" />)
    }

    return (
      <LoginForm
        login={this.submitLogin}
        loginLoading={loginLoading}
        redirectPath={redirectPath}
      />
    )
  }
}

export default observer(LoginContainer)
