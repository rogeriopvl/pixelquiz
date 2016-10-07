import React from 'react'

const Timer = React.createClass({
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({ forceUpdateLol: Math.random() })
    }, 1000)
  },
  componentWillUpdate(nextProps, nextState) {
    const nextAlbum = nextProps && nextProps.currentAlbum
    const currentAlbum = this.props && this.props.currentAlbum
    if (nextAlbum !== currentAlbum || !currentAlbum) {
      this.setState({ start: Date.now() })
    }
  },
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  render() {
    const timeDiff = ((Date.now() - (this.state && this.state.start)) / 1000) /* NaN-killer */ | 0
    const tMinusThirty = timeDiff < 30 ? 30 - timeDiff : 0
    const number = ('00' + tMinusThirty).substr(-2)
    console.log('start',this.state && this.state.start, 'timediff', timeDiff, 'number', number)
    return (
      <div>
        {number}
      </div>
    )
  }
})

export default Timer

