import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const AnswerBox = React.createClass({
  propTypes: {
    sendAnswer: React.PropTypes.func,
    gameStatus: React.PropTypes.string
  },

  mixins: [PureRenderMixin],

  onSubmitHandler: function (e) {
    e.preventDefault()
    this.props.sendAnswer(this.answerInput.value)
    this.answerInput.value = ''
  },

  render: function () {
    var started = this.props.gameStatus === 'start_round'
    var text = started
      ? 'Hurry up! Try to guess quickly to receive more points!'
      : 'Waiting for another player...'
    var placeholder = started
      ? 'Insert your answer here then hit <Enter>'
      : ''

    return (
      <div>
        <h4>{text}</h4>
        <form className="answer-box" onSubmit={ this.onSubmitHandler }>
          <input
            disabled={!started}
            type="text"
            name="name"
            ref={ (ref) => this.answerInput = ref }
            placeholder={placeholder}
            autoFocus />
        </form>
      </div>
    )
  }
})

export default AnswerBox
