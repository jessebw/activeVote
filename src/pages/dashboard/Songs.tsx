import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { ISong } from "../../interfaces";

export const Songs = () => {
  const [songItems, setSongItems] = useState<ISong[]>([]);

  useEffect(() => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(songs);
    });
  }, []);

  return (
    <div>
      <h3>Select Song</h3>
      {songItems.map((song: ISong) => {
        return (
          <div key={song._id}>
            <hr />
            <p>{song.artist}</p>
            <p>{song.songName}</p>
            <p>{song.album}</p>
          </div>
        );
      })}
    </div>
  );
};
