import iconArrowDown from '@/assets/icons/iconArrowDown.png'
import iconPlay from '@/assets/icons/iconPlay.png'
import iconPlus from '@/assets/icons/iconPlusSimple.png'
import iconReload from '@/assets/icons/iconReload.png'
import iconThumb from '@/assets/icons/iconThumbUp.png'
import { YouTubeEmbed } from '@/components'
import { useHover } from '@/hooks'
import { getShow } from '@/services'
import { getVideo } from '@/services/getVideo'
import React, { useEffect, useState } from 'react'
import './Poster.scss'

interface PosterInterface {
  poster: string
  showID: string
  zoom: string
}

const Poster: React.FC<PosterInterface> = (props) => {
  // * States
  const [data, setData] = useState<{ number_of_seasons: string; genres: [{ name: string }] }>()
  const [videoKey, setVideoKey] = useState<string>('')
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [playVideo, setPlayVideo] = useState<boolean>(false)

  const imgUrl = 'https://image.tmdb.org/t/p/original/'
  const posterSrc = `${imgUrl}${props.poster}`

  // * Methods
  const GetData = async () => {
    try {
      const show = await getShow(props.showID)
      const videoId = await getVideo(props.showID)
      setData(show)
      setVideoKey(videoId)
    } catch (error) {
      console.error(error)
    }
  }
  const ClassManager = () => {
    if (isHovered) {
      return props.zoom === 'right' ? 'activeRight' : 'activeLeft'
    }
    return ''
  }

  // * Life Cycle
  useEffect(() => {
    if (isHovered && !data) {
      GetData()
    }
    return () => {
      setData(undefined)
      setPlayVideo(false)
    }
  }, [isHovered])

  return (
    <div className='poster-container' ref={hoverRef}>
      <div className={`poster-card ${ClassManager()}`}>
        {playVideo && data ? (
          <div className='wrapper'>
            <div className='frame-container'>
              <YouTubeEmbed embedId={videoKey} />
            </div>
          </div>
        ) : (
          <img className='poster-card-img' src={posterSrc} alt='tvshow' />
        )}
        {data ? (
          <div className='poster-card-info'>
            <div className='pc-icons'>
              <div className='pc-icons-menu'>
                <div className='pc-icon-play'>
                  <img
                    className='pc-icon-play-img'
                    alt='play'
                    src={playVideo ? iconReload : iconPlay}
                    onClick={() => setPlayVideo(!playVideo)}
                  />
                </div>
                <div className='pc-icon-default'>
                  <img className='pc-icon-default-img white' alt='add' src={iconPlus} />
                </div>
                <div className='pc-icon-default pc-thumb'>
                  <img className='pc-icon-default-img' alt='add' src={iconThumb} />
                </div>
              </div>
              <div className='pc-icon-default pc-arrow'>
                <img className='pc-icon-default-img' alt='add' src={iconArrowDown} />
              </div>
            </div>
            <div className='pc-seasons'>
              <div className='pc-seasons-match'>99% Match </div>
              <div className='pc-seasons-clasif'>13 +</div>
              <div className='pc-seasons-episodes'>
                {`${data.number_of_seasons} ${data.number_of_seasons == '1' ? 'Season' : 'Seasons'}`}
              </div>
              <div className='pc-seasons-quality'>HD</div>
            </div>
            <div className='pc-genres'>
              {data.genres.map((genre: { name: string }, i: number) => {
                if (i < 3)
                  return (
                    <div className='pc-genres-single' key={i}>
                      <div className='pc-genres-name'>{genre.name}</div>
                      <div className='pc-genre-divider' />
                    </div>
                  )
              })}
            </div>
          </div>
        ) : (
          <>
            <div className='loading-modal'></div>
            <div className='loading-text'>
              <h3>Loading Info...</h3>
            </div>
          </>
        )}
      </div>

      <img className='poster-img' src={posterSrc} alt='tvshow' />
    </div>
  )
}

export default Poster
