import React from 'react'

// import './Instructions.css'

export default function Instructions () {
  return (
    <section className='game-info'>
      <div className='col-container'>
        <div className='col-left'>
          <div className='frame-rules'>
            <span className='icon-window' />
            <h3><span className='clr-red'>G</span><span className='clr-orange'>a</span><span className='clr-yellow'>m</span><span className='clr-green'>e</span></h3>
            <p>The game consists of each player trying to guess what band and/or album a pixelated image belongs to.</p>
            <p>This is done in 10 rounds of images.</p>
            <p>For each round, all users will have 30 seconds to answer correctly.</p>
            <p>For each round, all users will have 30 seconds to answer correctly.</p>
            <p>As seconds go by, the image will become less pixelated.</p>
          </div>
        </div>
        <div className='col-right'>
          <div className='frame-points'>
            <span className='icon-trophy' />
            <h3><span className='clr-red'>P</span><span className='clr-orange'>o</span><span className='clr-yellow'>i</span><span className='clr-green'>n</span><span className='clr-blue'>t</span><span className='clr-white'>s</span></h3>
            <p>For each correct band a user will receive <span className='clr-yellow'>30 * time_remaining</span> points.</p>
            <p>For each correct album a user will receive <span className='clr-green'>50 * time_remaining</span> points.</p>
            <p>For each band_name - album_name a user will receive <span className='clr-blue'>100 * time_remaining</span> points.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
