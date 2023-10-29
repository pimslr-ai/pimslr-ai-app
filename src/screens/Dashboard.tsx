import { useNavigation } from '.'
import SectionView from '../components/SectionView'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { FONTS, TEST_COURSE } from '../constants'
import Logo from '../components/Logo'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default () => {
  // const { courses } = useCourses()
  const courses = [TEST_COURSE]

  return (
    <ScreenView>
      <Logo />

      <SectionView name='Languages' />
      <SectionView name='Scenarios' />

      <SectionView name='Courses'>
        {courses?.map(course => (
          <Card key={course.id} {...course} />
        ))}
      </SectionView>

      <SectionView name='Saved sentences' />
    </ScreenView>
  )
}

const Card = (course: Course) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('course:home', { course })}
    >
      <Text style={styles.cardDate}>{formatHumanDateTime(course.createdAt)}</Text>
      <Text style={styles.cardTitle}>{course.scenario.title}</Text>
      <Text style={styles.cardDetails}>{course.language.name} | 85% native speaker | 6/10 completed</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    minHeight: 100,
    display: 'flex',
    gap: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: FONTS.POPPINS.MEDIUM,
  },
  cardDate: {
    fontSize: 12,
  },
  cardDetails: {

  },
})

function formatHumanDateTime(date: Date) {
  const datePart = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  return `${datePart} | ${timePart}`
}
