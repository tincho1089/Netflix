import { Navbar } from '@/components'
import './Home.scss'
import { Catalogue, Footer, Front } from './sections'

function Home() {
  return (
    <div className='home'>
      <Navbar />
      <Front />
      <Catalogue />
      <Footer />
    </div>
  )
}

export default Home
