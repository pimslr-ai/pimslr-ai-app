import React from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { FONTS } from '../constants'
import RNPickerSelect from 'react-native-picker-select'

interface DropdownProps {
  label: string
  items: { label: string; value: any }[]
  onSelection?: (value: any) => void
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
}

export default ({ onSelection, items, label, labelStyle, containerStyle }: DropdownProps) => {
  const labelStyle_: TextStyle = { ...styles.dropdownLabel, ...labelStyle }
  const containerStyle_: ViewStyle = { ...styles.dropdown, ...containerStyle }

  return (
    <RNPickerSelect
      placeholder={{ label, value: null }}
      style={{
        viewContainer: containerStyle_,
        placeholder: labelStyle_,
        inputIOS: labelStyle_,
        inputAndroid: labelStyle_,
      }}
      onValueChange={onSelection!}
      items={items}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    width: 200,
    borderRadius: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  dropdownLabel: {
    fontFamily: FONTS.POPPINS.MEDIUM,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
})
