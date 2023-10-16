import { View, Text, Button } from 'react-native'
import useSpeech from '../hooks/useSpeech'

export default () => {
  const { startRecording, stopRecording, audioTranscript, isRecording } = useSpeech('en-US')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ textAlign: 'center', fontSize: 20, paddingVertical: 20 }}>
        {isRecording ? 'Listening...' : audioTranscript ? audioTranscript : 'Waiting for input'}
      </Text>

      <View
        style={{ display: 'flex', paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}
      >
        <Button
          title={isRecording ? 'Stop recording' : 'Start recording'}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
    </View>
  )
}
