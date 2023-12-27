import { useEffect, useRef, useState } from 'react'
import { AndroidOutputFormat, IOSOutputFormat, RecordingOptions } from 'expo-av/build/Audio'
import { Audio } from 'expo-av'

const recordingOptions: RecordingOptions = {
  ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
  android: {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
    extension: '.wav',
    outputFormat: AndroidOutputFormat.DEFAULT,
  },
  ios: {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
    extension: '.wav',
    outputFormat: IOSOutputFormat.LINEARPCM,
  },
}

export default () => {
  const [recorder, setRecorder] = useState<Audio.Recording>()
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState<string | null>()

  useEffect(() => {
    Audio.requestPermissionsAsync().then(() => {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
    })
  }, [])

  const startRecording = async () => {
    console.log('Recording...')
    if (!isRecording) {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      setIsRecording(true)
      const recorder = new Audio.Recording()
      await recorder.prepareToRecordAsync(recordingOptions)
      await recorder.startAsync()
      setRecorder(recorder)
    }
  }

  const stopRecording = async () => {
    if (isRecording && recorder) {
      console.log('Stopping recording...')
      setIsRecording(false)
      setTimeout(async () => {
        await recorder.stopAndUnloadAsync()
        setRecorder(undefined)
        setRecording(recorder.getURI())
      }, 500)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      })
    }
  }

  const toggleRecording = async () => {
    setIsRecording(isRecording => {
      if (isRecording) {
        console.log('Stopping recording...')
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        })
        setRecorder(recorder => {
          setTimeout(() => {
            recorder?.stopAndUnloadAsync().then(() => {
              setRecording(recorder.getURI())
            })
          }, 500)
          return undefined
        })
      } else {
        console.log('Starting recording...')
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        })
        setRecorder(_ => {
          const recorder = new Audio.Recording()
          recorder.prepareToRecordAsync(recordingOptions).then(() => {
            recorder.startAsync()
          })
          return recorder
        })
      }
      return !isRecording
    })
  }

  return {
    toggleRecording,
    startRecording,
    stopRecording,
    isRecording,
    recording,
  }
}
