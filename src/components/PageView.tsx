import React, { Component, PropsWithChildren, createRef, useCallback } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

interface PageViewProps extends PropsWithChildren {
  enabledUserInputs?: boolean
  startingPageIndex?: number
  onPageChange?: (pageNumber: number) => void
  onLastPage?: (pageNumber: number) => void
  onStartingPage?: (pageNumber: number) => void
}

class PageView extends Component<PageViewProps> {
  private scrollView = createRef<ScrollView>()

  state = {
    pageIndex: this.props.startingPageIndex ?? 0,
  }

  componentDidMount() {
    this.scrollToPage(this.state.pageIndex)
  }

  turnNext = () => {
    this.changePage(this.state.pageIndex + 1)
  }

  turnPrevious = () => {
    this.changePage(this.state.pageIndex - 1)
  }

  turnToPage = (index: number) => {
    this.changePage(index)
  }

  private changePage = (index: number) => {
    const { onPageChange } = this.props
    const pageCount = React.Children.count(this.props.children)

    if (index >= 0 && index < pageCount) {
      this.setState({ pageIndex: index }, () => {
        this.scrollToPage(index)
        onPageChange && onPageChange(index + 1)
      })
    }

    if (index == pageCount && this.props.onLastPage) {
      this.props.onLastPage(index + 1)
    } else if (index == this.props.startingPageIndex && this.props.onStartingPage) {
      this.props.onStartingPage(index + 1)
    }
  }

  private scrollToPage = (pageIndex: number) => {
    this.scrollView.current?.scrollTo({
      x: pageIndex * screen.width,
      animated: true,
    })
  }

  render() {
    const { enabledUserInputs, children } = this.props

    return (
      <ScrollView scrollEnabled={enabledUserInputs ?? false} horizontal ref={this.scrollView}>
        {React.Children.map(children, (child, index) => (
          <View key={index} style={{ width: screen.width }}>
            {child}
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default PageView
