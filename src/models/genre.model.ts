export interface Genre {
  adult: boolean
  id: string
  title: string
  video: boolean
  poster_path: string
}

export const emptyGenre: Genre = {
  adult: false,
  id: '',
  title: '',
  video: false,
  poster_path: '',
}
