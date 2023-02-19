import { PosterLoader } from '@/components'
import { emptyGenre, Genre } from '@/models/genre.model'
import { GenreDictionary, GENRES, getGenre } from '@/services'
import React, { useEffect, useRef, useState } from 'react'
import { Poster } from '../Poster'
import { SliderMoves } from './Category+Helper'
import './Category.scss'

export interface CategoryInterface {
  genre: GENRES
}

const Category: React.FC<CategoryInterface> = (props) => {
  // * States
  const [data, setData] = useState<Genre[]>([emptyGenre])
  const [imgsPS, setImgsPS] = useState<number>(6)
  const [index, setIndex] = useState<number>(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // * Methods
  const GetData = async () => {
    try {
      const genre = await getGenre(GenreDictionary[props.genre].id)
      setData(genre)
    } catch (error) {
      console.error(error)
    }
  }

  const HandleClick = (move: SliderMoves) => {
    const slider = sliderRef.current
    const sliderIndex = Number(getComputedStyle(slider as Element).getPropertyValue('--slider-index'))
    if (move === SliderMoves.Right) {
      if (sliderIndex + 1 >= data.length / imgsPS) {
        slider?.style.setProperty('--slider-index', '0')
        setIndex(0)
      } else {
        slider?.style.setProperty('--slider-index', String(sliderIndex + 1))
        setIndex(sliderIndex + 1)
      }
    }
    if (move === SliderMoves.Left) {
      if (sliderIndex - 1 < 0) {
        slider?.style.setProperty('--slider-index', String(data.length / imgsPS - 1))
        setIndex(data.length / imgsPS - 1)
      } else {
        slider?.style.setProperty('--slider-index', String(sliderIndex - 1))
        setIndex(sliderIndex - 1)
      }
    }
  }

  const SetImgsState = () => {
    const slider = sliderRef?.current
    const imgs = Number(getComputedStyle(slider as Element).getPropertyValue('--imgs-per-screen'))
    setImgsPS(imgs)
  }

  useEffect(() => {
    GetData()
    SetImgsState()
    window.addEventListener('resize', SetImgsState)
    return () => window.removeEventListener('resize', SetImgsState)
  }, [])

  return (
    <div className='category'>
      <h3 className='category-title'>{GenreDictionary[props.genre].title}</h3>
      <div className='container'>
        <div className='handle handle-left' onClick={() => HandleClick(SliderMoves.Left)}>
          <div className='handle-symbol'>&#x2039;</div>
        </div>
        <div className='slider' ref={sliderRef}>
          {data ? (
            data.map((tvshow: Genre, i: number) => (
              <Poster
                showID={tvshow.id}
                poster={tvshow.poster_path}
                key={tvshow.id}
                zoom={i - imgsPS * index < imgsPS / 2 ? 'right' : 'left'}
              />
            ))
          ) : (
            <PosterLoader count={20} />
          )}
        </div>
        <div className='handle handle-right' onClick={() => HandleClick(SliderMoves.Right)}>
          <div className='handle-symbol'>&#x203A;</div>
        </div>
      </div>
    </div>
  )
}

export default Category
