import { useEffect, useState } from 'react'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'

const file = require('../../assets/audio/1.m4a')

export default () => {
  const [state, setState] = useState<{
    isPlaying: boolean
    sound: Audio.Sound
    audioFile?: any
  }>({ isPlaying: false, sound: new Audio.Sound(), audioFile: file })

  useEffect(() => {
    Audio.requestPermissionsAsync()
    Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })

    state.sound.setOnPlaybackStatusUpdate(async status => {
      const success = status as AVPlaybackStatusSuccess

      if (success.didJustFinish) {
        await state.sound.unloadAsync()
        setState(prev => ({ ...prev, isPlaying: false }))
      }
    })
  }, [])

  const setAudio = (audioFile: any) => {
    setState(prev => ({ ...prev, audioFile }))
  }

  const playAudio = async () => {
    if (!state.isPlaying && state.audioFile) {
      await state.sound.loadAsync(file)
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

  return {
    playAudio,
    stopAudio,
    setAudio,
    isPlaying: state.isPlaying,
  }
}
