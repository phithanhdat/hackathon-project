import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './app/store'

import App from './App'

import '~antd/dist/antd.less'
import '~/src/assets/styles/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)