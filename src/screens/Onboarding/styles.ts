import { StyleSheet } from 'react-native'
import { THEME, FONTS } from '../../constants'

export const styles = StyleSheet.create({
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
    marginTop: 40,
    height: '50%',
  },
  tagsWrapper: {
    marginTop: 40,
    height: '40%',
    padding: 8,
  },
  writeButtonWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
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
    width: '80%',
  },
  button: {
    position: 'absolute',
    bottom: 70,
  },
  page: {
    paddingHorizontal: 25,
    paddingVertical: 16,
  },
  explanationsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  explanations: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 16,
    marginHorizontal: 'auto',
    padding: 32,
  },
})
