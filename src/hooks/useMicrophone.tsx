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
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    })
  }, [])

  const startRecording = async () => {
    if (!isRecording) {
      setIsRecording(true)
      const recorder = new Audio.Recording()
      await recorder.prepareToRecordAsync(recordingOptions)
      await recorder.startAsync()
      setRecorder(recorder)
    }
  }

  const stopRecording = async () => {
    if (isRecording && recorder) {
      setIsRecording(false)
      setTimeout(async () => {
        await recorder.stopAndUnloadAsync()
        setRecorder(undefined)
        setRecording(recorder.getURI())
      }, 500)
    }
  }

  const toggleRecording = async () => {
    setIsRecording(isRecording => {
      if (isRecording) {
        setRecorder(recorder => {
          setTimeout(() => {
            recorder?.stopAndUnloadAsync().then(() => {
              setRecording(recorder.getURI())
            })
          }, 500)
          return undefined
        })
      } else {
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
