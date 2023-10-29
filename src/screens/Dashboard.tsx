import { FONTS, TEST_COURSE } from '../constants'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { PropsWithChildren } from 'react'
import { useNavigation } from '.'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import Logo from '../components/Logo'

export default () => {
  // const { courses } = useCourses()
  const courses = [TEST_COURSE]

  return (
    <ScreenView>
      <Logo />

      <SectionView name='Languages' rowDirection>
        <Card>
          <Text>Learn a new language!</Text>
        </Card>
        <Card>
          <Text>French</Text>
        </Card>
        <Card>
          <Text>Dutch</Text>
        </Card>
        <Card>
          <Text>Spanish</Text>
        </Card>
      </SectionView>

      <SectionView name='Scenarios' rowDirection>
        <Card>
          <Text>Add a new scenario</Text>
        </Card>
        <Card>
          <Text>You are at a bar...</Text>
        </Card>
        <Card>
          <Text>You are at a carwash...</Text>
        </Card>
      </SectionView>

      <SectionView name='Courses'>
        <Card>
          <Text>Create new course</Text>
        </Card>

        {courses?.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </SectionView>

      <SectionView name='Saved sentences' />
    </ScreenView>
  )
}

interface CardProps extends PropsWithChildren {
  onClick?: () => void
  style?: ViewStyle
}

const Card = ({ children, onClick, style }: CardProps) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, style]} onPress={() => (onClick ? onClick() : null)}>
      {children}
    </TouchableOpacity>
  )
}

const CourseCard = (course: Course) => {
  const navigation = useNavigation()

  return (
    <Card onClick={() => navigation.navigate('course:home', { courseId: course.id })}>
      <Text style={styles.courseDate}>{formatHumanDateTime(course.createdAt)}</Text>
      <Text style={styles.courseTitle}>{course.scenario.title}</Text>
      <Text style={styles.courseDetails}>{course.language.name} | 85% native speaker | 6/10 completed</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.5,
    minHeight: 100,
    display: 'flex',
    gap: 10,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: FONTS.POPPINS.MEDIUM,
  },
  courseDate: {
    fontSize: 12,
  },
  courseDetails: {},
})

function formatHumanDateTime(date: Date) {
  const datePart = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  return `${datePart} | ${timePart}`
}
