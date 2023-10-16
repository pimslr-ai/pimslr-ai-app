import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [audioTranscript, setAudioTranscript] = useState<string | null>(null)

  useEffect(() => {
    if (audioRecording) {
      speechToText(audioRecording).finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audioData = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const url = 'http://localhost:5102/speech/recognize/' + language
    const response = await axios.post(url, { audio: audioData })
    setAudioTranscript(response.data)
  }

  return { startRecording, stopRecording, isRecording, audioTranscript }
}
