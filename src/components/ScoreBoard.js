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
      <ul className="results-list">
        { this.getScores().map((score, idx) =>
          <li>
            <p>
              <span className="player">{ score.get('name') }</span>
              <span className="score">{ score.get('score') } points</span>
            </p>
            <div className="final-score">#{ idx }</div>
          </li>
        )}
      </ul>
    )
  }
})

export default ScoreBoard
