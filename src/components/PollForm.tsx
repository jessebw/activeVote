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
import {
  PollFormWrapper,
  PollPageWrapper,
  StyledListItem,
  InputComponent,
} from "./StyledComponents";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalState } from "../state/stateContext";
import MomentUtils from "@date-io/moment";
import { Button, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { disabled } from "glamor";
import {
  BsInfoSquare,
} from "react-icons/bs";

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

const CustomButton = styled.button`
  border-radius: 5px;
  background-color: #5dade2;
  color: #fff;
  width: 7em;
  height: 100%;
  line-height: 2em;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  background-color: #fff;
  border: none;
  border-bottom: 1px dashed #000;

  text-align: center;
  :focus {
    outline: 0;
    background-color: #fff;
  }
`;

const HeadingThree = styled.h3`
border-bottom: 2px solid #000;
text-align: center;
text-transform: uppercase;
margin: 0;
`;

const DragInfo = styled.div`
color: rgba(0,0,0,.5);
text-align: center;
`;


const DroppableList = (props: { listId: string; listMap: ISong[] }) => (
  <Droppable droppableId={props.listId}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={{
          height: "100%",
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
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [toggleVisibleDrop, setToggleVisibleDrop] = useState<boolean>(false);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

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
        songs
          .filter((song: ISong) => {
            return props.songIds.indexOf(song._id as string) < 0;
          })
          .sort((a: ISong, b: ISong) => {
            return (a.artist + a.songName).toLowerCase() >
              (b.artist + b.songName).toLowerCase()
              ? 1
              : -1;
          })
      );
      setChosenItems(
        songs
          .filter((song: ISong) => {
            return props.songIds.indexOf(song._id as string) >= 0;
          })
          .sort((a: ISong, b: ISong) => {
            const compare1: number = props.songIds.indexOf(a._id as string);
            const compare2: number = props.songIds.indexOf(b._id as string);
            return compare1 > compare2 ? 1 : -1;
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
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          submitForm();
        }
      }}
    >
      <PollFormWrapper style={{ display: "flex" }} className="">
        <div>
          <InputComponent>
            <TextField
              type="text"
              placeholder="Poll Name"
              value={pollName}
              onChange={(event: any) => {
                setPollName(event.target.value);
              }}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Poll Name"
              variant="outlined"
            />
          </InputComponent>
          <div>
            <label onClick={(e) => e.preventDefault()}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  // disabled="true"
                  variant="inline"
                  margin="normal"
                  // id="date-picker-inline"
                  id="datetime-local"
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  // disabled="true"
                  variant="inline"
                  margin="normal"
                  // id="date-picker-inline"
                  id="datetime-local"
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </label>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              submitForm();
            }}
            style={{
              height: "100%",
              width: "10em",
              marginLeft: "10px",
              border: "1px solid rgba(0, 0, 0, .3)",
            }}
          >
            {props.savingPoll ? "saving..." : "submit"}
          </Button>

          {props.pollId && (
            <CustomButton
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
            </CustomButton>
          )}
        </div>
      </PollFormWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div data-testid="chosenSongs" style={{ flex: "0 0 49%" }}>
            <div>
            <BsInfoSquare
                        style={{
                          fontSize: "1em",
                          position: "absolute",
                          marginLeft: "10px",
                          float: "right",
                        }}
                        onClick={(e: any) => {
                          setToggleVisibleDrop(!toggleVisibleDrop);
                          setTimeout(() => {
                            setToggleVisibleDrop(toggleVisibleDrop);
                          }, 3000);
                        }}
                      />
                      
            
            <HeadingThree>poll items</HeadingThree>
            </div>
            {!toggleVisibleDrop ? "" : <DragInfo>Drag into this area to create a poll</DragInfo>}

            <DroppableList listId="chosenSongs" listMap={chosenItems} />
          </div>
          <div
            data-testid="songPool"
            style={{
              flex: "0 0 49%",
              borderLeft: "2px solid #000",
            }}
          >
            <div>
            <HeadingThree>all items</HeadingThree>
            {!toggleVisibleDrop ? "" : <DragInfo>Drag from this area to create a poll</DragInfo>}
            <Input
            type="search"
            placeholder="search"
            onChange={(event: any) => {
              setSearchFilter(event.target.value);
            }}
          ></Input>
          </div>
            <DroppableList
              listId="songPool"
              listMap={songItems.filter((songItem: ISong) => {
                return (
                  songItem.artist.toLowerCase() +
                  " - " +
                  songItem.songName.toLowerCase()
                ).includes(searchFilter.toLowerCase());
              })}
            />
          </div>
        </div>
      </DragDropContext>
    </PollPageWrapper>
  );
};
