interface Syllable {
  duration: number
  offset: number
  syllable: string
  grapheme: null | string
  accuracyScore: number
}

interface Phoneme {
  duration: number
  offset: number
  phoneme: string
  accuracyScore: number
  nBestPhonemes: null | string[]
}

interface Word {
  word: string
  accuracyScore: number
  errorType: string
  syllables: Syllable[]
  phonemes: Phoneme[]
}

interface AssessmentResult {
  accuracyScore: number
  pronunciationScore: number
  completenessScore: number
  fluencyScore: number
  prosodyScore: number
  contentAssessmentResult: null | string
  words: Word[]
}
