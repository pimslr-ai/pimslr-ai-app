import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import AppScreen from './AppScreen'
import { OnboardingData } from '../types/User'
import useAppStorage from '../hooks/use-app-storage'
import { DATA } from '../constants'
import PageTitle from '../components/PageTitle'

export default () => {
  const { get } = useAppStorage()
  const [userData, setUserData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    get<OnboardingData>(DATA.USER_LANGUAGE_PREF).then(setUserData)
  }, [])

  return (
    <AppScreen>
      <View style={styles.container}>
        <PageTitle label='DittoAI'>
          <Text>ICON</Text>
        </PageTitle>

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
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})
