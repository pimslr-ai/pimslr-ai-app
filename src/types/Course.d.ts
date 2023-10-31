interface Course {
  id: any
  language: Langauge
  scenario: Scenario
  sentences: Sentence[]
  createdAt: Date
  lastModified?: Date
}

interface Sentence {
  id: any
  translation: string
  original: string
  audio: any
  completed: boolean
  score?: number
}
