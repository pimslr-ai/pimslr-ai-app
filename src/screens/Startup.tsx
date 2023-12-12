import { FONTS, LANGUAGES, THEME } from '../constants'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import useConversation from '../hooks/useConversation'
import InteractionInput from '../components/InteractionInput'
import { useEffect } from 'react'
import { useNavigation } from '.'

export default () => {
  const navigation = useNavigation()
  const { setLanguage1, setLanguage2, setTopic, generateConversation, conversation } = useConversation()

  useEffect(() => {
    if (conversation) {
      navigation.navigate('conversation', { conversation })
    }
  }, [conversation])

  return (
    <View style={styles.body}>
      <View style={styles.inputs}>
        <Text style={styles.title}>Learning Companion</Text>

        {/* <Text style={styles.subtitle}>
          Get paired with someone learning a language another is native speaking through conversation.
        </Text>
        <Text style={styles.subtitle}>
          The first native speaker select a language he is learning. Likewise with the second native speaker.
        </Text>
        <Text style={styles.subtitle}>
          Follow along the conversation and assess other's speaking by reacting with emojis.
        </Text> */}

        <Text style={styles.subtitle}>
          Get paired with a native speaker and get assess on your pronunciation thru emojis.
        </Text>

        <InteractionInput onChange={setTopic} placeholder='Enter a topic of conversation' />
        <RNPickerSelect
          placeholder={{ label: 'Select first language', value: null }}
          style={{
            viewContainer: styles.dropdown,
            placeholder: styles.dropdownLabel,
            inputIOS: styles.dropdownLabel,
          }}
          onValueChange={setLanguage1}
          items={LANGUAGES.map(code => ({ label: code, value: code }))}
        />
        <RNPickerSelect
          placeholder={{ label: 'Select second language', value: null }}
          style={{
            viewContainer: styles.dropdown,
            placeholder: styles.dropdownLabel,
            inputIOS: styles.dropdownLabel,
          }}
          onValueChange={setLanguage2}
          items={LANGUAGES.map(code => ({ label: code, value: code }))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generateConversation}>
        <Text style={styles.buttonLabel}>Generate Conversation</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  dropdown: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
  },
  dropdownLabel: {
    textAlign: 'center',
    color: 'black',
    fontFamily: FONTS.POPPINS.REGULAR,
    fontSize: 16,
  },
  inputs: {
    display: 'flex',
    gap: 16,
    width: '80%',
  },
  title: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginBottom: 16,
  },
  header: {
    display: 'flex',
    gap: 16,
  },
  button: {
    backgroundColor: THEME.CTA,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  buttonLabel: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
})
