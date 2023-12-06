import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { RecordingOptions, AndroidOutputFormat, IOSOutputFormat } from 'expo-av/build/Audio'

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
  const [state, setState] = useState<{
    recording?: Audio.Recording
    uri?: string
  }>({})

  useEffect(() => {
    Audio.requestPermissionsAsync()
  }, [])

  const startRecording = async () => {
    if (!state.recording) {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
      const { recording } = await Audio.Recording.createAsync(recordingOptions)
      setState({ recording, uri: undefined })
    }
  }

  const stopRecording = async () => {
    if (state.recording) {
      await state.recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
      const uri = state.recording?.getURI()!
      setState({ uri, recording: undefined })
    }
  }

  return {
    startRecording,
    stopRecording,
    audioRecording: state.uri,
    isRecording: !!state.recording,
  }
}
