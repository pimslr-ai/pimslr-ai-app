import { Text, TextProps, ColorValue } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

export interface GradientTextProps extends TextProps {
  colors?: ColorValue[]
}

export default (props: GradientTextProps) => {
  const gradient = props.colors && props.colors.length ? (props.colors as string[]) : ['black']

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}
