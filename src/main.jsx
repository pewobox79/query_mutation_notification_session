import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BenachrichtigungProvider} from "./context/BenachrichtigungsContext.jsx";
import {AppQueryProvider} from "./providers/AppQueryProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BenachrichtigungProvider>
      <AppQueryProvider>
        <App />
      </AppQueryProvider>
    </BenachrichtigungProvider>
  </StrictMode>
)
