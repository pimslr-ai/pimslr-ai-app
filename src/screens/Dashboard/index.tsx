import { View, ScrollView, Text } from 'react-native'
import SectionView from '../../components/SectionView'
import ScreenView from '../../components/ScreenView'
import Logo from '../../components/Logo'
import CourseCard from './components/CourseCard'
import { styles } from './style'
import { Course } from '../../types'
import { useNavigation } from '..'
import { course } from '../Course/test'

export default () => {
  const courses: Course[] = [course]

  return (
    <ScreenView>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Logo />
          {/* <Button icon='settings' label='Settings' /> */}
        </View>

        <SectionView name='Courses'>
          <View style={{ padding: 16, gap: 16 }}>
            {courses?.map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
            {/* <Button label='View all' labelStyle={{ marginTop: 16, textAlign: 'center', width: '100%' }} /> */}
          </View>
        </SectionView>
      </ScrollView>
    </ScreenView>
  )
}
