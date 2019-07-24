// interface is a keyword
export interface IVoteItem {
  _id: string;
  songName: string;
  artist: string;
  album: string;
  image?: string;
}

// using a ? makes the key available to be a optional property

export interface IPoll {
  _id: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  lastModifiedDateTime: string;
  createdDateTime: string;
  songIds: string[];
  songs: {
    _id: string;
    songName: string;
    album: string;
    artist: string;
  }[];
}
