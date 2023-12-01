import { useEffect, useState } from 'react'
import { readAsStringAsync, deleteAsync } from 'expo-file-system'
import { Assessment } from '../types'
import { assessAudio } from '../clients/pronunciation'
import useMicrophone from './useMicrophone'

export default (language: string, reference: string) => {
  const { toggleRecording, startRecording, stopRecording, isRecording, recording } = useMicrophone()
  const [assessment, setAssessment] = useState<Assessment | null>()
  const [isAssessing, setIsAssessing] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  useEffect(() => {
    if (recording) {
      setHasFailed(false)
      setIsAssessing(true)
      assessSpeech(recording)
        .then(setAssessment)
        .catch(() => setIsAssessing(true))
        .finally(() => deleteAsync(recording))
      setIsAssessing(false)
    }
  }, [recording])

  const assessSpeech = async (recording: string) => {
    if (language && reference) {
      const audio = await readAsStringAsync(recording, { encoding: 'base64' })
      return await assessAudio(language, reference, audio)
    }
  }

  return {
    toggleRecording,
    startRecording,
    stopRecording,
    isRecording,
    isAssessing,
    assessment,
    hasFailed,
  }
}