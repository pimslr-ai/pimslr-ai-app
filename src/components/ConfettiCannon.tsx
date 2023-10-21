import { Component, createRef } from 'react'
import Explosion from 'react-native-confetti-cannon'
import { Dimensions } from 'react-native'

const screen = Dimensions.get('screen')

class ConfettiCannon extends Component {
  private explosion = createRef<Explosion>()

  shoot = () => {
    this.explosion.current!.start()
  }

  render() {
    return (
      <Explosion
        ref={this.explosion}
        autoStart={false}
        count={200}
        fadeOut
        origin={{ x: screen.width / 2, y: -15 }}
      />
    )
  }
}

export default ConfettiCannon
