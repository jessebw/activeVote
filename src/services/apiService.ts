import httpService from './httpService'
import { INewSong, INewUser, IConfig } from '../interfaces'

class APIService {
  private config?: IConfig
  static getInstance () {
    if (!APIService.instance) {
      APIService.instance = new APIService()
    }
    return APIService.instance
  }

  setConfig (config: IConfig) {
    this.config = config
  }

  private static instance: APIService

  private constructor () {
    // default for all requests
  }

  getAllVotes () {
    return httpService.get(this.config!.serverURL + 'vote')
  }

  getCurrentPoll () {
    return httpService.get(this.config!.serverURL + '/currentpoll/')
  }

  getAllPolls () {
    return httpService.get(this.config!.serverURL + '/poll/')
  }

  getPollById (id: string) {
    return httpService.get(this.config!.serverURL + '/poll/' + id)
  }

  getAllSongs () {
    return httpService.get(this.config!.serverURL + '/song')
  }

  deleteSong (songId: string): any {
    return httpService.delete(this.config!.serverURL + '/' + songId)
  }

  addNewSong (song: INewSong) {
    return httpService.post(this.config!.serverURL + '/song', song)
  }

  postSubmitVote (email: string, songId: string, pollId: string) {
    return httpService.post(this.config!.serverURL + '/vote', {
      email: email,
      songId: songId,
      pollId: pollId
    })
  }
  addNewPoll (
    name: string,
    songIds: string[],
    startDateTime: string,
    endDateTime: string
  ) {
    return httpService.post(this.config!.serverURL + '/poll', {
      name: name,
      songIds: songIds,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    })
  }

  deletePoll (pollId: string) {
    return httpService.delete(`${this.config!.serverURL}/poll/${pollId}`)
  }

  editPoll (
    name: string,
    songIds: string[],
    startDateTime: string,
    endDateTime: string,
    pollId: string
  ) {
    return httpService.put(`${this.config!.serverURL}/poll/${pollId}`, {
      name: name,
      songIds: songIds,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    })
  }
  addNewUser (newUser: INewUser) {
    return httpService.post(`${this.config!.serverURL}/user`, newUser)
  }

  uploadImage (blob: Blob) {
    return httpService.postFormData(
      `${this.config!.serverURL}/album-art-upload`,
      blob
    )
  }
}

export default APIService.getInstance()
