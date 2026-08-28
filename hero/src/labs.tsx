import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LabsPage from './pages/LabsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LabsPage />
  </StrictMode>,
)
