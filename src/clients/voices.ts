import axios from 'axios'
import { Voice } from '../types'

export const generateSpeech = async (language: string, text: string): Promise<Voice> => {
  const url = 'https://pimslrai.greffchandler.net/speech/generate/' + language
  const response = await axios.post<Voice>(url, { text, format: 'mp3' })
  return response.data
}
