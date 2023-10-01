import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { DATA, SCREENS } from '../constants'
import PageTitle from '../components/PageTitle'
import useAppStorage from '../hooks/use-app-storage'
import { UserData } from '../types/User'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'

export default () => {
  const navigation = useNavigation()
  const { get } = useAppStorage()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    get<UserData>(DATA.USER_DATA).then(setUserData)
  }, [])

  return (
    <ScreenView>
      <View style={styles.container}>
        <PageTitle label='DittoAI'>
          <SecondaryButton
            icon='settings'
            label='Settings'
            onClick={() => navigation.navigate(SCREENS.SETTINGS)}
          />
        </PageTitle>

        <SecondaryButton noticeMe label='To course' onClick={() => navigation.navigate(SCREENS.COURSE.MAIN)} />

        <SectionView name='Scenarios' redirection={SCREENS.ONBOARDING}>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Saved Sentences' redirection={SCREENS.ONBOARDING}>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Recent Sentences' redirection={SCREENS.ONBOARDING}>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
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
