import React from 'react'
import { connect } from 'react-redux'

const Timer = React.createClass({
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({ forceUpdateLol: Math.random() })
    }, 1000)
  },
  componentWillUpdate(nextProps, nextState) {
    const started = Boolean(this.state && this.state.start)
    if (nextProps && nextProps.currentAlbum !== this.props && this.props.currentAlbum || !started || ((this.state && this.state.forceUpdateLol) !== nextState.forceUpdateLol)) {
      this.setState({ start: Date.now() })
    }
  },
  render() {
    const timeDiff = ((Date.now() - (this.state && this.state.start)) / 1000) /* NaN-killer */ | 0
    const number = ('00' + timeDiff).substr(-2)
    console.log('start',this.state.start, 'timediff', timeDiff, 'number', number)
    return (
      <div>
        {number}
      </div>
    )
  }
})

export default Timer

