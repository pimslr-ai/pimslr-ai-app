import { useState } from 'react'
import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from 'expo-av'

const file = require('../../assets/audio/question1.m4a')

export default (input?: string) => {
  const [state, setState] = useState<{
    isLoading: boolean
    isPlaying: boolean
    sound: Audio.Sound
  }>({ isLoading: false, isPlaying: false, sound: new Audio.Sound() })

  const textToSpeech = (input: string) => {}

  const playAudio = async () => {
    console.log('trying to play...')
    if (!state.isPlaying) {
      await state.sound.loadAsync(file)
      state.sound.setOnPlaybackStatusUpdate(handleStatus)
      await state.sound.playAsync()
      setState(prev => ({ ...prev, isPlaying: true }))
    }
  }

  const stopAudio = async () => {
    if (state.isPlaying) {
      await state.sound.stopAsync()
      await state.sound.unloadAsync()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const handleStatus = async (status: AVPlaybackStatus) => {
    const success = status as AVPlaybackStatusSuccess

    if (success.didJustFinish) {
      await state.sound.unloadAsync()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  return { playAudio, stopAudio, isPlaying: state.isPlaying, isLoading: state.isLoading }
}
