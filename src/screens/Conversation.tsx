import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation, useParams } from '.'

import SpeechBubble from '../components/SpeechBubble'
import SecondaryButton from '../components/SecondaryButton'

export default () => {
  const navigation = useNavigation()
  const { conversation } = useParams('conversation')
  const [revealedBubbleIndex, setRevealedBubbleIndex] = useState(0)
  const [currentConversation, _] = useState(parseConversation(conversation))

  const handleRevealNextBubble = () => {
    setRevealedBubbleIndex(prevIndex => Math.min(prevIndex + 1, currentConversation.length - 1))
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <SecondaryButton
          icon='close'
          onClick={() => navigation.navigate('startup')}
          containerStyle={{ transform: [{ scale: 1.4 }] }}
        />
      </View>

      <ScrollView>
        <View style={styles.conversation}>
          {currentConversation.map((s, index) => (
            <SpeechBubble
              key={s.order}
              {...s}
              isVisible={index <= revealedBubbleIndex}
              onReaction={handleRevealNextBubble}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    width: '100%',
    height: '100%',
  },
  conversation: {
    flexDirection: 'column',
    width: '100%',
    padding: 16,
    display: 'flex',
    gap: 16,
    paddingBottom: 100,
  },
  revealButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 16,
  },
})

const parseConversation = (originalConversation: Conversation) => {
  const language1Sentences = originalConversation.language1.filter(s => s.order % 2 === 1)
  const language2Sentences = originalConversation.language2.filter(s => s.order % 2 === 0)
  const result = []

  for (let i = 0; i < Math.max(language1Sentences.length, language2Sentences.length); i++) {
    if (language1Sentences[i]) {
      result.push(language1Sentences[i])
    }
    if (language2Sentences[i]) {
      result.push(language2Sentences[i])
    }
  }

  return result
}
