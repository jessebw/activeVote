import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import apiService from "../../services/apiService";
import { ISong } from "../../interfaces";
import styled from "styled-components";
import { useGlobalState } from "../../state/stateContext";
import ReactGA from "react-ga";
import AvatarEditor from "react-avatar-editor";
import { AddNewSongDropDown } from "../../components/SongForm";

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
          finishCallBack={(formData) => {
            ReactGA.event({
              category: "Admin",
              action: "Submitted a new song",
            });

            apiService.addNewSong({ ...formData }).then(() => {
              setIsVisible(false);
              getSongs();
            });
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
