import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Bounce 방지를 위한 이벤트 리스너
document.addEventListener('touchmove', function(e) {
  if (e.target.closest('.scrollable') === null) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchstart', function(e) {
  if (e.target.closest('.scrollable') === null) {
    e.preventDefault();
  }
}, { passive: false });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
