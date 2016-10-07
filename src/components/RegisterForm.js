import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './RegisterForm.css'

const RegisterForm = React.createClass({
  propTypes: {
    setPlayerName: React.PropTypes.func
  },

  mixins: [PureRenderMixin],

  onSubmitHandler: function (e) {
    e.preventDefault()
    this.props.setPlayerName(this.playerNameInput.value)
  },

  render: function () {
    return (
      <div className='register-form'>
        <h4>Please insert your nick name to play:</h4>
        <form onSubmit={ this.onSubmitHandler }>
          <input type='text'
            ref={ (ref) => this.playerNameInput = ref }
            placeholder='Insert nick name' />
          <button>Play</button>
        </form>
      </div>
    )
  }
})

export default RegisterForm
