import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import AppScreen from './AppScreen'
import { OnboardingData } from '../types/User'
import useAppStorage from '../hooks/use-app-storage'
import { DATA } from '../constants'

export default () => {
  const { get } = useAppStorage()
  const [userData, setUserData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    get<OnboardingData>(DATA.USER_LANGUAGE_PREF).then(setUserData)
  }, [])

  return (
    <AppScreen>
      <Text>Dashboard</Text>

      {userData && (
        <Text>
          User Data:
          {'\n'}
          Language: {userData.language}
          {'\n'}
          Proficiency: {userData.profeciency}
          {'\n'}
          Context: {userData.context}
        </Text>
      )}
    </AppScreen>
  )
}
