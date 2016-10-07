import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './AnswerBox.css'

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
      <form className='answer-box col-sm-16' onSubmit={ this.onSubmitHandler }>
        <input
          type='text'
          className='form-control'
          ref={ (ref) => this.answerInput = ref }
          placeholder='Insert you answer here then <enter>'
          autoFocus
        />
      </form>
    )
  }
})

export default AnswerBox
