import { useEffect, useState } from 'react'
import useMicrophone from './useMicrophone'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording, amplitude } = useMicrophone()
  const [state, setState] = useState<{
    isLoading: boolean
    hasFailed?: boolean
  }>({ isLoading: false })
  const [recognition, setRecognition] = useState<Recognition | null>()

  useEffect(() => {
    if (audioRecording) {
      setState({ isLoading: true })
      setRecognition(null)

      speechToText(audioRecording)
        .then(data => {
          setRecognition(data)
          setState({ isLoading: false, hasFailed: data === null })
        })
        .catch(() => setState(prev => ({ ...prev, hasFailed: true, recognition: null })))
        .finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audio = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const url = 'http://pimslrai.greffchandler.net/speech/recognize/' + language
    const response = await axios.post<RecognizeResponse>(url, { audio })
    return response.data.results.length ? response.data.results[0]!.alternatives[0]! : null
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    amplitude,
    recognition,
    isLoading: state.isLoading,
    hasFailed: state.hasFailed,
  }
}
