import { DATA, TEST_COURSE } from '../constants'
import { useEffect, useState } from 'react'
import useStorage from './useStorage'

export const useCourses = (id?: any) => {
  const { get, set } = useStorage()
  const [courses, setCourses] = useState<Course[] | null>([TEST_COURSE])
  const [course, setCourse] = useState<Course | null>()

  useEffect(() => {
    get<Course[]>(DATA.COURSES).then(courses => {
      if (courses) {
        if (id) {
          setCourse(courses.filter(c => c.id === id)[0])
        } else {
          setCourses(courses)
        }
      }
    })
  }, [])

  const remove = (id: any) => {
    setCourses(courses => courses?.filter(c => c.id !== id)!)
  }

  const create = async (language: Langauge, scenario: Scenario) => {
    // TODO call ChatGPT for generating course
    // setCourses(courses => [...courses])
  }

  return { course, courses, get, remove, create }
}
