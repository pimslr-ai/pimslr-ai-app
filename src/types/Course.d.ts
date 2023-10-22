interface Course  {
  id: any
  scenario: Scenario
  sentences: Sentence[]
}

interface Sentence {
  translation?: string
  original?: string
  audio?: string
  completed?: boolean
  score?: number
}
