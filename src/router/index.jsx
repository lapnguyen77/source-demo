import React from 'react'
import { observer } from 'mobx-react'
import { Router } from 'react-router'
import Routes from './Routes'
import { history } from '../stores'

const router = () => (
  <Router history={history}>
    <Routes />
  </Router>
)

export default observer(router)
