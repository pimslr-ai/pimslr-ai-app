import { View, Text, StyleSheet } from 'react-native'
import { FONTS, THEME } from '../constants'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SecondaryButton label='Back' />
        <Text style={styles.headerTitle}>1/3</Text>
        <SecondaryButton label='Skip' noticeMe />
      </View>
      <Text style={styles.title}>What language would you like to learn?</Text>
      <Input style={styles.input} />
      <PrimaryButton label='Next' containerStyle={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
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
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
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
})
