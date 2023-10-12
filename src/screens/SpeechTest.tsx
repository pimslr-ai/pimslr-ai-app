import { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { Audio } from 'expo-av'

export default () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null)

  useEffect(() => {
    Audio.requestPermissionsAsync()
  }, [])

  const startRecording = async () => {
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true })
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
    setRecording(recording)
  }

  const stopRecording = async () => {
    setRecording(null)
    await recording?.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
    const uri = recording?.getURI()
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
