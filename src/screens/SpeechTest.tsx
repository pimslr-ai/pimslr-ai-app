import { View, Text, Button } from 'react-native'
import useSpeech from '../hooks/useSpeech'

export default () => {
  const { startRecording, stopRecording, recognition, hasFailed, isRecording, isLoading } = useSpeech('en-US')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ textAlign: 'center', fontSize: 20, paddingVertical: 20 }}>
        {isRecording
          ? 'Listening...'
          : isLoading
          ? 'Loading...'
          : hasFailed
          ? 'Recognition failed.'
          : recognition
          ? recognition.transcript
          : 'Waiting for input'}
      </Text>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          title={isRecording ? 'Stop recording' : 'Start recording'}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
    </View>
  )
}
