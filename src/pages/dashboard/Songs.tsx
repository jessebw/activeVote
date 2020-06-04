import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import apiService from "../../services/apiService";
import { ISong, INewSong } from "../../interfaces";
import styled from "styled-components";
import { useGlobalState } from "../../state/stateContext";
import ReactGA from "react-ga";
import AvatarEditor from "react-avatar-editor";

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
  width: 50%;
  background-color: transparent;

  &:hover {
    color: #fff;
    background-color: #cb4335;
  }
`;

const SongSubmitButton = styled.button`
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

const SongsView = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* background-color: green; */
  :nth-child(even) {
    background: rgba(212, 230, 241, 0.5);
  }
`;

const EditSong = styled.button`
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  text-decoration: none;
  color: #5dade2;
  background-color: #fff;
  border: 2px solid #5dade2;
  margin-bottom: 5px;
  transition-duration: 0.4s;
  outline: 0;
  &:hover {
    color: #fff;
    background-color: #5dade2;
    /* border: 2px solid #fff; */
  }
`;

const DeleteSong = styled.button`
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  color: #ff5739;
  background-color: #fff;
  border: 2px solid #ff5739;
  transition-duration: 0.4s;
  outline: 0;
  &:hover {
    color: #fff;
    background-color: #ff5739;
    /* border: 2px solid #fff; */
  }
`;

const TrackData = styled.div`
  width: 50%;
`;

const SongImage = styled.div<{ imagePath: string }>`
  height: 50px;
  width: 50px;
  background-image: url(${(props) => props.imagePath});
  background-repeat: none;
  background-size: cover;
`;

const AddNewSongDropDown = (props: { finishCallBack: () => void }) => {
  const [imageSliderValue, setImageSliderValue] = useState<string>("1");

  const [formData, setFormData] = useState<INewSong>({
    artist: "",
    songName: "",
    album: "",
    image: undefined,
  });

  const changeImageFile = (e: any) => {
    const image = e.target.files[0];
    setFormData({ ...formData, image });
  };

  const imageRef = useRef();

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
        {formData.image && (
          <div>
            <AvatarEditor
              image={formData.image}
              width={500}
              height={500}
              border={50}
              scale={parseFloat(imageSliderValue)}
              ref={imageRef as any}
            />
            <input
              type="range"
              step=".25"
              min="1"
              max="5"
              value={imageSliderValue}
              className="slider"
              onChange={(e: ChangeEvent) => {
                setImageSliderValue((e.target as HTMLInputElement).value);
              }}
            ></input>
            {imageSliderValue}
          </div>
        )}

        <SongSubmitButton
          className="songSubmitButton"
          onClick={() => {
            ReactGA.event({
              category: "Admin",
              action: "Submitted a new song",
            });

            (imageRef!.current as any)
              .getImageScaledToCanvas()
              .toBlob((blob: Blob) => {
                const imageFile = new File([blob], "newFile.jpg");
                const _data = new FormData();
                _data.append("image", imageFile as File);
                apiService.uploadImage(_data as any).then((resp: any) => {
                  apiService
                    .addNewSong({ ...formData, image: resp[0].path })
                    .then(() => {
                      props.finishCallBack();
                    });
                });
              });
          }}
        >
          Submit
        </SongSubmitButton>
        <SongCancelButton
          className="songCancelButton"
          onClick={(e: any) => {
            ReactGA.event({
              category: "Admin",
              action: "Cancelled creating a new song",
            });
            props.finishCallBack();
          }}
        >
          Cancel
        </SongCancelButton>
      </div>
    </SongsFormDropDown>
  );
};

export const Songs = () => {
  const [songItems, setSongItems] = useState<ISong[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [globalState, dispatch] = useGlobalState();

  const getSongs = () => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(songs);
    });
  };
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    getSongs();
  }, []);

  const ImageURL = (song: ISong) => {
    return song.image;
  };

  return (
    <SongsView>
      <button
        onClick={(e: any) => {
          setIsVisible(true);
        }}
      >
        Add new song
      </button>
      {isVisible === true && (
        <AddNewSongDropDown
          finishCallBack={() => {
            setIsVisible(false);
            getSongs();
          }}
        />
      )}

      {songItems.map((song: ISong) => {
        return (
          <SongInfo key={song._id}>
            <TrackData>
              {song.artist} - {song.songName} - {song.album}
            </TrackData>
            <SongImage
              imagePath={`${globalState.config!.serverURL}/${song.image}`}
            ></SongImage>
            <div style={{ width: "30%", padding: "5px" }}>
              <EditSong>EDIT</EditSong>
              <DeleteSong
                className="delete-song"
                onClick={() => {
                  apiService.deleteSong(song._id).then(() => {
                    getSongs();
                  });
                }}
              >
                DELETE
              </DeleteSong>
            </div>
          </SongInfo>
        );
      })}
    </SongsView>
  );
};
