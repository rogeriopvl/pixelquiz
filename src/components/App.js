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
        <section className="main-holder">
          <div className="main-container">
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
                return (
                  <div>
                    <section className="game-play">
                      <div className="col-container">
                        <div className="col-left min">
                          <div className="frame-stage">
                            <GameStatus
                              gameStatus={this.props.gameStatus}
                              currentAlbum={this.props.currentAlbum}
                            />
                            <AlbumImage url={this.props.currentAlbum.get('imageUrl')} />
                          </div>
                        </div>
                        <div className="col-right max">
                          <div className="frame-statusboard">
                            <div className="player-name">
                              <p>Player: <span>{this.props.playerName}</span></p>
                            </div>
                            <span className="icon-message"></span>
                            <MessageLog messages={this.props.messages} />
                          </div>
                        </div>
                      </div>
                      <div className="answer-form-container">
                        <h4>Hurry up!! Try to guess quickly to receive more points!</h4>
                        <AnswerBox sendAnswer={this.props.sendAnswer} />
                      </div>
                    </section>
                  </div>
                  // <div className='game-area'>
                  //   <GameStatus
                  //     gameStatus={this.props.gameStatus}
                  //     currentAlbum={this.props.currentAlbum}
                  //   />
                  //   <div className='row'>
                  //     <AlbumImage url={this.props.currentAlbum.get('imageUrl')} />
                  //     <MessageLog messages={this.props.messages} />
                  //   </div>
                  //   <div className='row'>
                  //     <AnswerBox sendAnswer={this.props.sendAnswer} />
                  //   </div>
                  //   <div className='row'>
                  //     <ScoreBoard scores={this.props.scores} />
                  //   </div>
                  // </div>
                )
              }
            })() }
          </div>
        </section>
        {(() => {
          if (this.props.playerName.length > 1) {
            return (
              <section className="results-holder">
                <div className="main-container">
                  <div className="col-container">
                    <div className="col-full">
                      <div className="frame-score-results">
                        <span className="icon-trophy"></span>
                        <h3><span className="clr-red">R</span><span className="clr-orange">a</span><span className="clr-yellow">n</span><span className="clr-green">k</span><span className="clr-blue">i</span><span className="clr-grey">n</span><span className="clr-white">g</span></h3>
                        <ScoreBoard scores={this.props.scores} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
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
