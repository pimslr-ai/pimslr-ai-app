import { TEST_COURSE } from '../constants'
import { useNavigation } from '.'
import PageTitle from '../components/PageTitle'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'

export default () => {
  const navigation = useNavigation()

  return (
    <ScreenView>
      <PageTitle label='Pimslr' />

      <SectionView name='Languages' />
      <SectionView name='Scenarios' />

      <SectionView name='Courses'>
        <SecondaryButton
          noticeMe
          label={TEST_COURSE.scenario.title}
          onClick={() => navigation.navigate('course:home', { course: TEST_COURSE })}
        />
      </SectionView>

      <SectionView name='Saved sentences' />
    </ScreenView>
  )
}
