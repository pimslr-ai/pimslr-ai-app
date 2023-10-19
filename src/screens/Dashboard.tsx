import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { DATA, TEST_COURSE } from '../constants'
import { useNavigation } from '../hooks/useScreens'
import PageTitle from '../components/PageTitle'
import useAppStorage from '../hooks/useStorage'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
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
        <PageTitle label='Pimslr' />

        <SectionView name='Scenarios' redirectionLabel='More'>
          <Button
            label={TEST_COURSE.scenario}
            onClick={() => navigation.navigate('course:home', { course: TEST_COURSE })}
          />
        </SectionView>

        <SectionView name='Saved Sentences' redirectionLabel='More'>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Recent Sentences' redirectionLabel='More'>
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
