import { registerRootComponent } from 'expo'
import App from './App'
import StorageProvider from './contexts/StorageProvider'

registerRootComponent(() => (
  <StorageProvider>
    <App />
  </StorageProvider>
))
