import { registerRootComponent } from 'expo'
import App from './App'
import { CourseProvider } from './contexts/CourseProvider'

registerRootComponent(() => (
  <CourseProvider>
    <App />
  </CourseProvider>
))
