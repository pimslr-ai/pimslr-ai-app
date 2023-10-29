import { useNavigation } from '.'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { TEST_COURSE } from '../constants'
import Logo from '../components/Logo'

export default () => {
  const navigation = useNavigation()
  // const { courses } = useCourses()
  const courses = [TEST_COURSE]

  return (
    <ScreenView>
      <Logo />

      <SectionView name='Languages' />
      <SectionView name='Scenarios' />

      <SectionView name='Courses'>
        {courses?.map(course => (
          <SecondaryButton
            noticeMe
            key={course.id}
            label={course.scenario.title}
            onClick={() => navigation.navigate('course:home', { course })}
          />
        ))}
      </SectionView>

      <SectionView name='Saved sentences' />
    </ScreenView>
  )
}
