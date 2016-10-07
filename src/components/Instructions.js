import React from 'react'

import './Instructions.css'

export default function Instructions() {
  return (
    <section className="instructions">
      <h2>Game</h2>

      <p>The game consists of each player trying to guess what band and/or album a pixelated image belongs to. This is done in 10 rounds of images. For each round, all users will have 30 seconds to answer correctly. As seconds go by, the image will become less pixelated.</p>

      <h2>Points</h2>

      <p>For each correct band a user will receive <code>30 * time_remaining</code> points.</p>
      <p>For each correct album a user will receive <code>50 * time_remaining</code> points.</p>
      <p>For each <code>band_name - album_name</code> a user will receive <code>100 * time_remaining</code> points.</p>
    </section>
  )
}
