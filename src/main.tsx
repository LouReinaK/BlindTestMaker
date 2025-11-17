import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from '@/components/ui/provider'
import { HostProvider } from '@/hooks/useHost'

/**
 * HostProvider is exported from the hook file with a non-JSX-returning type.
 * Cast it to a React component type so TypeScript accepts it in JSX.
 */
const HostProviderComponent = HostProvider as unknown as React.ComponentType<{ children?: React.ReactNode }>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <HostProviderComponent>
        <App />
      </HostProviderComponent>
    </Provider>
  </React.StrictMode>,
)
