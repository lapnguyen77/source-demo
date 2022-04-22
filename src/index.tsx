import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { init } from './startup'

import './i18n'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function startApp() {
  init()

  ReactDOM.render(
    <Suspense fallback="Loading">
      <App />
    </Suspense>,
    document.getElementById('root'),
  )
}

startApp()