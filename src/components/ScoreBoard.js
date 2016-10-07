import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './ScoreBoard.css'

const ScoreBoard = React.createClass({
  propTypes: {
    scores: React.PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  getScores: function () {
    return this.props.scores || []
  },

  render: function () {
    return (
      <div className='score-board'>
        <h4>Ranking</h4>
        <ul>
          { this.getScores().map((score, idx) =>
            <li key={ idx }><b>{ score.get('name') }:</b> { score.get('score') }</li>
          )}
        </ul>
      </div>
    )
  }
})

export default ScoreBoard
