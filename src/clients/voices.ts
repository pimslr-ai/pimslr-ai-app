import axios from 'axios'
import { Audio } from '../types'

export const generateSpeech = async (language: string, text: string): Promise<Audio> => {
  const url = 'https://pimslrai.greffchandler.net/speech/generate/' + language
  const response = await axios.post<Audio>(url, { text, format: 'mp3' })
  return response.data
}
