import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Audio } from 'expo-av'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import Button from '../components/Button'

export default () => {
  const [recognizedText, setRecognizedText] = useState('')
  const [isMatch, setIsMatch] = useState(false)
  const targetText = 'Pourriez-vous recommander une bière locale ?' // Replace with your target text
  const audioFilePath = '../../assets/audio/_target.m4a' // Replace with the correct path

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults

    // Load and play the audio file using Expo AV
    const playAudioFile = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioFilePath })

      await sound.playAsync()
      console.log('Audio file played successfully')

      // Start speech recognition when the audio finishes playing
      Voice.start('fr-FR') // Start speech recognition with the desired language
    }

    playAudioFile()

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const onSpeechResults = (event: SpeechResultsEvent) => {
    console.log(event)

    // Extract the recognized text from the speech results
    const recognizedText = event?.value![0]

    // Compare the recognized text with the target text
    const isMatch = recognizedText.toLowerCase() === targetText.toLowerCase()

    setRecognizedText(recognizedText)
    setIsMatch(isMatch)
  }

  const startListeningAgain = () => {
    Voice.start('fr-FR') // Restart speech recognition
  }

  return (
    <View>
      <Text>Recognized Text: {recognizedText}</Text>
      {isMatch ? (
        <Text style={{ color: 'green' }}>Matched with Target Text</Text>
      ) : (
        <Text style={{ color: 'red' }}>Not Matched with Target Text</Text>
      )}
      <Button label='Start Listening Again' onClick={startListeningAgain} />
    </View>
  )
}
