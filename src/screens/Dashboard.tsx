import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { DATA, SCREENS } from '../constants'
import PageTitle from '../components/PageTitle'
import useAppStorage from '../hooks/use-app-storage'
import { UserData } from '../types/User'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'

export default () => {
  const { get } = useAppStorage()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    get<UserData>(DATA.USER_DATA).then(setUserData)
  }, [])

  return (
    <ScreenView>
      <View style={styles.container}>
        <PageTitle label='DittoAI'>
          <SecondaryButton icon='settings' />
        </PageTitle>

        <SectionView name='Scenarios' redirection={SCREENS.ONBOARDING}>
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
        </SectionView>
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
})
