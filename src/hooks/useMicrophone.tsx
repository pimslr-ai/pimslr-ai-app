import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export default () => {
  const [state, setState] = useState<{
    recording?: Audio.Recording
    uri?: string
    amplitude?: number
  }>({})

  useEffect(() => {
    Audio.requestPermissionsAsync()
    Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: false })
  }, [])

  const startRecording = async () => {
    if (!state.recording) {
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      recording.setOnRecordingStatusUpdate(status => {
        setState(prev => ({ ...prev, amplitude: status.metering }))
      })
      setState({ recording, uri: undefined })
    }
  }

  const stopRecording = async () => {
    if (state.recording) {
      setState({ recording: undefined })
      await state.recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
      const uri = state.recording?.getURI()!
      setState({ uri })
    }
  }

  return {
    startRecording,
    stopRecording,
    audioRecording: state.uri,
    isRecording: !!state.recording,
    amplitude: state.amplitude,
  }
}
