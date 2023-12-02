import React, { PropsWithChildren, Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

export interface HorizontalPageViewRef {
  turnTo: (index: number) => void
  pageCount: number
}

export interface HorizontalPageView extends PropsWithChildren {
  disableScroll?: boolean
  onPageTurn?: (index: number) => void
}

const Page = (
  { disableScroll, onPageTurn, children }: HorizontalPageView,
  ref: Ref<HorizontalPageViewRef>,
) => {
  const scrollViewRef = useRef<ScrollView>(null)

  useImperativeHandle(
    ref,
    () => ({
      turnTo,
      pageCount: React.Children.count(children),
    }),
    [children],
  )

  const turnTo = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      })
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (onPageTurn) {
      const offsetX = event.nativeEvent.contentOffset.x
      const currentIndex = Math.round(offsetX / width)
      onPageTurn(currentIndex)
    }
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      snapToInterval={width}
      decelerationRate='fast'
      overScrollMode='never'
      scrollEnabled={disableScroll}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
    >
      {children}
    </ScrollView>
  )
}

export default forwardRef<HorizontalPageViewRef, HorizontalPageView>(Page)
