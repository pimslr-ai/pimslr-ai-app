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

interface Recognition {
  transcript: string
  confidence: number
  words: Word[]
}

interface Result {
  alternatives: Recognition[]
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
