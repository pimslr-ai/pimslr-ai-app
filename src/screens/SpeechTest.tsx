import { View, Text, Button } from 'react-native'
import useSpeech from '../hooks/useSpeech'

export default () => {
  const { startRecording, stopRecording, recognition, hasFailed, isRecording, isLoading } = useSpeech('en-US')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white' }}>
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 20 }}>
        {isRecording
          ? 'Listening...'
          : isLoading
          ? 'Loading...'
          : hasFailed
          ? 'Recognition failed.'
          : recognition
          ? `${recognition.transcript} (${Math.ceil(recognition.confidence * 100) / 100}) \n\n` +
            recognition.words.map(w => `${w.word} (${Math.ceil(w.confidence * 100) / 100})`).join(' ')
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
