import { View, ScrollView } from 'react-native'
import SectionView from '../../components/SectionView'
import ScreenView from '../../components/ScreenView'
import Logo from '../../components/Logo'
import CourseCard from './components/CourseCard'
import { styles } from './style'

export default () => {
  // const { courses } = useCourses()

  return (
    <ScreenView>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Logo />
          {/* <Button icon='settings' label='Settings' /> */}
        </View>

        {/* <SectionView name='Languages' extra='Add language'>
          <View style={{ marginHorizontal: 16, gap: 16 }}>
            <Card>
              <Text>French</Text>
            </Card>
            <Card>
              <Text>Dutch</Text>
            </Card>
            <Card>
              <Text>Spanish</Text>
            </Card>
          </View>
          <Button label='View all' labelStyle={{ marginTop: 16, textAlign: 'center', width: '100%' }} />
        </SectionView> */}

        {/* <SectionView name='Scenarios' extra='Add scenario'>
          <View style={{ marginHorizontal: 16, gap: 16 }}>
            <Card>
              <Text>You are at a bar...</Text>
            </Card>
            <Card>
              <Text>You are at a carwash...</Text>
            </Card>
          </View>
          <Button label='View all' labelStyle={{ marginTop: 16, textAlign: 'center', width: '100%' }} />
        </SectionView> */}

        <SectionView name='Courses'>
          <View style={{ padding: 16, gap: 16 }}>
            {courses?.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
            {/* <Button label='View all' labelStyle={{ marginTop: 16, textAlign: 'center', width: '100%' }} /> */}
          </View>
        </SectionView>

        {/* <SectionView name='Saved sentences'>
          <View style={{ padding: 16, gap: 16 }}>
            <Card>
              <Text>This is a saved sentence.</Text>
            </Card>
          </View>
          <Button label='View all' labelStyle={{ marginTop: 16, textAlign: 'center', width: '100%' }} />
        </SectionView> */}
      </ScrollView>
    </ScreenView>
  )
}
