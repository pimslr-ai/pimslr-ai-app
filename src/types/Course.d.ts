interface Course {
  id: any
  language: Langauge
  scenario: Scenario
  sentences: Sentence[]
}

interface Sentence {
  id: any
  translation: string
  original: string
  audio: any
  completed: boolean
  score?: number
}
