interface Course {
  id: any
  language: Langauge
  scenario: Scenario
  sentences: Sentence[]
}

interface Sentence {
  id: any
  translation?: string
  original?: string
  audio?: string
  completed?: boolean
  score?: number
}
