import axios from 'axios'

export const assessWithReference = async (
  language: string,
  reference: string,
  audio: any,
): Promise<AssessmentResult> => {
  const url = 'https://pimslrai.greffchandler.net/speech/assess/' + language
  const response = await axios.post<AssessmentResult>(url, { audio, reference })
  return response.data
}
