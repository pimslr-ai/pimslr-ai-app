import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [state, setState] = useState<{
    transcript?: RecognizeResponse
    isLoading: boolean
  }>({ isLoading: false })

  useEffect(() => {
    if (audioRecording) {
      setState({ isLoading: true })
      speechToText(audioRecording).finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audio = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const url = 'http://localhost:5102/speech/recognize/' + language
    const response = await axios.post<RecognizeResponse>(url, { audio })
    setState({ transcript: response.data, isLoading: false })
  }

  console.log(JSON.stringify(state, null, 2))

  return {
    startRecording,
    stopRecording,
    isRecording,
    isLoading: state.isLoading,
    audioTranscript: state.transcript,
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
