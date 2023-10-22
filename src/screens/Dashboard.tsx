import { useNavigation } from '.'
import PageTitle from '../components/PageTitle'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import useCourses from '../hooks/useCourses'

export default () => {
  const navigation = useNavigation()
  const { courses } = useCourses()

  return (
    <ScreenView>
      <PageTitle label='Pimslr' />

      <SectionView name='Languages' />
      <SectionView name='Scenarios' />

      <SectionView name='Courses'>
        {courses.map(course => (
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
