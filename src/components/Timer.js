import React from 'react'
import { connect } from 'react-redux'

const Timer = React.createClass({
  componentWillMount() {
    this.timer = setInterval(() => {
      
    }, 1000)
  },
  componentWillUpdate(nextProps) {
    const started = Boolean(this.state && this.state.start)
    if (nextProps && nextProps.currentAlbum !== this.props && this.props.currentAlbum || !started) {
      this.state.start = Date.now()
    }
  },
  render() {
    const timeDiff = ((Date.now() - (this.state && this.state.start)) / 1000) /* NaN-killer */ | 0
    const number = ('00' + timeDiff).substr(-2)
    return (
      <div>
        {number}
      </div>
    )
  }
})

export default Timer

