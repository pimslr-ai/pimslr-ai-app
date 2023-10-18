import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { DATA, SCREENS } from '../constants'
import PageTitle from '../components/PageTitle'
import useAppStorage from '../hooks/useStorage'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigation } from '@react-navigation/native'

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
        <PageTitle label='Pimslr'>
          <SecondaryButton
            labelFirst
            icon='settings'
            label='Settings'
            onClick={() => navigation.navigate(SCREENS.SETTINGS)}
          />
        </PageTitle>

        <SecondaryButton label='Onboarding' onClick={() => navigation.navigate(SCREENS.ONBOARDING)} />

        <SectionView name='Scenarios' redirectionLabel='More' redirection={SCREENS.COURSE.MAIN}>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Saved Sentences' redirectionLabel='More' redirection={SCREENS.ONBOARDING}>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Recent Sentences' redirectionLabel='More' redirection={SCREENS.ONBOARDING}>
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
