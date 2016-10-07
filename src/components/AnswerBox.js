import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const AnswerBox = React.createClass({
  propTypes: {
    sendAnswer: React.PropTypes.func
  },

  mixins: [PureRenderMixin],

  onSubmitHandler: function (e) {
    e.preventDefault()
    this.props.sendAnswer(this.answerInput.value)
    this.answerInput.value = ''
  },

  render: function () {
    return (
      <form className="answer-box" onSubmit={ this.onSubmitHandler }>
        <input
          type="text"
          name="name"
          ref={ (ref) => this.answerInput = ref }
          placeholder="Insert your answer here then hit <Enter>"
          autoFocus />
      </form>
    )
  }
})

export default AnswerBox
