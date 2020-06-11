import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import { ISong, ISongFormData } from "../interfaces";
import AvatarEditor from "react-avatar-editor";
import ReactGA from "react-ga";
import apiService from "../services/apiService";

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

export const AddNewSongDropDown = (props: {
  finishCallBack: (formData: ISongFormData) => void;
}) => {
  const [imageSliderValue, setImageSliderValue] = useState<string>("1");
  const [imageData, setImageData] = useState<File>();

  const [formData, setFormData] = useState<ISongFormData>({
    artist: "",
    songName: "",
    album: "",
    image: "",
  });

  const changeImageFile = (e: any) => {
    const image = e.target.files[0];
    setImageData(image);
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
        {imageData && (
          <div>
            <AvatarEditor
              image={imageData}
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
            (imageRef!.current as any)
              .getImageScaledToCanvas()
              .toBlob((blob: Blob) => {
                const imageFile = new File([blob], "newFile.jpg");
                const _data = new FormData();
                _data.append("image", imageFile as File);
                apiService.uploadImage(_data as any).then((resp: any) => {
                  // call callback and pass value

                  props.finishCallBack({ ...formData, image: resp[0].path });
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
            props.finishCallBack(formData);
          }}
        >
          Cancel
        </SongCancelButton>
      </div>
    </SongsFormDropDown>
  );
};

// (imageRef!.current as any)
//               .getImageScaledToCanvas()
//               .toBlob((blob: Blob) => {
//                 const imageFile = new File([blob], "newFile.jpg");
//                 const _data = new FormData();
//                 _data.append("image", imageFile as File);
//                 apiService.uploadImage(_data as any).then((resp: any) => {}

//                 , image: resp[0].path
