import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

interface PosterLoaderProps {
  count: number
}

export default function PosterLoader(props: PosterLoaderProps) {
  const { count = 1 } = props

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Grid container wrap='nowrap'>
        {Array.from(new Array(count)).map((item, index) => {
          return (
            <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
              <Skeleton sx={{ bgcolor: '#b0aea9' }} variant='rectangular' width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton sx={{ bgcolor: '#b0aea9' }} />
                <Skeleton sx={{ bgcolor: '#b0aea9' }} width='60%' />
              </Box>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}
