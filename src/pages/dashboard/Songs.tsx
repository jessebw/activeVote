import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { ISong, INewSong } from "../../interfaces";
import { FormModal } from "../../components/StyledComponents";

const AddNewSongModal = (props: { finishCallBack: () => void }) => {
  const [formData, setFormData] = useState<INewSong>({
    artist: "",
    songName: "",
    album: "",
    image: ""
  });

  return (
    <FormModal>
      <div>
        <input
          type="text"
          placeholder="Artist"
          onChange={(event: any) => {
            setFormData({ ...formData, artist: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Title"
          onChange={(event: any) => {
            setFormData({ ...formData, songName: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Album"
          onChange={(event: any) => {
            setFormData({ ...formData, album: event.target.value });
          }}
        />
        <button
          onClick={() => {
            console.log(formData);
            apiService.addNewSong(formData).then(() => {
              props.finishCallBack();
            });
          }}
        >
          submit
        </button>
      </div>
    </FormModal>
  );
};

export const Songs = () => {
  const [songItems, setSongItems] = useState<ISong[]>([]);
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const getSongs = () => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(songs);
    });
  };
  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div>
      <h3>Select Song</h3>
      <button
        onClick={(e: any) => {
          setFormModalOpen(true);
        }}
      >
        add new song
      </button>
      {formModalOpen === true && (
        <AddNewSongModal
          finishCallBack={() => {
            setFormModalOpen(false);
            getSongs();
          }}
        />
      )}

      {songItems.map((song: ISong) => {
        return (
          <div key={song._id}>
            <hr />
            <p>
              {song.artist} - {song.songName} - {song.album}
            </p>
            <button
              onClick={() => {
                apiService.deleteSong(song._id).then(() => {
                  console.log("getSongs");
                  getSongs();
                });
              }}
            >
              X
            </button>
            {/* <p>{song.songName}</p>
            <p>{song.album}</p> */}
          </div>
        );
      })}
    </div>
  );
};
