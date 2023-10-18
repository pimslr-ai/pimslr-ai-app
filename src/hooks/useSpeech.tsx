import { useEffect, useState } from 'react'
import useMic from './useMic'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'

export default (language: string) => {
  const { startRecording, stopRecording, audioRecording, isRecording } = useMic()
  const [audioTranscript, setAudioTranscript] = useState<RecognizeResponse | null>(null)

  useEffect(() => {
    if (audioRecording) {
      speechToText(audioRecording).finally(() => FileSystem.deleteAsync(audioRecording!))
    }
  }, [audioRecording])

  const speechToText = async (audioFile: string) => {
    const audio = await FileSystem.readAsStringAsync(audioFile, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const url = 'http://localhost:5102/speech/recognize/' + language
    const response = await axios.post(url, { audio })
    setAudioTranscript(response.data)
  }

  console.log(JSON.stringify(audioTranscript, null, 2))

  return { startRecording, stopRecording, isRecording, audioTranscript }
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
