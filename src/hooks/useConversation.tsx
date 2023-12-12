import { useState } from 'react'
import { getCompletion } from '../clients/inferences'
import { LEVEL_CRITERIA } from '../constants'

const data = {
  language1: [
    { language: 'en-US', order: 1, sentence: 'I like to go fishing at the lake.' },
    { language: 'en-US', order: 2, sentence: 'I use a fishing rod and bait to catch fish.' },
    { language: 'en-US', order: 3, sentence: 'Sometimes I catch big fish.' },
    { language: 'en-US', order: 4, sentence: 'I enjoy spending time outdoors near the water.' },
    { language: 'en-US', order: 5, sentence: 'I usually fish with my friends or family.' },
    { language: 'en-US', order: 6, sentence: 'We pack snacks and drinks for our fishing trips.' },
    { language: 'en-US', order: 7, sentence: 'I think fishing is a relaxing and enjoyable activity.' },
    { language: 'en-US', order: 8, sentence: 'I have learned to be patient while waiting for a bite.' },
    { language: 'en-US', order: 9, sentence: "I sometimes catch small fish, but it's still fun." },
    {
      language: 'en-US',
      order: 10,
      sentence: 'I like to release the fish back into the water after catching them.',
    },
  ],
  language2: [
    { language: 'fr-FR', order: 1, sentence: "J'aime aller pêcher au lac." },
    {
      language: 'fr-FR',
      order: 2,
      sentence: "J'utilise une canne à pêche et de l'appât pour attraper des poissons.",
    },
    { language: 'fr-FR', order: 3, sentence: "Parfois, j'attrape de gros poissons." },
    { language: 'fr-FR', order: 4, sentence: "J'apprécie passer du temps en plein air près de l'eau." },
    { language: 'fr-FR', order: 5, sentence: 'Je pêche habituellement avec mes amis ou ma famille.' },
    {
      language: 'fr-FR',
      order: 6,
      sentence: 'Nous emportons des collations et des boissons pour nos sorties de pêche.',
    },
    {
      language: 'fr-FR',
      order: 7,
      sentence: 'Je pense que la pêche est une activité relaxante et agréable.',
    },
    { language: 'fr-FR', order: 8, sentence: "J'ai appris à être patient en attendant que ça morde." },
    {
      language: 'fr-FR',
      order: 9,
      sentence: "Parfois, j'attrape de petits poissons, mais c'est toujours amusant.",
    },
    {
      language: 'fr-FR',
      order: 10,
      sentence: "J'aime relâcher les poissons dans l'eau après les avoir attrapés.",
    },
  ],
}

export default () => {
  const [topic, setTopic] = useState<string | undefined>()
  const [language2, setLanguage2] = useState<string | undefined>()
  const [language1, setLanguage1] = useState<string | undefined>()
  const [conversation, setConversation] = useState<Conversation>(data)

  const generateConversation = async () => {
    console.log('Generating conversation...')

    if (language1 === undefined || language2 === undefined || topic === undefined) {
      throw Error('Cannot generate conversation. Missing either `language1`, `language2`, and `topic`')
    }

    const prompt = `
        Given the following sentence complexity levels:
        ${LEVEL_CRITERIA}

        Two people are having a conversation on the topic of \`${topic}\`.
        Can you generate 10 sentences for this conversation of Level 1 complexity. The conversation should be in ${language1} and translated into ${language2}.

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
