import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import useSpeech from '../hooks/useSpeech'
import { FONTS, THEME } from '../constants'

const screen = Dimensions.get('screen')

export default () => {
  const { startRecording, stopRecording, recognition, hasFailed, isRecording, isLoading } = useSpeech('en-US')

  return (
    <View style={styles.body}>
      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <Text style={styles.recongized}>
            {recognition
              ? `${recognition.transcript} (${Math.ceil(recognition.confidence * 100) / 100}) \n\n` +
                recognition.words.map(w => `${w.word} (${Math.ceil(w.confidence * 100) / 100})`).join(' ')
              : 'Waiting for input'}
          </Text>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
          <Text style={styles.buttonLabel}>{isRecording ? 'Stop recording' : 'Start recording'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.status}>
        {isRecording
          ? 'Listening...'
          : isLoading
          ? 'Loading...'
          : hasFailed
          ? 'Recognition failed.'
          : 'Standby'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  status: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.POPPINS.MEDIUM,
  },
  button: {
    backgroundColor: THEME.CTA,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonLabel: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 14,
    color: 'white',
  },
  card: {
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardWrapper: {
    width: '100%',
    minHeight: 150,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  recongized: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.POPPINS.REGULAR,
  },
})
