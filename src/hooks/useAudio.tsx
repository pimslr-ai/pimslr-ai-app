import { useEffect, useRef, useState } from 'react'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'
import { cacheDirectory, writeAsStringAsync } from 'expo-file-system'

export default (base64: string) => {
  const sound = useRef(new Audio.Sound()).current
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    Audio.requestPermissionsAsync().then(() => {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    })

    sound.setOnPlaybackStatusUpdate(async status => {
      const success = status as AVPlaybackStatusSuccess

      if (success.didJustFinish) {
        setIsPlaying(false)
      }
    })
  }, [])

  useEffect(() => {
    loadSound()
  }, [base64])

  const loadSound = async () => {
    const temporaryFile = `${cacheDirectory}_voice.m4a`
    await writeAsStringAsync(temporaryFile, base64, { encoding: 'base64' })
    await sound.loadAsync({ uri: temporaryFile })
  }

  const playSound = async () => {
    if (!isPlaying) {
      setIsPlaying(true)
      await sound.replayAsync()
    }
  }

  const stopSound = async () => {
    if (isPlaying) {
      setIsPlaying(false)
      await sound.stopAsync()
    }
  }

  const toggleSound = async () => {
    setIsPlaying(isPlaying => {
      if (isPlaying) {
        sound.stopAsync()
      } else {
        sound.replayAsync()
      }
      return !isPlaying
    })
  }

  return {
    toggleSound,
    playSound,
    stopSound,
    isPlaying,
  }
}
