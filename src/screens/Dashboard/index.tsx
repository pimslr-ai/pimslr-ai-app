import { View, ScrollView } from 'react-native'
import SectionView from '../../components/SectionView'
import ScreenView from '../../components/ScreenView'
import Logo from '../../components/Logo'
import CourseCard from './components/CourseCard'
import { styles } from './style'
import { useCourses } from '../../contexts/CourseProvider'

export default () => {
  const { courses } = useCourses()

  return (
    <ScreenView>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Logo />
          {/* <Button icon='settings' label='Settings' /> */}
        </View>

        <SectionView name='Courses'>
          <View style={{ padding: 16, gap: 16 }}>
            {courses?.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </View>
        </SectionView>
      </ScrollView>
    </ScreenView>
  )
}
