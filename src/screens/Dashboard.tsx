import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import AppScreen from './AppScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { OnboardingData } from '../types/User'

export default () => {
  const [userData, setUserData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the stored JSON string from AsyncStorage
        const jsonData = await AsyncStorage.getItem('userData')

        if (jsonData !== null) {
          // Parse the JSON string back into a JavaScript object
          const data = JSON.parse(jsonData) as OnboardingData

          // Set the retrieved data in the state
          setUserData(data)
        } else {
          console.log('No data found in AsyncStorage.')
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error)
      }
    }

    // Call the fetchUserData function when the component mounts
    fetchUserData()
  }, []) // The empty dependency array ensures this effect runs only once

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
