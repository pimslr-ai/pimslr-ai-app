import { StackNavigationProp } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation as useNavigation_ } from '@react-navigation/native'
import { useRoute as useRoute_ } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'

type RootStackParamList = {
  onboarding: undefined
  dashboard: undefined
  settings: undefined
  'course:home': {
    course: Course
  }
  'course:refine_scenario': {
    course: Course
  }
}

export type Screen = keyof RootStackParamList

export const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const useNavigation = () => {
  return useNavigation_<StackNavigationProp<RootStackParamList>>()
}

export function useRoute<T extends Screen>() {
  return useRoute_<RouteProp<RootStackParamList, T>>()
}

export function useParams(screen: Screen) {
  return useRoute_<RouteProp<RootStackParamList, typeof screen>>().params!
}
