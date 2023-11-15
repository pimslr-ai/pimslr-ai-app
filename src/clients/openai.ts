import axios, { AxiosError } from 'axios'

const apiKey = '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'
const baseURL = 'https://api.openai.com/v1/chat/completions'

interface UserMessage {
  role: string
  content: string
}

interface ChatCompletionResponse {
  choices: [{ message: { content: string } }]
}

export async function getCompletion(
  prompt: string,
  model: string = 'gpt-3.5-turbo-1106',
  temperature: number = 0,
): Promise<string | null> {
  const body = {
    model: model,
    messages: [{ role: 'user', content: prompt }],
  }
  const messages: UserMessage[] = [{ role: 'user', content: prompt }]

  try {
    const response = await axios.post<ChatCompletionResponse>(
      baseURL,
      {
        messages,
        model,
        temperature,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
    return response.data.choices[0].message.content
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.log(axiosError.message, axiosError.response!.data)
    }
  }
  return null
}
