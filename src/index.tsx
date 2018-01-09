import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '@components/App/App'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import './mock/mock'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root') as HTMLElement
)
registerServiceWorker();
