import { LEVEL_CRITERIA } from '../constants'
import { getCompletion } from '../clients/inferences'
import { generateSpeech } from '../clients/voices'
import { Level, Course } from '../types'
import { useState } from 'react'

export default () => {
  const [status, setStatus] = useState<{ stage?: string; loading: boolean }>({ loading: false })
  const [course, setCourse] = useState<Course | null>(null)
  const [info, setInfo] = useState<{
    language?: string
    level?: Level
    topic?: string
  }>({})

  const generate = async () => {
    setStatus({ stage: 'Generating course...', loading: true })
    console.log('Generating course...')

    if (!info.language && !info.level && !info.topic) {
      throw Error('Course information incomplete: ' + JSON.stringify(info, null, 2))
    }

    const prompt = `
      Given the following sentence complexity levels:
      ${LEVEL_CRITERIA}
      
      For someone learning ${info.language}, can you generate a list of 10 sentences no more than 6 words per sentence for each complexity levels alongside their english translation, related to the following topic:
      \`${info.topic}\`.
      
      Could you provide a short title relating to the topic. 
      
      Please return a \`Course\` object given the following typescript interfaces:
      
      interface Course {
        title: string
        beginning: Sentence[]
        intermediate: Sentence[]
        advanced: Sentence[]
      }
        
      interface Sentence {
        sentence: string
        english: string
      }`

    const course = await getCompletion<Course>(prompt)
    course.currentLevel = info.level!
    course.language = info.language!

    const level = course.currentLevel.trim()
    // @ts-ignore
    for (let i = 0; i < course[level].length; i += 1) {
      // @ts-ignore
      setStatus({ stage: `Generating ${i + 1} of ${course[level].length} voices...`, loading: true })
      // @ts-ignore
      console.log(`Generating ${i + 1} of ${course[level].length} voices...`)
      // @ts-ignore
      const sentence = course[level][i].sentence
      // @ts-ignore
      course[level][i].audio = await generateSpeech(course.language, sentence)
    }

    console.log('Course generated.')
    setStatus({ stage: undefined, loading: false })
    setCourse(course)
  }

  return { info, setInfo, generate, status, course }
}
