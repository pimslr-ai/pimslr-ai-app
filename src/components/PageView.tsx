import React, { useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

export interface PageViewProps extends PropsWithChildren {
  enabledUserInputs?: boolean
  startingPageIndex?: number
  pageIndex: number
  onPageChange?: (pageNumber: number) => void
}

export default (props: PageViewProps) => {
  const { pageIndex, enabledUserInputs, startingPageIndex, children, onPageChange } = props
  const pageCount = React.Children.count(children)

  // const [pageIndex, setPageIndex] = useState<number>(startingPageIndex ?? 0)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * screen.width,
      animated: true,
    })

    onPageChange && onPageChange(pageIndex + 1)
  }, [props, pageIndex])

  // const turnNext = () => {
  //   if (pageIndex + 1 < pageCount) {
  //     setPageIndex(prev => prev + 1)
  //   }
  // }

  // const turnPrevious = () => {
  //   if (pageIndex > 0) {
  //     setPageIndex(prev => prev - 1)
  //   }
  // }

  // const turnToPage = (index: number) => {
  //   if (index >= 0 && index + 1 <= pageCount) {
  //     setPageIndex(index)
  //   }
  // }

  return (
    <ScrollView scrollEnabled={enabledUserInputs ?? false} horizontal ref={scrollViewRef}>
      {React.Children.map(children, (child, index) => (
        <View key={index} style={{ width: screen.width }}>
          {child}
        </View>
      ))}
    </ScrollView>
  )
}
