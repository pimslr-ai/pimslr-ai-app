import React, { useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

interface PagesProps extends PropsWithChildren {
  vertical?: boolean
  userInputs?: boolean
  startingPageIndex?: number
  pageIndex?: number
}

export default (props: PagesProps) => {
  //   const scrollViewRef = useRef<ScrollView | null>(null)
  const [scrollViewRef, setRef] = useState<ScrollView | null>(null)

  useEffect(() => {
    handlePageTurn()
  }, [props, scrollViewRef])

  const handlePageTurn = () => {
    let { vertical, pageIndex } = props

    if (pageIndex && pageIndex < React.Children.count(props.children) && scrollViewRef != null) {
      const horizontal = !vertical ?? true

      scrollViewRef?.scrollTo({
        x: horizontal ? pageIndex * screen.width : 0,
        y: horizontal ? 0 : pageIndex * screen.height,
        animated: true,
      })
    }
  }

  return (
    <ScrollView
      scrollEnabled={props.userInputs ?? false}
      horizontal={props.vertical ?? true}
      ref={setRef}
      style={styles.container}
    >
      {React.Children.map(props.children, (child, index) => (
        <View key={index} style={styles.wrapper}>
          {child}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  wrapper: {
    width: screen.width,
  },
})
