import axios from 'axios'
import { GetApiUrl } from './getAPI'

export const getVideo = async (movieId: string) => {
  const apiUrl = GetApiUrl(`movie/${movieId}/videos`, '')
  return axios.get(apiUrl).then((res) => {
    if (res.data.results.length === 0) return null
    return res.data.results[0].key
  })
}
