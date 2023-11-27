import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import { assessWithReference } from '../clients/speech'

export default (language: string, reference: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [state, setState] = useState<{
    transcript?: string | null
    isLoading: boolean
    hasFailed?: boolean
  }>({ isLoading: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ transcript: null, isLoading: true })

      assessSpeech(audioRecording)
        .then(data => setState({ transcript: data, isLoading: false, hasFailed: data === null }))
        .finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const assessSpeech = async (audioFile: string) => {
    if (language && reference) {
      const audio = await FileSystem.readAsStringAsync(audioFile, {
        encoding: FileSystem.EncodingType.Base64,
      })
      const response = await assessWithReference(language, reference, audio)
      return response as string
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    isLoading: state.isLoading,
    recognition: state.transcript,
    hasFailed: state.hasFailed,
  }
}
