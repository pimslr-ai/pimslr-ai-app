import { HTMLInputTypeAttribute, useEffect, useState } from 'react'
import useMicrophone from './useMicrophone'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMicrophone()
  const [audioTranscript, setAudioTranscript] = useState<string | null>(null)

  useEffect(() => {
    if (audioRecording) {
      speechToText(audioRecording)
        .finally(() => FileSystem.deleteAsync(audioRecording))
        .catch(e => {
          console.log(JSON.stringify(e, null, 2))
          console.log(JSON.stringify(e.response.data, null, 2))
        })
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audioData = FileSystem.
    const audioBlob = new Blob([audioData], { type: 'audio/wav' })
    const audioFileObject = new File([audioBlob], 'audio.wav')

    const formData = new FormData()
    formData.append('audio', audioFileObject)

    const url = 'http://35.178.117.91/speech/recognize/' + language
    const response = await axios.post(url, formData)

    setAudioTranscript(response.data)
  }

  return { startRecording, stopRecording, audioTranscript, isRecording }
}
