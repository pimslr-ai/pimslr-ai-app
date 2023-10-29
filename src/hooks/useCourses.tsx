import { DATA, TEST_COURSE } from '../constants'
import { useEffect, useState } from 'react'
import useStorage from './useStorage'

export default () => {
  const { get, set } = useStorage()
  const [courses, setCourses] = useState<Course[]>([TEST_COURSE])

  useEffect(() => {
    get<Course[]>(DATA.COURSES).then(courses => setCourses(courses!))
  }, [])

  useEffect(() => {
    if (courses) {
      set(DATA.COURSES, courses)
    }
  }, [courses])

  const remove = async (id: any) => {
    setCourses(courses => courses.filter(c => c.id !== id))
  }

  const create = async (language: Langauge, scenario: Scenario) => {
    // TODO call ChatGPT for generating course
    // setCourses(courses => [...courses])
  }

  return { courses, remove, create }
}
