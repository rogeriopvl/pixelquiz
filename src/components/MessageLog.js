import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './MessageLog.css'

const MessageLog = React.createClass({
  propTypes: {
    messages: React.PropTypes.object
  },

  mixins: [PureRenderMixin],

  getStringCode: function (s) {
    var code = s.split('').map(function(c) {
      return c.charCodeAt(0)
    }).reduce(function(a, b) { return a + b})

    return code % 4
  },

  render: function () {
    if (this.messageLogEl) {
      setTimeout(() => {
        this.messageLogEl.scrollTop = 9999999
      })
    }

    var colors = ['orange', 'yellow', 'green', 'blue']
    return (
      <ul className="status-thread" ref={ (ref) => this.messageLogEl = ref }>
        { this.props.messages.map((msg, idx) => {
          var code = this.getStringCode(msg['playerName'])

          return <li key={ idx }>
            <p>
              <span className={'player clr-' + colors[code]}>{ msg['playerName'] }:</span>
              <span className="answer">{ msg['answer'] }</span>
            </p>
            <div className="answer-status"><span className="icon-dot clr-blue"></span></div>
          </li>
        }
        )}
      </ul>
    )
  }
})

export default MessageLog
