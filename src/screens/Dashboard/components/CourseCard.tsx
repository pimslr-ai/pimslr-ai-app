import { ViewStyle, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '../..'
import { FONTS, LANGUAGES, THEME } from '../../../constants'
import { Course } from '../../../types'

export default ({ course }: { course: Course }) => {
  const navigation = useNavigation()
  const backgroundCards = new Array(3).fill(null)

  function formatHumanDateTime(date: Date) {
    const datePart = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    return `${datePart} | ${timePart}`
  }

  function capitalize(str: string) {
    if (str.length === 0) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function getRandom(arr: number[]) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  const backgroundCardStyle = (index: number): ViewStyle => ({
    width: '100%',
    height: '100%',
    backgroundColor: THEME.CTA,
    opacity: 0.1 * (index + 1),
    transform: [{ rotateZ: `${getRandom([7, 6, 5, 4, -4, -5, -6, -7])}deg` }],
    margin: 20,
    position: 'absolute',
    borderRadius: 20,
    zIndex: -index,
  })

  const sentences = course![course!.currentLevel]
  const completedSentences = sentences.reduce((acc, s) => acc + (s && s.score ? 1 : 0), 0)
  const totalScore = sentences.reduce((sum, assessment) => sum + (assessment.score?.accuracyScore || 0), 0)
  const score = totalScore / sentences.length

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('course', { id: course.id })}
      style={styles.container}
    >
      <View style={styles.courseCard}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <View style={styles.courseDetails}>
          <Text style={styles.tag}>{LANGUAGES.filter(l => l.value === course.language)[0].label}</Text>
          <Text style={styles.tag}>{capitalize(course.currentLevel)}</Text>
          <Text style={styles.tag}>
            {completedSentences}/{sentences.length} Completed
          </Text>
          <Text style={styles.tag}>{Math.round(score)}% Score</Text>
        </View>
      </View>
      {backgroundCards.map((_, i) => (
        <View key={i} style={backgroundCardStyle(i)} />
      ))}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    overflow: 'visible',
    position: 'relative',
  },
  courseCard: {
    display: 'flex',
    gap: 20,
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
    elevation: 7,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: FONTS.POPPINS.BOLD,
    color: THEME.COLOR_ALT,
    textAlign: 'center',
  },
  courseDate: {
    fontSize: 10,
    textAlign: 'center',
  },
  courseDetails: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  tag: {
    alignSelf: 'flex-start',
    color: 'black',
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 8,
    overflow: 'hidden',
  },
})
