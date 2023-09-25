import { PropsWithChildren } from 'react'
import useAppFonts from '../hooks/use-app-fonts'

export default (props: PropsWithChildren) => {
  const { loaded } = useAppFonts()
  return loaded ? props.children : null
}
