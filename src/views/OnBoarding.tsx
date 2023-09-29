import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, THEME } from '../constants'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import PageView from '../components/PageView'

interface UserInputs {
  lang: string
  profeciency?: string
  context?: string
}

export default ({ onComplete }: { onComplete?: (data: UserInputs) => void }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageView, setPageView] = useState<PageView | null>()
  const [isOptional, setOptional] = useState<boolean>(false)

  useEffect(() => {
    switch (pageNumber) {
      case 1:
        setOptional(false)
        break
      case 2:
        setOptional(false)
        break
      case 3:
        setOptional(true)
        break
    }
  }, [pageNumber, pageView])

  const handleCompletion = () => {
    if (onComplete) {
      onComplete({
        lang: '',
        profeciency: '',
        context: '',
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SecondaryButton hide={pageNumber <= 1} label='Back' onClick={pageView?.turnPrevious} />
        <Text style={styles.headerTitle}>{pageNumber}/3</Text>
        <SecondaryButton label='Skip' noticeMe hide={!isOptional} onClick={pageView?.turnNext} />
      </View>
      <PageView ref={setPageView} onPageChange={setPageNumber} onLastPage={handleCompletion}>
        <View style={styles.page}>
          <Text style={styles.title}>What language would you like to learn?</Text>
          <Input style={styles.langageInput} placeholder='French' />
          <Input style={styles.langageInput} placeholder='French' />
        </View>
        <View style={styles.page}>
          <Text style={styles.title}>What's your level?</Text>
          <Text style={styles.subtitle}>
            This information is used to generate sentences that match your current level.
          </Text>
          <Input multiline style={styles.input} placeholder='I can understand some of it...' />
        </View>
        <View style={styles.page}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            This information is used to generate sentences that relate to your desires.
          </Text>
          <Input multiline style={styles.input} placeholder='I am an exchange student...' />
        </View>
      </PageView>
      <PrimaryButton
        label={pageNumber >= 3 ? 'Complete' : 'Next'}
        containerStyle={styles.button}
        onClick={pageView?.turnNext}
      />
    </View>
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
    fontWeight: 'bold',
    fontSize: 27,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 15,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
  langageInput: {
    textAlign: 'center',
    marginTop: 40,
  },
  input: {
    height: '40%',
    marginTop: 40,
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
