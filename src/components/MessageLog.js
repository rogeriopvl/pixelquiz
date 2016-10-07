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
      <ul className="status-thread" ref={ (ref) => this.messageLogEl = ref }>
        { this.props.messages.map((msg, idx) =>
          <li key={ idx }>
            <p> <span className="player clr-red">{ msg['playerName'] }:</span> <span className="answer">{ msg['answer'] }</span></p>
            <div className="answer-status"><span className="icon-dot clr-blue"></span></div>
          </li>
        )}
      </ul>
    )
  }
})

export default MessageLog
