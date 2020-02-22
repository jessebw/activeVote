import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import apiService from "../services/apiService";
import { ISong } from "../interfaces";
import {
  DragDropContext,
  Droppable,
  Draggable,
  ResponderProvided,
  DropResult
} from "react-beautiful-dnd";
import {
  PollFormWrapper,
  PollPageWrapper,
  StyledListItem,
  InputComponent
} from "./StyledComponents";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalState } from "../state/stateContext";

const ListItem = (props: { song: ISong }) => {
  const [globalState, dispatch] = useGlobalState();

  return (
    <StyledListItem>
      <div>
        {props.song.artist} - {props.song.songName} - {props.song.album}
      </div>
      <img src={`${globalState.config!.serverURL}/${props.song.image}`} />
    </StyledListItem>
  );
};

const DroppableList = (props: { listId: string; listMap: ISong[] }) => (
  <Droppable droppableId={props.listId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={{
          height: "100%"
        }}
      >
        {props.listMap.map((item, index) => (
          <Draggable
            key={item._id}
            draggableId={item._id as string}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <ListItem song={item} />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export const PollForm = (props: {
  pollName: string;
  startDate: Date;
  endDate: Date;
  songIds: string[];
  savingPoll?: boolean;
  pollId?: string;
  updateCallBack?: (
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
  const [deletePoll, setDeletePoll] = useState<boolean>(false);

  const submitForm = () => {
    props.updateCallBack &&
      props.updateCallBack(
        pollName,
        chosenItems.map((value: ISong) => value._id as string),
        startDate.toISOString(),
        endDate.toISOString()
      );
  };

  useEffect(() => {
    apiService.getAllSongs().then((songs: ISong[]) => {
      setSongItems(
        songs.filter((song: ISong) => {
          return props.songIds.indexOf(song._id as string) < 0;
        })
      );
      setChosenItems(
        songs.filter((song: ISong) => {
          return props.songIds.indexOf(song._id as string) >= 0;
        })
      );
    });
  }, []);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list =
        source.droppableId === "songPool" ? [...songItems] : [...chosenItems];
      const callBack =
        source.droppableId === "songPool" ? setSongItems : setChosenItems;
      const removed = list.splice(source.index, 1);
      list.splice(destination.index, 0, ...removed);
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
    }
  };

  if (deletePoll === true) {
    return <Redirect to="/dashboard/polls" />;
  }

  return (
    <PollPageWrapper
      onKeyDown={e => {
        if (e.keyCode === 13) {
          submitForm();
        }
      }}
    >
      <PollFormWrapper>
        <InputComponent>
          Poll Name:
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
          Start Date:
          <DatePicker
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date: Date) => {
              setStartDate(date);
            }}
          />
        </InputComponent>
        <InputComponent>
          End Date:
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
            submitForm();
          }}
        >
          {props.savingPoll ? "saving..." : "submit"}
        </button>

        {props.pollId && (
          <button
            onClick={() => {
              props.pollId &&
                apiService.deletePoll(props.pollId).then(
                  () => {
                    setDeletePoll(true);
                  },
                  () => {
                    toast.error(`Error: ${pollName} could not be deleted`);
                  }
                );
            }}
          >
            delete
          </button>
        )}
      </PollFormWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          <div
            data-testid="chosenSongs"
            style={{ flex: "0 0 50%", backgroundColor: "#F2F2F2" }}
          >
            <h3>Poll Pool</h3>
            <span>Drag into this area to create a poll</span>
            <DroppableList listId="chosenSongs" listMap={chosenItems} />
          </div>
          <div data-testid="songPool" style={{ flex: "0 0 50%" }}>
            <h3>Track Pool</h3>
            <DroppableList listId="songPool" listMap={songItems} />
          </div>
        </div>
      </DragDropContext>
    </PollPageWrapper>
  );
};
