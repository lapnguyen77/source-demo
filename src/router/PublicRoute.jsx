import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import { Helmet } from 'react-helmet'

const PublicRoute = ({
  component: Component, docTitle, layout: Layout, path, ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props => (
      <>
        <Helmet>
          <title>{docTitle}</title>
        </Helmet>
        <Layout>
          <Component {...props} />
        </Layout>
      </>
    )}
  />
)

PublicRoute.propTypes = {
  component: MobxPropTypes.objectOrObservableObject.isRequired,
  docTitle: PropTypes.string.isRequired,
  layout: MobxPropTypes.objectOrObservableObject.isRequired,
  path: PropTypes.string.isRequired,
}

export default withRouter(PublicRoute)
