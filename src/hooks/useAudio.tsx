import { useEffect, useState } from 'react'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'

export default () => {
  const [state, setState] = useState<{
    isPlaying: boolean
    sound: Audio.Sound
  }>({ isPlaying: false, sound: new Audio.Sound() })

  useEffect(() => {
    Audio.requestPermissionsAsync()
    Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })

    state.sound.setOnPlaybackStatusUpdate(async status => {
      const success = status as AVPlaybackStatusSuccess

      if (success.didJustFinish) {
        setState(prev => ({ ...prev, isPlaying: false }))
      }
    })
  }, [])

  const playAudio = async (audioFile: any) => {
    if (state.isPlaying) {
      await state.sound.stopAsync()
    }
    await state.sound.unloadAsync()
    await state.sound.loadAsync(audioFile)
    await state.sound.setPositionAsync(0)
    await state.sound.playAsync()
    setState(prev => ({ ...prev, isPlaying: true }))
  }

  const stopAudio = async () => {
    if (state.isPlaying) {
      await state.sound.stopAsync()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  return {
    playAudio,
    stopAudio,
    isPlaying: state.isPlaying,
  }
}
