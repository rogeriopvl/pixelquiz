import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// import './RegisterForm.css'

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
      <div className='register-form-container'>
        <h4>Insert your nick name to play</h4>
        <form className='register-form' onSubmit={this.onSubmitHandler}>
          <input type='text'
            ref={(ref) => (this.playerNameInput = ref)}
            maxLength={20}
            placeholder='Insert nick name' />
          <a onClick={this.onSubmitHandler} href='#' type='submit' name='button' className='rf-btn'>
            <span className='icon-play' /><span className='play'>Play</span>
          </a>
        </form>
      </div>
    )
  }
})

export default RegisterForm
