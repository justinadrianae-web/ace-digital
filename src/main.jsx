import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#132A1E',
            color: '#E8F5EE',
            border: '1px solid rgba(60,174,120,.25)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#3CAE78', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#f08080', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
