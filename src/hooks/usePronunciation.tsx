import { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { Assessment } from '../types'
import { getAssessement } from '../clients/pronunciation'
import useMicrophone from './useMicrophone'

export default (language: string, reference: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMicrophone()
  const [state, setState] = useState<{
    isLoading: boolean
    assessement?: Partial<Assessment>
    hasFailed?: boolean
  }>({ isLoading: false, hasFailed: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ assessement: undefined, isLoading: true })

      assessSpeech(audioRecording)
        .then(assessement => setState({ assessement, isLoading: false, hasFailed: assessement === null }))
        .finally(() => FileSystem.deleteAsync(audioRecording))
    }
  }, [audioRecording])

  const assessSpeech = async (audioFile: string) => {
    if (language && reference) {
      const audio = await FileSystem.readAsStringAsync(audioFile, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return await getAssessement(language, reference, audio)
    }
  }

  const clearAssessment = () => {
    setState(prev => ({ ...prev, assessement: undefined }))
  }

  return {
    startRecording,
    stopRecording,
    clearAssessment,
    isRecording,
    isLoading: state.isLoading,
    assessement: state.assessement,
    hasFailed: state.hasFailed,
  }
}
