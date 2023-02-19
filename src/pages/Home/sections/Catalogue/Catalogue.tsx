import { Category } from '@/pages'
import { GENRES } from '@/services/getGenre'
import './Catalogue.scss'

const Catalogue: React.FC = () => {
  const genresArr = [GENRES.Comedy, GENRES.Drama, GENRES.Animation, GENRES.Documentary, GENRES.Family, GENRES.Animation]

  return (
    <div className='catalogue'>
      <div className='catalogue-main'>
        {genresArr.map((genre, key) => (
          <Category genre={genre} key={key} />
        ))}
      </div>
    </div>
  )
}

export default Catalogue
