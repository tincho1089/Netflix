import React, { useEffect, useState } from 'react'
import './Front.scss'
import { FrontImages } from './Front+Helper'

const Front: React.FC = () => {
  // * States
  const [videoEnded, setVideoEnded] = useState(false)
  const [muted, setMuted] = useState(true)
  const [animation, setAnimation] = useState(false)

  // * Life Cycle
  useEffect(() => {
    setTimeout(() => {
      setAnimation(true)
    }, 5000)
    setTimeout(() => {
      setAnimation(false)
    }, 27000)
  }, [])

  return (
    <div className='front'>
      <div className='front-main'>
        <div className={`front-title ${animation ? 'active' : ''}`}>
          <img src={FrontImages.avatarLogo.src} className='front-title-img' alt={FrontImages.avatarLogo.alt} />
        </div>
        <div className={`front-description ${animation ? 'active' : ''}`}>
          <p>
            A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting
            the world he feels is his home.
          </p>
        </div>
      </div>
      <button className='front-button-play'>
        <img src={FrontImages.arrow.src} alt={FrontImages.arrow.alt} />
        <label>Play</label>
      </button>
      <button className='front-button-info'>
        <img src={FrontImages.info.src} className='white' alt={FrontImages.arrow.alt} />
        More info
      </button>
      {videoEnded ? (
        <img className='front-poster' src={FrontImages.avatarBack.src} alt={FrontImages.avatarBack.alt} />
      ) : (
        <video autoPlay muted={muted} src='/video/Avatar.mp4' onEnded={(e: any) => setVideoEnded(e.target.ended)}>
          Sorry, your browser doesnt support embedded videos.
        </video>
      )}
      {videoEnded ? (
        <button className='front-button white' onClick={() => setVideoEnded(false)}>
          <img src={FrontImages.reload.src} alt={FrontImages.reload.alt} />
        </button>
      ) : (
        <button className='front-button' onClick={() => setMuted(!muted)}>
          <img src={muted ? FrontImages.mute.src : FrontImages.unmute.src} className='white' alt={FrontImages.mute.alt} />
        </button>
      )}
      <div className='front-clasif'>13+</div>
    </div>
  )
}

export default Front
