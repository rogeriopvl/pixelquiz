import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import GameStatus from './GameStatus'
import Instructions from './Instructions'
import AlbumImage from './AlbumImage'
import MessageLog from './MessageLog'
import AnswerBox from './AnswerBox'
import ScoreBoard from './ScoreBoard'
import { setPlayerName, sendAnswer } from '../actions'

import '../../public/style.css'

const App = React.createClass({
  propTypes: {
    messages: React.PropTypes.object,
    currentAlbum: React.PropTypes.object,
    status: React.PropTypes.string,
    playerName: React.PropTypes.string,
    scores: React.PropTypes.object
  },

  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div>
        <header>
          <h1 className='logo'>
            <span className='clr-red'>P</span>
            <span className='clr-orange'>i</span>
            <span className='clr-yellow'>x</span>
            <span className='clr-green'>e</span>
            <span className='clr-blue'>l</span>
            <span className='clr-white'>quiz</span>
          </h1>
        </header>
        { (() => {
          if (this.props.playerName.length < 1) {
            return <div>
              <RegisterForm setPlayerName={this.props.setPlayerName} />
              <Instructions />
            </div>
          } else {
            return <div className='game-area'>
              <GameStatus gameStatus={this.props.gameStatus} />
              <div className='row'>
                <AlbumImage url={this.props.currentAlbum.get('imageUrl')} />
                <MessageLog messages={this.props.messages} />
              </div>
              <div className='row'>
                <AnswerBox sendAnswer={this.props.sendAnswer} />
              </div>
              <div className='row'>
                <ScoreBoard scores={this.props.scores} />
              </div>
            </div>
          }
        })() }
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    currentAlbum: state.get('currentAlbum'),
    messages: state.get('messages'),
    gameStatus: state.get('gameStatus'),
    playerName: state.get('playerName'),
    scores: state.get('scores')
  }
}

export default connect(mapStateToProps, { setPlayerName, sendAnswer })(App)
