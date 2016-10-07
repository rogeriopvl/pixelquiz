import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './GameStatus.css'

const GameStatus = React.createClass({
  propTypes: {},

  mixins: [PureRenderMixin],

  getStatus: function () {
    return this.props.gameStatus || 'Unknown'
  },

  render: function () {
    return (
      <div className='game-status'>
        <span><b>Current Status:</b> { this.getStatus() }</span>
      </div>
    )
  }
})

export default GameStatus
