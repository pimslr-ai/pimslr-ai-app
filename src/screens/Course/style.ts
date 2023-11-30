import { StyleSheet } from 'react-native'
import { THEME, FONTS } from '../../constants'

export const styles = StyleSheet.create({
  courseControls: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
    paddingHorizontal: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  startButton: {
    position: 'absolute',
    bottom: 70,
  },
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
  card: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 16,
  },
  cardContent: {
    elevation: 14,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingVertical: 70,
    paddingHorizontal: 32,
  },
  cardControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    fontSize: 14,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  cardControlPagination: {
    color: THEME.COLOR,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
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
})
