import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import apiService from "../../services/apiService";
import { ISong, INewSong } from "../../interfaces";
import styled from "styled-components";
import { useGlobalState } from "../../state/stateContext";
import ReactGA from "react-ga";
import AvatarEditor from "react-avatar-editor";
import { LeftRight, RightLeft } from "../../components/StyledComponents";

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
  width: 100%;
  /* background-color: green; */
  :nth-child(even) {
    background: #d4e6f1;
  }
`;

const DeleteSong = styled.div`
  cursor: pointer;
  /* margin: 0px 10px;
  float: right;
  .delete-song {
  } */
  &:hover {
    color: red;
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

const SongDeleteButton = styled.div`
  width: 26px;
  height: 26px;
  /* position: absolute; */
  /* top: 23px;
  right: 23px; */
  margin: auto;
  cursor: pointer;
  border-radius: 50%;
  /* background-color: #d4e6f1; */
  :nth-child(1) {
    &:hover {
      background-color: white;
    }
  }
  :nth-child(2) {
    &:hover {
      background-color: #d4e6f1;
    }
  }
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
              width={250}
              height={250}
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
            <SongDeleteButton>
              <LeftRight />
              <RightLeft />
            </SongDeleteButton>
          </SongInfo>
        );
      })}
    </SongsView>
  );
};
