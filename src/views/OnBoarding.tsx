import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { FONTS, THEME } from '../constants'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import Pages from '../components/Pages'

export default () => {
  const [pageIndex, setPageIndex] = useState(0)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SecondaryButton label='Back' />
        <Text style={styles.headerTitle}>{pageIndex + 1}/3</Text>
        <SecondaryButton label='Skip' noticeMe />
      </View>
      <Pages pageIndex={pageIndex}>
        <View style={styles.page}>
          <Text style={styles.title}>What language would you like to learn?</Text>
          <Input style={styles.input} placeholder='English' />
        </View>
        <View style={styles.page}>
          <Text style={styles.title}>What's your level?</Text>
          <Input style={styles.input} placeholder='I can understand some of it...' />
        </View>
        <View style={styles.page}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Input style={styles.input} placeholder='Im an exchange student...' />
        </View>
      </Pages>
      <PrimaryButton
        label='Next'
        containerStyle={styles.button}
        onClick={() => setPageIndex(page => page + 1)}
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
    margin: 50,
    marginTop: 50,
    marginBottom: 30,
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
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
  input: {
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    position: 'absolute',
    bottom: 70,
  },
  page: {
    padding: 16,
  },
})
