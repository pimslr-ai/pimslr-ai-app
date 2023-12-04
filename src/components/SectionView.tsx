import { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FONTS, THEME } from '../constants'
import Button from './Button'
import { useNavigation } from '../screens'

interface SectionViewProps extends PropsWithChildren {
  name?: string
  extra?: string
  extraRedirection?: string
}

export default ({ name, extra, extraRedirection, children }: SectionViewProps) => {
  const navigation = useNavigation()

  const handleRedirection = () => {
    console.log('press...')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.header, { justifyContent: extra ? 'space-between' : 'flex-start' }]}>
          <Text style={styles.headerName}>{name ?? 'Section'}</Text>
          <Button
            labelFirst
            label={extra}
            labelStyle={{ color: THEME.CTA, fontSize: 12, fontFamily: FONTS.POPPINS.MEDIUM }}
            onClick={handleRedirection}
          />
        </View>

        <View>{children}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingVertical: 32,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
  },
  headerName: {
    marginLeft: 16,
    fontSize: 20,
    fontFamily: FONTS.POPPINS.SEMI_BOLD,
    color: THEME.COLOR_ALT,
  },
})
