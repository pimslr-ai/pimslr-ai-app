import { useEffect, useState } from 'react'
import useStorage from './useStorage'
import { DATA } from '../constants'

export default () => {
  const { get, set } = useStorage()
  const [courses, setCourse] = useState<Course[]>([])

  useEffect(() => {
    get<Course[]>(DATA.COURSES).then(setCourse)
  }, [])

  useEffect(() => {
    set(DATA.COURSES, courses)
  }, [courses])

  const remove = async (id: any) => {
    courses.filter(c => c.id !== id)
  }

  const create = async (scenario: Scenario) => {
    const course: Course = {
      id: 'course:' + 1,
      scenario,
      sentences: [] as Sentence[],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    setCourse(course)
    set(course.id, course)
  }

  return { course, remove, create }
}

export const useCourse = (id?: string) => {
  const { get, set, remove: remove_ } = useStorage()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (id) {
      get<Course>(id).then(setCourse)
    }
  }, [id])

  const remove = async () => {
    await remove_(id!)
  }

  const create = async (scenario: Scenario) => {
    const course: Course = {
      id: 'course:' + 1,
      scenario,
      sentences: [] as Sentence[],
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    setCourse(course)
    set(course.id, course)
  }

  return { course, remove, create }
}
