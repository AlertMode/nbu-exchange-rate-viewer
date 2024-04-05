import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Context from './context.js/context'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Context>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context>
    </React.StrictMode>
)