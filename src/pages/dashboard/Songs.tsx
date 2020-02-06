import React, { useEffect, useState, ChangeEvent } from "react";
import apiService from "../../services/apiService";
import { ISong, INewSong } from "../../interfaces";
// import { FormModal } from "../../components/StyledComponents";
import styled from "styled-components";

const DeleteSong = styled.span`
  cursor: pointer;
  /* top: 0;
  right: 0; */
  /* padding: 12px 16px; */
  /* transform: translate(0%, -50%); */
  margin: 0px 10px;
  float: right;
  .delete-song {
  }
  &:hover {
    color: red;
  }
`;

const FormInput = styled.input`
  width: 100%;
  transition: 0.3s all;
  background-color: rgba(255, 255, 255, 1);
  padding: 12px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #000;
  text-align: left;
  &:hover {
    /* color: #fff; */
    background-color: rgba(238, 238, 238, 1);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
  &:focus {
    outline: 0;
    background-color: #fff;
  }
`;

const SongsFormDropDown = styled.div`
  padding: 0;
`;

const SongCancelButton = styled.button`
  /* margin-left: 5px;
  padding: 5px; */
  width: 50%;
  background-color: transparent;

  &:hover {
    color: #fff;
    background-color: #cb4335;
  }
`;

const SongSubmitButton = styled.button`
  /* margin-left: 5px;
  margin-right: 5px;
  padding: 5px; */
  width: 50%;
  background-color: rgba(93, 173, 226, 1);
  color: #fff;
  &:hover {
    color: #fff;
    background-color: rgba(33, 97, 140, 1);
  }
  .songSubmitButton {
  }
`;

const SongInfo = styled.span``;

const SongsView = styled.div`
  width: 60%;
  margin: 0 auto;
`;

export const Songs = () => {
  const [songItems, setSongItems] = useState<ISong[]>([]);
  const [formDropDownOpen, setFormDropDownOpen] = useState<boolean>(false);

  const AddNewSongDropDown = (props: { finishCallBack: () => void }) => {
    const [formData, setFormData] = useState<INewSong>({
      artist: "",
      songName: "",
      album: "",
      image: undefined
    });

    const changeImageFile = (e: any) => {
      const image = e.target.files[0];
      setFormData({ ...formData, image });
    };

    return (
      <SongsFormDropDown>
        <div>
          <FormInput
            type="text"
            placeholder="Artist"
            required
            onChange={(event: any) => {
              setFormData({ ...formData, artist: event.target.value });
            }}
          />
          <FormInput
            type="text"
            placeholder="Title"
            onChange={(event: any) => {
              setFormData({ ...formData, songName: event.target.value });
            }}
          />
          <FormInput
            type="text"
            placeholder="Album"
            onChange={(event: any) => {
              setFormData({ ...formData, album: event.target.value });
            }}
          />
          <input type="file" onChange={changeImageFile} />

          <SongSubmitButton
            className="songSubmitButton"
            onClick={() => {
              console.log("HITTING API", formData);
              const _data = new FormData();
              _data.append("image", formData.image as Blob);
              apiService.uploadImage(_data as any).then((resp: any) => {
                apiService
                  .addNewSong({ ...formData, image: resp[0].path })
                  .then(() => {
                    props.finishCallBack();
                  });
              });
            }}
          >
            Submit
          </SongSubmitButton>
          {/* <span>/</span> */}
          <SongCancelButton
            className="songCancelButton"
            onClick={(e: any) => {
              setFormDropDownOpen(false);
            }}
          >
            Cancel
          </SongCancelButton>
        </div>
      </SongsFormDropDown>
    );
  };

  const getSongs = () => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(songs);
    });
  };
  useEffect(() => {
    getSongs();
  }, []);

  return (
    <SongsView>
      <h3>Select Song</h3>
      <button
        onClick={(e: any) => {
          setFormDropDownOpen(true);
        }}
      >
        Add new song
      </button>
      {formDropDownOpen === true && (
        <AddNewSongDropDown
          finishCallBack={() => {
            setFormDropDownOpen(false);
            getSongs();
          }}
        />
      )}

      {songItems.map((song: ISong) => {
        return (
          <SongInfo key={song._id}>
            <hr />
            {song.artist} - {song.songName} - {song.album}
            <DeleteSong
              className="delete-song"
              onClick={() => {
                apiService.deleteSong(song._id).then(() => {
                  getSongs();
                });
              }}
            >
              x
            </DeleteSong>
            {/* <p>{song.songName}</p>
            <p>{song.album}</p> */}
          </SongInfo>
        );
      })}
    </SongsView>
  );
};
