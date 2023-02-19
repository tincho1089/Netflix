import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import './Loader.scss'

export default function Loader() {
  return (
    <Box sx={{ width: 300 }} className='loader'>
      <Skeleton sx={{ bgcolor: '#b0aea9' }} />
      <Skeleton sx={{ bgcolor: '#b0aea9' }} />
      <Skeleton sx={{ bgcolor: '#b0aea9' }} />
    </Box>
  )
}
