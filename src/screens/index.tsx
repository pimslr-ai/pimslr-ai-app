import { StackNavigationProp } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation as useNavigation_ } from '@react-navigation/native'
import { useRoute as useRoute_ } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'

// type RootStackParamList = {
//   dashboard: undefined
//   'course:home': {
//     courseId: string
//   }
// }

type RootStackParamList = {
  dashboard: undefined
  'course:home': undefined
}

export type Screens = keyof RootStackParamList

export const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export const useNavigation = () => {
  return useNavigation_<StackNavigationProp<RootStackParamList>>()
}

export function useRoute<T extends Screens>() {
  return useRoute_<RouteProp<RootStackParamList, T>>()
}

export function useParams(screen: Screens) {
  return useRoute_<RouteProp<RootStackParamList, typeof screen>>().params!
}
