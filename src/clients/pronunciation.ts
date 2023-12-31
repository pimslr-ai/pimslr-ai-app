import axios from 'axios'
import { Assessment } from '../types'

export const assessAudio = async (
  language: string,
  reference: string,
  audio: string,
): Promise<Assessment> => {
  const url = 'https://pimslrai.greffchandler.net/speech/assess/' + language
  const response = await axios.post<Assessment>(url, { language, reference, audio })
  return response.data
}
