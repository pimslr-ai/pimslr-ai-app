import { useNavigation } from '.'
import { Image } from 'react-native'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { TEST_COURSE } from '../constants'
import { SvgUri } from 'react-native-svg'

export default () => {
  const navigation = useNavigation()
  // const { courses } = useCourses()
  const courses = [TEST_COURSE]

  return (
    <ScreenView>
      <SvgUri width={100} height={100} source={} />

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
