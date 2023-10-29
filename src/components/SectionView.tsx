import { PropsWithChildren } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FONTS } from '../constants'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'

interface SectionViewProps extends PropsWithChildren {
  name?: string
  redirection?: string
  redirectionLabel?: string
  separation?: number
  rowDirection?: boolean
}

export default ({
  name,
  redirection,
  redirectionLabel,
  rowDirection,
  separation,
  children,
}: SectionViewProps) => {
  const navigation = useNavigation()

  const handleRedirection = () => {
    navigation.navigate(redirection as never)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { justifyContent: redirectionLabel ? 'space-between' : 'flex-start' }]}>
        <Text style={styles.headerName}>{name ?? 'Section'}</Text>
        {redirection && (
          <Button labelFirst label={redirectionLabel} icon='arrow-forward' onClick={handleRedirection} />
        )}
      </View>

      <View
        style={[
          {
            display: 'flex',
            flexDirection: rowDirection ? 'row' : 'column',
            gap: separation ?? 20,
            overflow: 'scroll',
            width: 'auto', // Set width to 'auto' to fit content
          },
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerName: {
    fontSize: 20,
    fontFamily: FONTS.POPPINS.SEMI_BOLD,
  },
})
