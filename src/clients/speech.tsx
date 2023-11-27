import axios from 'axios'

export const assessWithReference = async (language: string, reference: string, audio: any): Promise<AnimationPlaybackEventInit> => {
  const url = 'https://pimslrai.greffchandler.net/speech/assess/' + language
  return axios.post(url, { audio, reference })
}
