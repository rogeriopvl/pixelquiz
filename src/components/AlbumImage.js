import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './AlbumImage.css'

const AlbumImage = React.createClass({
  propTypes: {},

  mixins: [PureRenderMixin],

  // 8bit module is not supported by webpack (because it starts with a number
  // so fuck it well do it here, like Trogdor would!
  generatePixels: function (canvas, image, scale) {
    scale *= 0.01

    canvas.width = image.width
    canvas.height = image.height

    var scaledW = canvas.width * scale
    var scaledH = canvas.height * scale

    var ctx = canvas.getContext('2d')

    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(image, 0, 0, scaledW, scaledH)
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, image.width, image.height)
  },

  componentWillMount: function () {
    if (!this.state) {
      this.state = {}
    }
  },

  componentWillUpdate: function (props) {
    if (this.props.url === props.url ||
        props.url == null) { return }
    var img = this.state.img = document.createElement('img')
    img.src = props.url
    img.crossOrigin = 'Anonymous'  // If an image doesn't have CORS I can't toDataURL
    this.state.ready = false
    img.addEventListener('load', () => {
      var pixelate = (howPixelated) => {
        if (img !== this.state.img) { return }
        var canvas = document.createElement('canvas')
        this.generatePixels(canvas, img, howPixelated)
        try {
          var url = canvas.toDataURL()
          this.setState({ url })
        } catch (e) {
          console.error(e)
        }
      }
      var endTime = Date.now() + (30 * 1000)
      // var startTime = Date.now()
      var pixelizeMore = () => {
        if (Date.now() >= endTime) { return }
        if (img !== this.state.img) { return }
        // Value from 1 to 0 where 1 is no time passed and 0 is the end of the time limit
        var howPixelated = 1 - ((endTime - Date.now()) / (30 * 1000))
        // Do a quadratic curve (makes album appear more slowly)
        howPixelated = Math.pow(howPixelated, 2)
        // Turn this 1..0 value to 100..0 and round it.
        howPixelated = Math.round(howPixelated * 100)
        // Clamp the value between 2 and 100
        howPixelated = Math.min(Math.max(0, howPixelated), 100)
        pixelate(howPixelated)
        setTimeout(pixelizeMore, 1000)
      }
      pixelizeMore()
    })
  },

  render: function () {
    if (!this.state.url) {
      return <div className='image-container'></div>
    }
    return (
      <div className="image-container">
        <img src={this.state.url} />
      </div>
    )
  }
})

export default AlbumImage
