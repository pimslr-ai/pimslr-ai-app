import { useState, useEffect } from 'react'
import { Text, NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import GradientText, { GradientTextProps } from './GradientText'

export interface MultilineGradientTextProps extends GradientTextProps {}

export default (props: MultilineGradientTextProps) => {
  const [isLayoutComputed, setIsLayoutComputed] = useState(false)
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    setIsLayoutComputed(false)
  }, [props.children])

  const totalLength = lines.reduce((acc, line) => acc + line.length, 0)

  const processedLines = lines.map((line, i, lines) => {
    const startLength = lines.slice(0, i).reduce((acc, item) => acc + item.length, 0) / totalLength
    const stopLength = startLength + line.length / totalLength

    const startIndex = Math.floor(startLength * props?.colors?.length!)
    const stopIndex = Math.floor(stopLength * props?.colors?.length!)

    const colors_ = props?.colors?.slice(startIndex, stopIndex)

    return { line, colors: colors_ }
  })

  const handleTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = event.nativeEvent
    setLines(lines.map(line => line.text))
    setIsLayoutComputed(true)
  }

  return isLayoutComputed ? (
    <>
      {processedLines.map((line, i) => (
        <GradientText key={line.line} {...props} children={line.line} colors={line.colors} />
      ))}
    </>
  ) : (
    <Text onTextLayout={handleTextLayout} {...props} />
  )
}
