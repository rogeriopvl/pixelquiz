import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import sortBy from 'lodash.sortby'

import './ScoreBoard.css'

const ScoreBoard = React.createClass({
  propTypes: {
    scores: React.PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  getScores: function () {
    return sortBy(this.props.scores && this.props.scores.toJS() || [], 'score')
  },

  render: function () {
    return (
      <ul className="results-list">
        { this.getScores().map((score, idx) => {
            var s = score.score ? score.score : 0

            return (
              <li key={idx}>
                <p>
                  <span className="player">{ score.name }</span>
                  <span className="score">{ s } points</span>
                </p>
                <div className="final-score">#{ idx + 1 }</div>
              </li>
            )
          }).slice(0).reverse()
        }
      </ul>
    )
  }
})

export default ScoreBoard
