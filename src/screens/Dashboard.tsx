import { FONTS, TEST_COURSE } from '../constants'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
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
        {/* <Card>
          <Text>Create new course</Text>
        </Card> */}
        {courses?.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
        {courses?.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </SectionView>

      <SectionView name='Saved sentences'>
        <Card>
          <Text>This is a saved sentence.</Text>
        </Card>
      </SectionView>
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
  const backgroundCards = new Array(3).fill(null)

  const backgroundCardStyle = (index: number): ViewStyle => ({
    width: '100%',
    height: '100%',
    backgroundColor: `rgba(0, 0, 0, ${0.03 * (index + 1)})`,
    transform: [{ rotateZ: `${getBetween(7, -7)}deg` }],
    margin: 20,
    position: 'absolute',
    borderRadius: 20,
    zIndex: -index,
  })

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('course:home', { courseId: course.id })}
      style={{ padding: 20, overflow: 'visible', position: 'relative' }}
    >
      <View style={styles.courseCard}>
        <Text style={styles.courseTitle}>{course.scenario.title}</Text>
        <Text style={styles.courseDate}>{formatHumanDateTime(course.createdAt)}</Text>
        <Text style={styles.courseDetails}>{course.language.name} | 85% native speaker | 6/10 completed</Text>
      </View>
      {backgroundCards.map((_, i) => (
        <View key={i} style={backgroundCardStyle(i)} />
      ))}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.5,
    minHeight: 100,
  },
  courseCard: {
    display: 'flex',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 20,
    width: '100%',
    minHeight: 100,
    backgroundColor: 'white',
    zIndex: 9,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: FONTS.POPPINS.MEDIUM,
  },
  courseDate: {
    fontSize: 10,
  },
  courseDetails: {},
  courseCardStackContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function formatHumanDateTime(date: Date) {
  const datePart = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  return `${datePart} | ${timePart}`
}

const getBetween = (num1: number, num2: number) => {
  if (num1 > num2) {
    ;[num1, num2] = [num2, num1]
  }
  return Math.random() * (num2 - num1) + num1
}
