interface Conversation {
  language1: Sentence[]
  language2: Sentence[]
}

interface Sentence {
  order: number
  sentence: string
  language: string
}
