import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [state, setState] = useState<{
    transcript?: Alternative | null
    isLoading: boolean
    hasFailed?: boolean
  }>({ isLoading: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ transcript: null, isLoading: true })

      speechToText(audioRecording)
        .then(data => setState({ transcript: data, isLoading: false, hasFailed: data === null }))
        .finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audio = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const url = 'http://localhost:5102/speech/recognize/' + language
    const response = await axios.post<RecognizeResponse>(url, { audio })
    return response.data.results.length ? response.data.results[0]!.alternatives[0]! : null
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

interface Word {
  startTime: {
    seconds: number
    nanos: number
  }
  endTime: {
    seconds: number
    nanos: number
  }
  word: string
  confidence: number
  speakerTag: number
}

interface Alternative {
  transcript: string
  confidence: number
  words: Word[]
}

interface Result {
  alternatives: Alternative[]
  channelTag: number
  resultEndTime: {
    seconds: number
    nanos: number
  }
  languageCode: string
}

interface TotalBilledTime {
  seconds: number
  nanos: number
}

interface RecognizeResponse {
  results: Result[]
  totalBilledTime: TotalBilledTime
  speechAdaptationInfo: null
  requestId: number
}
