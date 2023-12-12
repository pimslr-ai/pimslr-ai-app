import { useState } from 'react'
import { getCompletion } from '../clients/inferences'
import { LEVEL_CRITERIA } from '../constants'

export default () => {
  const [topic, setTopic] = useState<string | undefined>()
  const [language2, setLanguage2] = useState<string | undefined>()
  const [language1, setLanguage1] = useState<string | undefined>()
  const [conversation, setConversation] = useState<Conversation>()

  const generateConversation = async () => {
    console.log('Generating conversation...')

    if (language1 === undefined || language2 === undefined || topic === undefined) {
      throw Error('Cannot generate conversation. Missing either `language1`, `language2`, and `topic`')
    }

    const prompt = `
        Two people are having a conversation on the topic of \`${topic}\`.
        Can you generate 10 sentences for this conversation with simple sentences. The conversation should be in ${language1} and translated into ${language2}.

        Please return a \`Conversation\` object given the following typescript interfaces:

        interface Conversation {
            language1: Sentence[]
            language2: Sentence[]
        }
        
        interface Sentence {
            order: number
            sentence: string
            language: string
        }`

    const conversation = await getCompletion<Conversation>(prompt)

    console.log('Course generated.')
    setConversation(conversation)
  }

  return { setLanguage1, setLanguage2, setTopic, generateConversation, conversation }
}
