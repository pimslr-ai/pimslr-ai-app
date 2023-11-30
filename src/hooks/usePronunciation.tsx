import { useEffect, useState } from 'react'
import { readAsStringAsync, deleteAsync } from 'expo-file-system'
import { Assessment } from '../types'
import { getAssessement } from '../clients/pronunciation'
import useMicrophone from './useMicrophone'

export default (language: string, reference: string) => {
  const { toggleRecording, startRecording, stopRecording, isRecording, recording } = useMicrophone()
  const [isAssessing, setIsLoading] = useState(false)
  const [hasFailed, setIsAssessing] = useState(false)
  const [assessment, setAssessment] = useState<Assessment | undefined>(undefined)

  useEffect(() => {
    if (recording) {
      setIsAssessing(false)
      setIsLoading(true)
      assessSpeech(recording)
        .then(setAssessment)
        .catch(() => setIsAssessing(true))
        // .finally(() => deleteAsync(recording))
      setIsLoading(false)
    }
  }, [recording])

  console.log('isAssessing', isAssessing)
  console.log('isRecording', isRecording)

  const assessSpeech = async (recording: string) => {
    if (language && reference) {
      const audio = await readAsStringAsync(recording, { encoding: 'base64' })
      console.log(audio)
      console.log(recording)
      // return await getAssessement(language, reference, audio)
      return undefined
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
