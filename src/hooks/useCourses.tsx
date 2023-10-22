import { useEffect, useState } from 'react'
import useStorage from './useStorage'
import { DATA } from '../constants'

export default () => {
  const { get, set } = useStorage()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    get<Course[]>(DATA.COURSES).then(courses => setCourses(courses!))
  }, [])

  useEffect(() => {
    set(DATA.COURSES, courses)
  }, [courses])

  const remove = async (id: any) => {
    setCourses(courses => courses.filter(c => c.id !== id))
  }

  const create = async (scenario: Scenario) => {
    // call ChatGPT for generating course
    const course: Course = {
      id: 'course:' + 1,
      scenario,
      sentences: [] as Sentence[],
    }
    setCourses(courses => [...courses, course])
  }

  return { courses, remove, create }
}
