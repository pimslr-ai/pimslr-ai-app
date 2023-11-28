import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import { assessWithReference } from '../clients/speech'

export default (language: string, reference: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [state, setState] = useState<{
    isLoading: boolean
    assessement?: AssessmentResult | undefined
    hasFailed?: boolean
  }>({ isLoading: false, hasFailed: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ assessement: undefined, isLoading: true })

      assessSpeech(audioRecording)
        .then(data => setState({ assessement: data, isLoading: false, hasFailed: data === null }))
        .finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const assessSpeech = async (audioFile: string) => {
    if (language && reference) {
      const audio = await FileSystem.readAsStringAsync(audioFile, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return await assessWithReference(language, reference, audio)
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    isLoading: state.isLoading,
    assessement: state.assessement,
    hasFailed: state.hasFailed,
  }
}
