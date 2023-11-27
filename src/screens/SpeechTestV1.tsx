import { useState } from 'react'
import { FONTS, LANGUAGES, THEME } from '../constants'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import useSpeech from '../hooks/useSpeechV1'
import RNPickerSelect from 'react-native-picker-select'
import { useNavigation } from '.'

const screen = Dimensions.get('screen')

export default () => {
  const navigation = useNavigation()

  const [language, setLanguage] = useState<string | null>(null)
  // prettier-ignore
  const { 
    startRecording, 
    stopRecording, 
    recognition, 
    hasFailed, 
    isRecording, 
    isLoading,
  } = useSpeech(language!)

  function getColor(confidence: number): string {
    const colors = [
      'rgb(252, 54, 17)',
      'rgb(252, 122, 19)',
      'rgb(247, 169, 40)',
      'rgb(247, 169, 40)',
      'rgb(156, 167, 40)',
      'rgb(156, 167, 40)',
      'rgb(89, 168, 60)',
    ]
    const index = Math.floor(confidence * (colors.length - 1))
    return colors[index]
  }

  return (
    <View style={styles.body}>
      <View style={{ alignItems: 'center', width: '50%' }}>
        <RNPickerSelect
          placeholder={{ label: 'Select a language', value: null }}
          style={{
            viewContainer: styles.dropdown,
            placeholder: styles.dropdownLabel,
            inputIOS: styles.dropdownLabel,
          }}
          onValueChange={setLanguage}
          items={LANGUAGES.map(code => ({ label: code, value: code }))}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <Text style={styles.recongized}>
            {isRecording
              ? 'Listening...'
              : isLoading
              ? 'Loading...'
              : hasFailed
              ? 'Recognition failed.'
              : recognition
              ? recognition.words.map(w => (
                  <Text key={w.word} style={{ color: getColor(w.confidence) }}>
                    {w.word + ' '}
                  </Text>
                ))
              : 'Waiting for input'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        disabled={language === null}
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonLabel}>
          {language === null ? 'Select a language first' : isRecording ? 'Stop recording' : 'Start recording'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('speech:v2')}>
        <Text style={styles.buttonLabelAlt}>To version 2</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: THEME.CTA,
    paddingVertical: 15,
    borderRadius: 10,
    width: '50%',
  },
  buttonLabel: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  buttonLabelAlt: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
  card: {
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardWrapper: {
    width: '100%',
    minHeight: 250,
    padding: 30,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  recongized: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONTS.POPPINS.REGULAR,
    gap: 15,
    flexDirection: 'row',
  },
  dropdown: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 10,
  },
  dropdownLabel: {
    fontFamily: FONTS.POPPINS.REGULAR,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
})
