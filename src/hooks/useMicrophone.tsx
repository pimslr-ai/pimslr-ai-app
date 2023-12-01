import { useEffect, useState } from 'react'
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
      const { recording } = await Audio.Recording.createAsync(recordingOptions)
      setRecorder(recording)
      setIsRecording(true)
    }
  }

  const stopRecording = async () => {
    if (isRecording) {
      setTimeout(async () => {
        await recorder?.stopAndUnloadAsync()
        setRecorder(undefined)
        setIsRecording(false)
        setRecording(recorder?.getURI())
      }, 500)
    }
  }

  const toggleRecording = async () => {
    if (!isRecording) {
      await startRecording()
    } else {
      await stopRecording()
    }
  }

  return {
    toggleRecording,
    startRecording,
    stopRecording,
    isRecording,
    recording,
  }
}
