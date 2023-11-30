import axios from 'axios'

interface Response {
  model: string
  choices: {
    message: {
      content: string
    }
  }[]
}

export const getCompletion = async <T>(prompt: string): Promise<T> => {
  const form = new FormData()
  form.append('prompt', prompt)
  const url = 'https://pimslrai.greffchandler.net/infer/prompt?asJson=true'
  const response = await axios.post<Response>(url, form)
  return JSON.parse(response.data.choices![0].message.content) as T
}