import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import TemporizaMisto from './Timer';

import './GameStatus.css'

const GameStatus = React.createClass({
  propTypes: {},

  mixins: [PureRenderMixin],

  getStatus: function () {
    return this.props.gameStatus || 'Unknown'
  },

  render: function () {
    return (
      this.getStatus() === 'start_round'
      ? (<TemporizaMisto currentAlbum={this.props.currentAlbum} />)
      : null
    )
    // <span><b>Current Status:</b> { this.getStatus() }</span>
  }
})

export default GameStatus
