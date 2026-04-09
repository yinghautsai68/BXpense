import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { UtilProvider } from './context/UtilContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UtilProvider>
          <App />
        </UtilProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
