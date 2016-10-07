// load json with 150 top albums from nme website
var json = require('../cache/nmeAlbums.json')

module.exports = {
  getRandomAlbum: function () {
    return json[Math.floor(Math.random() * json.length)]
  }
}
