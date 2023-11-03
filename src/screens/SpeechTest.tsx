import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import useSpeech from '../hooks/useSpeech'
import { FONTS, THEME } from '../constants'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'

const screen = Dimensions.get('screen')

const languageCodes = [
  'en-US',
  'nl-NL',
  'fr-FR',
  'de-DE',
  'es-ES',
  'it-IT',
  'pt-PT',
  'ru-RU',
  'ja-JP',
  'zh-CN',
  'ar-SA',
  'hi-IN',
  'ko-KR',
  'tr-TR',
  'pl-PL',
  'cs-CZ',
  'sv-SE',
  'da-DK',
  'no-NO',
  'fi-FI',
  'el-GR',
  'he-IL',
  'hu-HU',
  'ro-RO',
  'th-TH',
  'id-ID',
  'ms-MY',
  'vi-VN',
  'tl-PH',
  'uk-UA',
  'bg-BG',
  'hr-HR',
  'sr-RS',
  'sk-SK',
  'sl-SI',
  'et-EE',
  'lv-LV',
  'lt-LT',
  'is-IS',
  'ga-IE',
  'cy-GB',
  'gl-ES',
  'eu-ES',
  'sq-AL',
  'mk-MK',
  'bs-BA',
  'hy-AM',
  'ka-GE',
  'uz-UZ',
  'tt-RU',
  'tg-TJ',
  'km-KH',
  'mn-MN',
  'ne-NP',
  'si-LK',
  'pa-IN',
  'ta-IN',
  'te-IN',
  'kn-IN',
  'ur-PK',
  'bn-BD',
  'th-TH',
  'lo-LA',
  'my-MM',
  'ka-KG',
  'ug-CN',
  'tm-TM',
  'ku-IQ',
  'fa-IR',
  'ps-AF',
  'dv-MV',
  'bh-IN',
  'mr-IN',
  'sa-IN',
  'kk-KZ',
  'ky-KG',
  'az-AZ',
  'be-BY',
]

export default () => {
  const [lang, setLang] = useState<string | null>(null)
  const { startRecording, stopRecording, recognition, hasFailed, isRecording, isLoading } = useSpeech(lang!)

  function getRandomColor(): string {
    const colors = [
      { color: '#44b51a', chance: 50 },
      { color: '#7bba16', chance: 35 },
      { color: '#b8be0e', chance: 10 },
      { color: '#c39d12', chance: 5 },
    ]

    const totalChance = colors.reduce((acc, curr) => acc + curr.chance, 0)

    const randomValue = Math.random() * totalChance

    let accumulatedChance = 0
    for (const { color, chance } of colors) {
      accumulatedChance += chance
      if (randomValue < accumulatedChance) {
        return color
      }
    }

    return '#000000'
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
          onValueChange={setLang}
          items={languageCodes.map(code => ({ label: code, value: code }))}
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
                  <Text key={w.word} style={{ color: getRandomColor() }}>
                    {w.word + ' '}
                  </Text>
                ))
              : 'Waiting for input'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.buttonLabel}>{isRecording ? 'Stop recording' : 'Start recording'}</Text>
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
