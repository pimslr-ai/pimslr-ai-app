import { FONTS, LANGUAGES, THEME } from '../constants'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ColorValue,
  TextProps,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native'
import { useNavigation } from '.'
import useSpeech from '../hooks/useSpeechV2'
import RNPickerSelect from 'react-native-picker-select'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

const screen = Dimensions.get('screen')

export default () => {
  const navigation = useNavigation()
  const [language, setLanguage] = useState<string | undefined>()
  const [reference, setReference] = useState<string | undefined>()
  // prettier-ignore
  const { 
    startRecording, 
    stopRecording, 
    assessment,
    hasFailed, 
    isRecording, 
    isLoading,
  } = useSpeech(language!, reference!)

  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    if (assessment) {
      assessment.words.forEach(word => {
        word.syllables.forEach(syllable => {
          const candidate = toColor(syllable.accuracyScore)
          const colors = Array.from({ length: syllable.syllable.length }, () => candidate)
          setColors(prev => [...prev, ...colors])
        })
      })
    }
  }, [assessment])

  const toColor = (score: number) => {
    const gradient = [
      'rgb(252, 54, 17)',
      'rgb(252, 122, 19)',
      'rgb(247, 169, 40)',
      'rgb(156, 167, 40)',
      'rgb(89, 168, 60)',
    ]
    const index = Math.floor((score / 100) * (gradient.length - 1))
    return gradient[index]
  }

  return (
    <View style={styles.body}>
      <View style={{ alignItems: 'center', width: '50%', gap: 20 }}>
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

        <TextInput
          style={styles.inputContainer}
          onChangeText={setReference}
          placeholder='Reference sentence'
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          {hasFailed ? (
            <Text style={styles.recongized}>Recognition failed...</Text>
          ) : !language ? (
            <Text style={styles.recongized}>Select a language...</Text>
          ) : !reference ? (
            <Text style={styles.recongized}>Enter a reference sentence...</Text>
          ) : (
            <MultilineGradientText colors={colors} children={reference} style={styles.recongized} />
          )}
        </View>
      </View>

      <TouchableOpacity
        disabled={!language || !reference || isLoading}
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonLabel}>
          {!language
            ? 'Select a language'
            : !reference
            ? 'Enter reference text'
            : isLoading
            ? 'Loading...'
            : isRecording
            ? 'Stop recording'
            : 'Start recording'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('speech:v1')}>
        <Text style={styles.buttonLabelAlt}>To version 1</Text>
      </TouchableOpacity>
    </View>
  )
}

interface GradientTextProps extends TextProps {
  colors?: ColorValue[]
}

const GradientText = (props: GradientTextProps) => {
  const gradient = props.colors && props.colors.length ? (props.colors as string[]) : ['black']

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

interface MultilineGradientTextProps extends GradientTextProps {}

const MultilineGradientText = (props: MultilineGradientTextProps) => {
  const [isLayoutComputed, setIsLayoutComputed] = useState(false)
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    setIsLayoutComputed(false)
  }, [props.children])

  const totalLength = lines.reduce((acc, line) => acc + line.length, 0)

  const processedLines = lines.map((line, i, lines) => {
    const startLength = lines.slice(0, i).reduce((acc, item) => acc + item.length, 0) / totalLength
    const stopLength = startLength + line.length / totalLength

    const startIndex = Math.floor(startLength * props?.colors?.length!)
    const stopIndex = Math.floor(stopLength * props?.colors?.length!)

    const colors_ = props?.colors?.slice(startIndex, stopIndex)

    return { line, colors: colors_ }
  })

  const handleTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = event.nativeEvent
    setLines(lines.map(line => line.text))
    setIsLayoutComputed(true)
  }

  return isLayoutComputed ? (
    <>
      {processedLines.map((line, i) => (
        <GradientText key={line.line} {...props} children={line.line} colors={line.colors} />
      ))}
    </>
  ) : (
    <Text style={styles.recongized} onTextLayout={handleTextLayout} {...props} />
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
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 10,
    fontFamily: FONTS.POPPINS.REGULAR,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
})