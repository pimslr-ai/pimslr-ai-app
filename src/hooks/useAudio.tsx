import { useEffect, useRef, useState } from 'react'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'
import { cacheDirectory, writeAsStringAsync } from 'expo-file-system'

export default (base64: string) => {
  const sound = useRef(new Audio.Sound()).current
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    Audio.requestPermissionsAsync().then(() =>
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }),
    )

    sound.setOnPlaybackStatusUpdate(async status => {
      const success = status as AVPlaybackStatusSuccess
      setIsPlaying(success.isPlaying)
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
      await sound.setPositionAsync(0)
      await sound.playAsync()
    }
  }

  const stopSound = async () => {
    if (isPlaying) {
      await sound.stopAsync()
    }
  }

  const toggleSound = async () => {
    if (isPlaying) {
      await sound.stopAsync()
    } else {
      await sound.setPositionAsync(0)
      await sound.playAsync()
    }
  }

  return {
    toggleSound,
    playSound,
    stopSound,
    isPlaying,
  }
}
