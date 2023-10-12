import { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'

export default () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [audioRecording, setAudioRecording] = useState<string | null>(null)

  useEffect(() => {
    Audio.requestPermissionsAsync()
  }, [])

  useEffect(() => {
    if (audioRecording) {
      console.log(audioRecording)
      FileSystem.deleteAsync(audioRecording)
    }
  }, [audioRecording])

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
    const uri = recording?.getURI()!
    setAudioRecording(uri)
    console.log(uri)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 20, paddingVertical: 20 }}>
        {recording ? 'Listening...' : 'Start listening.'}
      </Text>

      <View
        style={{ display: 'flex', paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}
      >
        <Button
          title={recording ? 'Stop recording' : 'Start recording'}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
    </View>
  )
}
