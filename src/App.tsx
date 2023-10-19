import { DATA } from './constants'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation as useNavigation_ } from '@react-navigation/native'
import { useRoute as useRoute_ } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import useStorage from './hooks/useStorage'
import useFonts from './hooks/useFonts'

import Dashboard from './screens/Dashboard'
import Onboarding from './screens/Onboarding'
import Settings from './screens/Settings'
import RefineScenario from './screens/RefineScenario'
import Course from './screens/Course'

type RootStackParamList = {
  onboarding: undefined
  dashboard: undefined
  settings: undefined
  'course:home':
    | Partial<{
        course: Course
      }>
    | undefined
  'course:refine_scenario':
    | Partial<{
        course: Course
      }>
    | undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export default () => {
  const { loaded } = useFonts()
  const { get } = useStorage()
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | undefined>()

  useEffect(() => {
    get<boolean>(DATA.SETUP_COMPLETE).then(complete => {
      setInitialRoute(complete ? 'dashboard' : 'onboarding')
    })
  }, [])

  return (
    loaded && (
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
          <Screen name='onboarding' component={Onboarding} />
          <Screen name='dashboard' component={Dashboard} />
          <Screen name='settings' component={Settings} />
          <Screen name='course:home' component={Course} />
          <Screen name='course:refine_scenario' component={RefineScenario} />
        </Navigator>
      </NavigationContainer>
    )
  )
}

export const useNavigation = () => {
  return useNavigation_<StackNavigationProp<RootStackParamList>>()
}

export function useRoute<T extends keyof RootStackParamList>() {
  return useRoute_<RouteProp<RootStackParamList, T>>()
}

export function useParams<T extends keyof RootStackParamList>() {
  return useRoute_<RouteProp<RootStackParamList, T>>().params
}
