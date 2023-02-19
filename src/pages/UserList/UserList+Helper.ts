export type IconDTO = {
  src: string
  alt: string
}

export interface Profile {
  id: string
  name: string
  icon: IconDTO
}
