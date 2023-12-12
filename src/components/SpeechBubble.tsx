import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FONTS, THEME } from '../constants'

interface SpeechBubbleProps {
  order: number
  sentence: string
  language: string
  isVisible?: boolean
  onReaction?: (reaction: string) => void
}

export default ({ order, sentence, isVisible = true, onReaction }: SpeechBubbleProps) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)

  const handleReactionPress = (reaction: string) => {
    setSelectedReaction(reaction)
    if (onReaction) {
      onReaction(reaction)
    }
  }

  const reactions = ['🤩', '🐌', '🤨', '🤢', '🤖']

  return isVisible ? (
    <View style={bubble(order).container}>
      <Text style={bubble(order).text}>{sentence}</Text>
      <View style={styles.reactionButtons}>
        {selectedReaction === null && (
          <View style={styles.reactions}>
            {reactions.map((reaction, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleReactionPress(reaction)}
                style={styles.reactionButton}
              >
                <Text>{reaction}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {selectedReaction && <Text style={styles.selectedReaction}>{selectedReaction}</Text>}
      </View>
    </View>
  ) : null
}

const bubble = (order: number) =>
  StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 16,
      borderBottomStartRadius: order % 2 ? 16 : 0,
      borderBottomEndRadius: order % 2 ? 0 : 16,
      overflow: 'hidden',
      backgroundColor: order % 2 ? THEME.CTA : THEME.CTA_ALT,
      textAlign: order % 2 ? 'left' : 'right',
      alignItems: order % 2 ? 'flex-end' : 'flex-start',
      alignSelf: order % 2 ? 'flex-end' : 'flex-start',
      maxWidth: '75%',
    },
    text: {
      fontSize: 16,
      fontFamily: FONTS.POPPINS.REGULAR,
      color: order % 2 ? 'white' : THEME.COLOR,
    },
  })

const styles = StyleSheet.create({
  reactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reactionButton: {
    backgroundColor: 'transparent',
    padding: 5,
    transform: [{ scale: 1.5 }],
  },
  selectedReaction: {
    backgroundColor: 'transparent',
    padding: 5,
    transform: [{ scale: 1.5 }],
  },
  reactions: {
    display: 'flex',
    flexDirection: 'row',
  },
})
