import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'
import { setArrivalHash } from './lib/pages'

// Always open at the top. A #section in the address would make the browser jump before the
// page is ready, so remember it, drop it, and let the app glide there once it has loaded.
if (location.hash) {
  setArrivalHash(location.hash)
  history.replaceState(null, '', location.pathname + location.search)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
