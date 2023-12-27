import { useEffect, useRef, useState } from 'react'
import { AVPlaybackStatusSuccess, Audio } from 'expo-av'
import { cacheDirectory, writeAsStringAsync } from 'expo-file-system'

export default () => {
  const sound = useRef(new Audio.Sound()).current
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    Audio.requestPermissionsAsync().then(() => {
      Audio.setAudioModeAsync({
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

  const loadSound = async (base64: string) => {
    console.log('Loading sound...')
    setIsPlaying(false)
    setIsLoading(true)
    const temporaryFile = `${cacheDirectory}_voice.mp3`
    await writeAsStringAsync(temporaryFile, base64, { encoding: 'base64' })
    await sound.unloadAsync()
    await sound.loadAsync({ uri: temporaryFile })
    setIsLoading(false)
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
    if (isPlaying) {
      console.log('Stopping sound...')
      setIsPlaying(false)
      await sound.stopAsync()
    } else {
      console.log('Playing sound...')
      setIsPlaying(true)
      await sound.replayAsync()
    }
  }

  // const toggleSound = async () => {
  //   setIsPlaying(isPlaying => {
  //     if (isPlaying) {
  //       console.log('Stopping sound...')
  //       sound.stopAsync()
  //     } else {
  //       console.log('Playing sound...')
  //       sound.replayAsync()
  //     }
  //     return !isPlaying
  //   })
  // }

  return {
    loadSound,
    toggleSound,
    playSound,
    stopSound,
    isPlaying,
    isLoading,
  }
}
