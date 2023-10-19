interface Course {
  id: any
  scenario: string
  sentences: Sentence[]
}

interface Sentence {
  id: any
  translation?: string
  original?: string
  audio?: string
}
