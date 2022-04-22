import React from 'react'
import loadable from '@loadable/component'
import { withRouter, Redirect, Route, Switch } from 'react-router-dom'

// Master pages
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

// Loading
import Loading from '../components/Shared/Loading'

//Add view
import dashboardRoutes from './route-sets/dashboard'
import demoFormUIRoutes from './route-sets/demoFormUI'

const BackgroundLayout = loadable(() => import('../layouts/BackgroundLayout'))

const BlankLayout = loadable(() => import('../layouts/BlankLayout'))

const AuthenticatedLayout = loadable(() => import('../layouts/AuthenticatedLayout'))

const Exception404 = loadable(() => import('../components/Exception/404'), {
  fallback: <Loading />,
})

const LoginContainer = loadable(() => import('../containers/Auth/LoginContainer'), {
  fallback: <Loading />,
})

const Routes = () => {
  const privateRoutes = [
    ...dashboardRoutes,
    ...demoFormUIRoutes,
  ]

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <PublicRoute
        exact
        path="/login"
        layout={BackgroundLayout}
        component={LoginContainer}
        docTitle="Login"
      />
      {privateRoutes.map(r => (
        <PrivateRoute
          exact
          path={r.path}
          layout={AuthenticatedLayout}
          component={r.component}
          docTitle={r.title}
        />
      ))}
      <PublicRoute
        layout={BlankLayout}
        path="*"
        component={Exception404}
        docTitle="404 - Not Found"
      />
    </Switch>
  )
}

export default withRouter(Routes)
