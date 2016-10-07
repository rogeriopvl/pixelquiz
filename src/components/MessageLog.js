import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './MessageLog.css'

const MessageLog = React.createClass({
  propTypes: {
    messages: React.PropTypes.object
  },

  mixins: [PureRenderMixin],

  render: function () {
    if (this.messageLogEl) {
      setTimeout(() => {
        this.messageLogEl.scrollTop = 9999999
      })
    }
    return (
      <div className='message-log col-sm-6'
        ref={ (ref) => this.messageLogEl = ref }>
        { this.props.messages.map((msg, idx) =>
          <p key={ idx }><b>{ msg['playerName'] }:</b> { msg['answer'] }</p>
        )}
      </div>
    )
  }
})

export default MessageLog
