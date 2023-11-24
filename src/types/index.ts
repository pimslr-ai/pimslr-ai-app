export type Level = 'beginning' | 'intermediate' | 'advanced'

export interface Course {
  title: string
  language: string
  currentLevel: Level
  beginning: Sentence[]
  intermediate: Sentence[]
  advanced: Sentence[]
}

export interface Sentence {
  sentence: string
  english: string
  level: Level
  audio?: Audio
  score?: Score
}

export interface Score {
  pronunciation: number
}

export interface Audio {
  voice: string
  audio: string
}
