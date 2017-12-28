import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@components/App/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import './mock/mock'

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)
registerServiceWorker();
