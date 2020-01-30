// interface is a keyword
export interface IVoteItem {
  _id: string
  songName: string
  artist: string
  album: string
  image?: string
}

// using a ? makes the key available to be a optional property

export interface IPoll {
  _id: string
  name: string
  startDateTime: string
  endDateTime: string
  lastModifiedDateTime: string
  createdDateTime: string
  songIds: string[]
  songs: {
    _id: string
    songName: string
    album: string
    artist: string
  }[]
}

export interface IAuth {
  token: string
  expiresIn: number
  refreashToken: string
  refreashExpiresIn: string
}

export interface IGlobalState {
  auth?: IAuth
}
export type TStateAction = { type: string; payload: any }
export interface IReducer {
  (prevState: IGlobalState, action: any): IGlobalState
}

export interface IVote {
  _id: string
  songId: string
  pollId: string
  email: string
}

export interface ISong extends INewSong {
  _id: string
}

export interface INewSong {
  songName: string
  album: string
  artist: string
  image: string
}

export interface INewUser {
  email: string
  password: string
}
