import { FONTS, INTERESTS, LANGUAGES, THEME } from '../constants'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import InteractiveInput from '../components/InteractiveInput'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'
import ScreenView from '../components/ScreenView'
import Dropdown from '../components/Dropdown'

export default () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [canSkip, setCanSkip] = useState(true)
  const [pageCompleted, setPageCompleted] = useState(false)

  const [language, setLanguage] = useState<string | null>(null)
  const [profecenicy, setProfecenicy] = useState<string | null>(null)
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    setCanSkip(![2, 3].includes(pageNumber))
    setPageCompleted(false)
  }, [pageNumber])

  useEffect(() => {
    setPageCompleted(!!language)
  }, [language])

  useEffect(() => {
    setPageCompleted(!!profecenicy)
  }, [profecenicy])

  useEffect(() => {
    setPageCompleted(interests.length >= 3)
  }, [interests])

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryButton hide={pageNumber <= 1} label='Back' onClick={pageView?.turnPrevious} />
          <Text style={styles.headerTitle}>{pageNumber}/3</Text>
          <SecondaryButton label='Skip' noticeMe hide={canSkip} onClick={pageView?.turnNext} />
        </View>

        <PageView ref={setPageView} onPageChange={setPageNumber}>
          <View style={styles.page}>
            <Text style={styles.title}>Choose a language</Text>
            <Text style={styles.subtitle}>Learn your first language the PimslrAI way.</Text>
            <Dropdown
              containerStyle={styles.dropdown}
              items={LANGUAGES}
              label='Select a language'
              onSelection={setLanguage}
            />
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>Tell us about yourself</Text>
            <Text style={styles.subtitle}>Get lessons catered to your interests. Select at least 3.</Text>
            <ScrollView style={styles.tagsWrapper} showsVerticalScrollIndicator={false}>
              <View style={styles.tags}>
                {INTERESTS.map(interest => (
                  <Tag
                    key={interest}
                    label={interest}
                    onToggleOn={label => setInterests([...interests, label])}
                    onToggleOff={label => setInterests(interests.filter(i => i !== label))}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.bottomBorder} />
          </View>

          <View style={styles.page}>
            <Text style={styles.title}>What's your level?</Text>
            <Text style={styles.subtitle}>Get lessons tailored to your level.</Text>
            <InteractiveInput
              multiline
              style={styles.input}
              placeholder='I can understand some of it...'
              onChange={setProfecenicy}
            />
          </View>
        </PageView>

        <PrimaryButton
          disable={!pageCompleted}
          label={pageNumber >= 3 ? 'Complete' : 'Next'}
          containerStyle={styles.button}
          onClick={pageView?.turnNext}
        />
      </View>
    </ScreenView>
  )
}

const Tag = ({
  label,
  onToggleOn,
  onToggleOff,
}: {
  label: string
  onToggleOn?: (label: string) => void
  onToggleOff?: (label: string) => void
}) => {
  const [toggle, setToggled] = useState<boolean>()

  const style = toggle
    ? {
        ...styles.tag,
        ...styles.tagActive,
      }
    : styles.tag

  const handleToggle = () => {
    if (toggle) {
      setToggled(false)
      onToggleOff!(label)
    } else {
      setToggled(true)
      onToggleOn!(label)
    }
  }

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
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
  headerTitle: {
    fontSize: 16,
    color: THEME.COLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.BOLD,
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 40,
    fontSize: 17,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
  input: {
    height: '50%',
    marginTop: 50,
  },
  tagsWrapper: {
    marginTop: 50,
    height: '50%',
    padding: 8,
  },
  bottomBorder: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tags: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 32,
    // justifyContent: 'center',
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    color: THEME.COLOR,
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 15,
  },
  tagActive: {
    backgroundColor: THEME.ACCENT,
    color: 'white',
  },
  dropdown: {
    marginTop: 50,
  },
  button: {
    position: 'absolute',
    bottom: 70,
  },
  page: {
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
})
