import { useEffect, useState } from 'react'
import useMicrophone from './useMicrophone'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording, amplitude } = useMicrophone()
  const [state, setState] = useState<{
    recognition?: Recognition | null
    isLoading: boolean
    hasFailed?: boolean
  }>({ isLoading: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ recognition: null, isLoading: true })

      speechToText(audioRecording)
        .then(data => setState({ recognition: data, isLoading: false, hasFailed: data === null }))
        .finally(() => FileSystem.deleteAsync(audioRecording!))
        .catch(() => setState(prev => ({ ...prev, hasFailed: true, recognition: null })))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audio = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })

    console.log(audio)
    const url = 'http://pimslrai.greffchandler.net/speech/recognize/' + language
    const response = await axios.post<RecognizeResponse>(url, { audio })

    return response.data.results.length ? response.data.results[0]!.alternatives[0]! : null
  }

  const clearRecognition = () => {
    setState(prev => ({ ...prev, recognition: null }))
  }

  return {
    startRecording,
    stopRecording,
    clearRecognition,
    isRecording,
    amplitude,
    isLoading: state.isLoading,
    recognition: state.recognition,
    hasFailed: state.hasFailed,
  }
}
