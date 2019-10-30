import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiService from "../services/apiService";
import { ISong } from "../interfaces";
import {
  DragDropContext,
  Droppable,
  Draggable,
  ResponderProvided,
  DropResult,
} from "react-beautiful-dnd";

const InputComponent = styled.label`
  display: block;
`;

export const PollForm = (props: {
  pollName: string;
  startDate: Date;
  endDate: Date;
  songIds: string[];
  updateCallBack: (
    pollName: string,
    ChosenItems: string[],
    startDate: string,
    endDate: string
  ) => void;
}) => {
  const [pollName, setPollName] = useState<string>(props.pollName);
  const [startDate, setStartDate] = useState<Date>(props.startDate);
  const [endDate, setEndDate] = useState<Date>(props.endDate);
  const [songItems, setSongItems] = useState<ISong[]>([]);
  const [chosenItems, setChosenItems] = useState<ISong[]>([]);

  useEffect(() => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(songs);
      setChosenItems(
        songs.filter((song: ISong) => {
          return props.songIds.indexOf(song._id) >= 0;
        })
      );
    });
  }, []);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    console.log("it worked");

    if (source.droppableId === destination.droppableId) {
      console.log("reOrder", source.droppableId);
      const list =
        source.droppableId === "songPool" ? [...songItems] : [...chosenItems];
      const callBack =
        source.droppableId === "songPool" ? setSongItems : setChosenItems;
      const removed = list.splice(source.index, 1);
      list.splice(destination.index, 0, ...removed);
      console.log(source);
      console.log(destination);
      callBack(list);
    } else {
      const fromList =
        source.droppableId === "songPool" ? [...songItems] : [...chosenItems];
      const toList =
        destination.droppableId === "songPool"
          ? [...songItems]
          : [...chosenItems];
      const removed = fromList.splice(source.index, 1);
      toList.splice(destination.index, 0, ...removed);
      const callBackFrom =
        source.droppableId === "songPool" ? setSongItems : setChosenItems;
      const callBackTo =
        destination.droppableId === "songPool" ? setSongItems : setChosenItems;
      callBackFrom(fromList);
      callBackTo(toList);

      console.log("move");
    }
  };

  return (
    <div>
      <InputComponent>
        Poll Name
        <input
          type="text"
          placeholder="Poll Name"
          value={pollName}
          onChange={(event: any) => {
            setPollName(event.target.value);
          }}
        />
      </InputComponent>

      <InputComponent>
        Start Date
        {startDate.toISOString()}
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => {
            setStartDate(date);
          }}
        />
      </InputComponent>
      <InputComponent>
        End Date
        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => {
            setEndDate(date);
          }}
        />
      </InputComponent>
      <button
        onClick={() => {
          props.updateCallBack(
            pollName,
            chosenItems.map((value: ISong) => value._id),
            startDate.toISOString(),
            endDate.toISOString()
          );
        }}
      >
        submit
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          <Droppable droppableId="chosenSongs">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  flex: "0 0 50%",
                  backgroundColor: "lightblue",
                }}
              >
                {chosenItems.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.artist}
                        {item.songName}
                        {item.album}
                        <img
                          src={`http://activevoteserver.deverall.co.nz/${item.image}`}
                          style={{ width: "300px", height: "300px" }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="songPool">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  flex: "0 0 50%",
                  backgroundColor: "pink",
                }}
              >
                {songItems.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.artist}
                        {item.songName}
                        {item.album}
                        <img
                          src={`http://activevoteserver.deverall.co.nz/${item.image}`}
                          style={{ width: "300px", height: "300px" }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
