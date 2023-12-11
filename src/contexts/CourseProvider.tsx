import 'react-native-get-random-values'
import { createContext, useContext, PropsWithChildren, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Course, Level } from '../types'
import { getCompletion } from '../clients/inferences'
import { LEVEL_CRITERIA } from '../constants'
import { v4 as uuid } from 'uuid'
import { generateSpeech } from '../clients/voices'

interface CourseContextProps {
  status: GenerationStatus
  courses: Course[]
  get: (id: string) => Course
  update: (course: Course) => Promise<void>
  remove: (course: Course) => Promise<void>
  generate: (language: string, level: Level, topic: string) => Promise<Course>
}

interface GenerationStatus {
  isLoading: boolean
  stage?: {
    step: number
    count: number
    label: string
  }
}

const key = '@app:courses'

const CourseContext = createContext<CourseContextProps>(null as any)

export const useCourses = () => useContext(CourseContext)

export const CourseProvider = ({ children }: PropsWithChildren) => {
  const [status, setGenerationStatus] = useState<GenerationStatus>({ isLoading: false })
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    AsyncStorage.getItem(key).then(raw => {
      if (raw) {
        setCourses(JSON.parse(raw) as Course[])
      }
    })
  }, [])

  const update = async (course: Course) => {
    const filtered = courses.filter(c => c.id !== course.id)
    const updated = [...filtered, course]
    setCourses(updated)
    await AsyncStorage.setItem(key, JSON.stringify(updated))
  }

  const remove = async (course: Course) => {
    const updated = courses.filter(c => c.id !== course.id)
    setCourses(updated)
    await AsyncStorage.setItem(key, JSON.stringify(updated))
  }

  const get = (id: string) => {
    return courses.filter(c => c.id === id)[0]
  }

  const generate = async (language: string, level: Level, topic: string) => {
    console.log('Generating course...')
    setGenerationStatus({ stage: { step: 1, count: 1, label: 'Generating course...' }, isLoading: true })

    if (!language && !level && !topic) {
      throw Error('Course information incomplete.')
    }

    const prompt = `
          Given the following sentence complexity levels:
          ${LEVEL_CRITERIA}
    
          For someone learning ${language}, can you generate a list of 10 sentences no more than 6 words per sentence for each complexity levels alongside their english translation, related to the following topic:
          \`${topic}\`.
    
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
    course.id = uuid()
    course.currentLevel = level
    course.language = language

    const count = course[level].length

    for (let i = 0; i < count; i += 1) {
      console.log(`Generating ${i + 1} of ${count} voices...`)
      setGenerationStatus({ stage: { step: i + 1, count, label: `Generating voices...` }, isLoading: true })
      const sentence = course[level][i].sentence
      course[level][i].voice = await generateSpeech(course.language, sentence)
    }

    console.log('Course generated.')
    setGenerationStatus({ stage: undefined, isLoading: false })
    await update(course)
    return course
  }

  return (
    <CourseContext.Provider value={{ status, courses, get, update, remove, generate }}>
      {children}
    </CourseContext.Provider>
  )
}
