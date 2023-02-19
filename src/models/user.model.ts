export interface UserInfo {
  jwtToken: string
  username: string
}

export interface User {
  username: string
  password: string
  name: string
}

export interface userToken {
  token: string
}

export interface Profile {
  id: string
  name: string
  icon: {
    src: string
    alt: string
  }
}
