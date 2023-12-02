import { TouchableOpacity, Text } from 'react-native'
import { useState } from 'react'
import { styles } from '../styles'

export default ({
  label,
  onToggleOn,
  onToggleOff,
}: {
  label: string
  onToggleOn?: (label: string) => void
  onToggleOff?: (label: string) => void
}) => {
  const [toggle, setToggled] = useState<boolean>()

  const style = toggle
    ? {
        ...styles.tag,
        ...styles.tagActive,
      }
    : styles.tag

  const handleToggle = () => {
    if (toggle) {
      setToggled(false)
      onToggleOff!(label)
    } else {
      setToggled(true)
      onToggleOn!(label)
    }
  }

  return (
    <TouchableOpacity onPress={handleToggle}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  )
}
