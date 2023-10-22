import { TEST_COURSE } from '../constants'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '.'
import PageTitle from '../components/PageTitle'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'

export default () => {
  const navigation = useNavigation()

  return (
    <ScreenView>
      <View style={styles.container}>
        <PageTitle label='Pimslr' />

        <SectionView name='Courses'>
          <SecondaryButton
            noticeMe
            label={TEST_COURSE.scenario.title}
            onClick={() => navigation.navigate('course:home', { course: TEST_COURSE })}
          />
        </SectionView>

        <SectionView name='Scenarios'>
          <SecondaryButton
            noticeMe
            label={TEST_COURSE.scenario.title}
            onClick={() => navigation.navigate('course:home', { course: TEST_COURSE })}
          />
        </SectionView>

        {/* <SectionView name='Saved Sentences' redirectionLabel='More'>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView>

        <SectionView name='Recent Sentences' redirectionLabel='More'>
          {userData && <Text>{JSON.stringify(userData, null, 2)}</Text>}
        </SectionView> */}
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
})
