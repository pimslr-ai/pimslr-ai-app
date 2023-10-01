import { StyleSheet, View, Text } from 'react-native'
import ScreenView from '../components/ScreenView'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigation } from '@react-navigation/native'
import { FONTS, SCREENS, THEME } from '../constants'
import CardView from '../components/CardView'
import { useState } from 'react'

interface Sentence {
  id: any
  translation?: string
  original?: string
}

const sentences: Sentence[] = [
  {
    id: 1,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 2,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 3,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 1,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 2,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 3,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 1,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 2,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
  {
    id: 3,
    translation: 'Pourriez-vous recommander une bière locale ?',
    original: 'Could you recommend a local brew?',
  },
]

export default () => {
  const navigation = useNavigation()
  const [cardView, setCardView] = useState<CardView | null>()

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton
            containerStyle={{ transform: [{ scale: 1.4 }] }}
            icon='close'
            onClick={() => navigation.navigate(SCREENS.DASHBOARD)}
          />
          <SecondaryButton
            labelFirst
            noticeMe
            label='Refine Scenario'
            onClick={() => navigation.navigate(SCREENS.COURSE.REFINE_SCENARIO)}
          />
        </View>

        <Text style={styles.title}>You're at a bar...</Text>

        <View style={styles.cards}>
          <CardView ref={setCardView}>
            {sentences.map(sentence => (
              <View key={sentence.id}>
                <Text style={styles.translation}>{sentence.translation}</Text>
                <Text style={styles.original}>{sentence.original}</Text>
              </View>
            ))}
          </CardView>
          <View style={styles.cardControls}>
            <SecondaryButton
              hide={0 <= 1}
              label='Back'
              labelStyle={{ opacity: 0.7 }}
              onClick={cardView?.flipPrevious}
            />
            <Text style={styles.cardControlPagination}>{1}/3</Text>
            <SecondaryButton label='Next' labelStyle={{ opacity: 0.7 }} onClick={cardView?.flipNext} />
          </View>
        </View>
      </View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: 30,
    marginTop: 50,
  },
  title: {
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginVertical: 40,
  },
  cards: {
    padding: 16,
    position: 'relative',
  },
  translation: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 20,
    marginBottom: 24,
  },
  original: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS.REGULAR,
    fontSize: 16,
    opacity: 0.5,
  },
  cardControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 40,
  },
  cardControlPagination: {
    fontSize: 12,
    color: THEME.COLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
})
