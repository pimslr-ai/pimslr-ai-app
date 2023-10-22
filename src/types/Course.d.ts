interface Course extends Persistent, RecordKeeping {
  scenario: Scenario
  sentences: Sentence[]
}

interface Sentence extends Persistent {
  translation?: string
  original?: string
  audio?: string
  completed?: boolean
  score?: number
}
