import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { observer, PropTypes as MobxPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'

import RootStoreContext from '../contexts/RootStoreContext'

class PrivateRoute extends Component {
  static contextType = RootStoreContext;

  static propTypes = {
    docTitle: PropTypes.string.isRequired,
    component: MobxPropTypes.objectOrObservableObject.isRequired,
    layout: MobxPropTypes.objectOrObservableObject.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    location: {
      pathname: '',
    },
  }

  render() {
    const { authStore } = this.context

    const { isAuthenticated } = authStore

    const {
      component: InnerComponent,
      docTitle,
      layout: Layout,
      location: { pathname },
      t: translator,
      ...rest
    } = this.props

    if (isAuthenticated) {
      return (
        <Route
          {...rest}
          render={props => (
            <>
              <Helmet>
                <title>{docTitle}</title>
              </Helmet>
              <Layout>
                <InnerComponent t={translator} {...props} />
              </Layout>
            </>
          )}
        />
      )
    }

    // Render layout tạm thời
    return (
      <Route
        {...rest}
        render={props => (
          <>
            <Helmet>
              <title>{docTitle}</title>
            </Helmet>
            <Layout>
              <InnerComponent t={translator} {...props} />
            </Layout>
          </>
        )}
      />
    )

    // Sau khi code đăng nhập sẽ mở
    // return (
    //   <Redirect
    //     exact
    //     to={{
    //       pathname: '/login',
    //       state: {
    //         from: {
    //           pathname,
    //         },
    //       },
    //     }}
    //   />
    // )
  }
}

export default withRouter(observer(withTranslation()(PrivateRoute)))
