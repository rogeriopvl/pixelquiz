'use strict'

var events = require('events')
var co = require('co')

// Lol no I like this name
events.EventEmitter.prototype.off = events.EventEmitter.prototype.removeListener

var timeSleep = function (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

var ROUND_DURATION = 30 * 1000

var defaultDate = Date
var allPlayers

module.exports = function makeGame (players, quiz, sleep, dateObj) {
  allPlayers = players
  sleep = sleep || timeSleep  // unpacking didn't work with the lint
  dateObj = dateObj || defaultDate
  var game = new events.EventEmitter()  // The game emits events

  var gameWasTerminated = false

  game.start = function () {
    co(function * () {
      try {
        var totalScores = new Array(allPlayers.length)  // playerIdx: score
        for (let i = 0; i < allPlayers.length; i++) {
          totalScores[i] = 0
        }
        game.emit('scores', totalScores)
        game.emit('start_game')
        for (let i = 0; i < quiz.length; i++) {
          game.emit('start_round', quiz[i])
          var unlisten = module.exports.collectAnswers(allPlayers, { dateObj })
          var onAnswer = function (answer) {
            game.emit('answer', answer, answer[1])
          }
          unlisten.on('answer', onAnswer)

          // Either everyone answered, or 30 seconds have passed, whichever comes first
          yield Promise.race([
            sleep(ROUND_DURATION),
            new Promise(function (resolve) {
              unlisten.on('all-answered', function () {
                setTimeout(resolve, 3 * 1000)
              })
            }),
            new Promise(function (resolve) {
              game.on('-terminated', resolve)
            })
          ])

          var answers = unlisten()
          var scores = answers.map(function (answersFromThisPlayer, playerIdx) {
            if (answersFromThisPlayer == null ||
                answersFromThisPlayer.length === 0) {
              var score = 0
            } else {
              var score = Math.max.apply(Math, answersFromThisPlayer.map(function (ans) {
                if (ans === null) { return 0 }

                return module.exports.scoreAnswer({
                  answer: ans[0],
                  correctArtist: quiz[i].artist,
                  correctTitle: quiz[i].title,
                  delay: ans[2]
                })
              }))
            }

            if (totalScores[playerIdx] == null) {
              totalScores[playerIdx] = 0
            }
            totalScores[playerIdx] += score

            return totalScores[playerIdx]
          })
          game.emit('scores', scores)
          game.emit('end_round')
          if (gameWasTerminated) {
            break
          }
        }
        game.emit('end_game')
      } catch (e) {
        console.error(e)
      }
    })
  }

  game.end = function () {
    gameWasTerminated = true
    game.emit('-terminated')  // Internal event
  }

  game.setPlayers = function (players) {
    allPlayers = players
  }
  return game
}

module.exports.collectAnswers = function (players, opt) {
  var dateObj = opt.dateObj || defaultDate
  var startTime = dateObj.now()
  var answers = players.map(function () { return undefined })

  var unlisteners = players.map(function (player, playerIdx) {
    function onAnswer (answer) {
      if (!answers[playerIdx]) {
        answers[playerIdx] = []
      }
      var thisAnswer = [
        answer, playerIdx, dateObj.now() - startTime
      ]
      answers[playerIdx].push(thisAnswer)
      unlisten.emit('answer', thisAnswer)
      if (answers.every(function (ans) { return ans !== undefined })) {
        unlisten.emit('all-answered')
      }
    }
    player.on('answer', onAnswer)
    return function () { player.off('answer', onAnswer) }
  })
  function unlisten () {
    unlisteners.forEach(Function.prototype.call.bind(Function.prototype.call))
    return answers
  }
  var ee = new events.EventEmitter()
  unlisten.on = ee.on.bind(ee)
  unlisten.off = ee.off.bind(ee)
  unlisten.emit = ee.emit.bind(ee)
  return unlisten
}

// For each correct band a user will receive `30 * time_remaining` points.
// For each correct album a user will receive `50 * time_remaining` points.
// For each `band_name - album_name` a user will receive `100 * time_remaining` points.
module.exports.scoreAnswer = function (options) {
  var answer = options.answer
  var correctArtist = options.correctArtist
  var correctTitle = options.correctTitle
  var delay = options.delay

  console.log('trimmin', answer)
  answer = answer.trim().toLowerCase()
  correctArtist = correctArtist.trim().toLowerCase()
  correctTitle = correctTitle.trim().toLowerCase()

  var artistIsCorrect = false
  var titleIsCorrect = false
  if (!/-/.test(answer)) {
    if (correctArtist === answer) {
      artistIsCorrect = true
    } else if (correctTitle === answer) {
      titleIsCorrect = true
    }
  } else {
    var res = answer.split(/\s*-\s*/)
    artistIsCorrect = res[0] === correctArtist
    titleIsCorrect = res[1] === correctTitle
  }

  var secondsRemaining = Math.round(((30 * 1000) - delay) / 1000)

  switch (artistIsCorrect + '+' + titleIsCorrect) {
    case 'true+true':
      return secondsRemaining * 100
    case 'true+false':
      return secondsRemaining * 30
    case 'false+true':
      return secondsRemaining * 50
    case 'false+false':
      return secondsRemaining * 0  // too bad sir
  }
}

