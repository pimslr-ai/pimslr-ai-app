import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { AndroidOutputFormat, IOSOutputFormat, RecordingOptions } from 'expo-av/build/Audio'

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
  const [recording, setRecording] = useState<Audio.Recording>()
  const [isRecording, setIsRecording] = useState(false)

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
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      setIsRecording(true)
    }
  }

  const stopRecording = async () => {
    if (isRecording) {
      setTimeout(async () => {
        await recording?.stopAndUnloadAsync()
        setRecording(undefined)
        setIsRecording(false)
      }, 500)
    }
  }

  const toggleRecording = async () => {
    if (!isRecording) {
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
      setIsRecording(true)
    } else {
      setTimeout(async () => {
        await recording?.stopAndUnloadAsync()
        setRecording(undefined)
        setIsRecording(false)
      }, 500)
    }
  }

  return {
    toggleRecording,
    startRecording,
    stopRecording,
    isRecording,
    recording: recording?.getURI(),
  }
}
