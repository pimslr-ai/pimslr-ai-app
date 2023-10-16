import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export default () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [audioRecording, setAudioRecording] = useState<string | null>(null)

  useEffect(() => {
    Audio.requestPermissionsAsync()
  }, [])

  const startRecording = async () => {
    setAudioRecording(null)
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
    setRecording(recording)
  }

  const stopRecording = async () => {
    setRecording(null)
    await recording?.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    const uri = recording?.getURI()
    setAudioRecording(uri!)
  }

  return { startRecording, stopRecording, audioRecording, isRecording: recording !== null }
}
