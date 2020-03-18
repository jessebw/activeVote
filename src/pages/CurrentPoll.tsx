import React, { useState, useEffect, ChangeEvent, Component } from "react";
import styled from "styled-components";
import { IVoteItem, IPoll, ISong } from "../interfaces";
import apiService from "../services/apiService";
import {
  FormModal,
  EmailInput,
  SubmitButton,
  CancelButton,
  LeftRight,
  RightLeft,
  FormModalSelection,
  FullPage
} from "../components/StyledComponents";
import logoBlack from "../assets/images/activeLogoBlack.png";
import { useGlobalState } from "../state/stateContext";
import configService from "../services/configService";
import { MdChangeHistory, MdViewModule } from "react-icons/md";

const GridWrapper = styled.div<{ isGridView: boolean }>`
  background-color: #0c0c0c;
  /* background-color: orange; */
  width: 100vw;
  /* height: 100%; */
  display: grid;
  color: #fff;
  grid-template-columns: ${props => {
    return props.isGridView
      ? "repeat(auto-fill, minmax(240px, 1fr));"
      : "repeat(auto-fit, minmax(1, 1fr));";
  }};
  align-items: center;
  > div {
    height: 250px;
  }
`;

const VoteItem = styled.div<{ imagePath: string; isGridView: boolean }>`
  color: #000;
  font-size: 100%;
  background-image: url(${props => props.imagePath});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${props => {
    return props.isGridView ? "cover" : "contain";
  }};
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .vote-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: width 0.1s, opacity 0.4s;
    transition-timing-function: ease-out;
    opacity: ${props => {
      return props.isGridView ? "0" : "1";
    }};
    height: 100%;
    width: 0%;
    /* background: RGBA(127, 127, 213, 0.9); */
    /* background: RGBA(93, 173, 226, 0.9); */
    background: RGBA(242, 242, 242, 1);
    /* background: -webkit-linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4); */
    /* background: linear-gradient(to left, #7f7fd5, #86a8e7, #91eae4); */
  }
  &:hover {
    .vote-btn {
      /* display: block; */
      width: 100%;
      opacity: 0.8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;

const VoteItemOne = styled.div`
  font-size: 1.2em;
`;

const VoteButton = styled.div<{ onClick: any }>``;

// ${var} is inter[polition for string literals (inserting js into strings)
const Title = styled.div`
  /* font-family: "BalooBhai-Regular"; */
  font-family: "Montserrat-Light";

  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rank = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #000;
  color: #fff;
  width: 20px;
  height: 20px;
`;

const VoteItemList = styled.div`
  height: 150px;
  width: 60%;
`;

const SettingsMenu = styled.div``;

const VoteItemWrapper = (props: {
  key: number;
  data: IVoteItem;
  onVote: Function;
  gridView: boolean;
}) => {
  const [globalState, dispatch] = useGlobalState();
  return (
    <VoteItem
      isGridView={props.gridView}
      imagePath={globalState.config!.serverURL + "/" + props.data.image}
    >
      <Rank>{props.data.rank}</Rank>
      <div className="vote-info">
        <VoteButton
          className="vote-btn"
          onClick={(e: MouseEvent) => {
            props.onVote(props.data._id);
          }}
        >
          <VoteItemOne>
            <h3>{props.data.artist}</h3>
            <p>{props.data.songName}</p>
            <p>{props.data.album}</p>
          </VoteItemOne>
        </VoteButton>
      </div>
    </VoteItem>
  );
};

export const CurrentPoll = () => {
  const [voteItems, setVoteItems] = useState<IVoteItem[]>([]);
  const [voteFormOpen, setVoteFormOpen] = useState<boolean>(false);
  const [voteSong, setVoteSong] = useState<string>();
  const [currentPoll, setCurrentPoll] = useState<IPoll>();
  const [isGridView, setIsGridView] = useState<boolean>(true);

  useEffect(() => {
    apiService
      .getCurrentPoll()
      .then((poll: IPoll) => {
        setCurrentPoll(poll);
        apiService.pollResults(poll._id).then(votes => {
          setVoteItems(
            poll.songs.sort((a: ISong, b: ISong) => votes[b._id] - votes[a._id])
          );
        });
      })

      .catch(err => {
        console.log("error happened", err);
      });
  }, []);

  const VoteForm = () => {
    const [email, setEmail] = useState<string>("");
    const [globalState, dispatch] = useGlobalState();

    const ModalImage = styled.div<{ imagePath: string }>`
      width: 100px;
      height: 100px;
      background-image: url(${props => props.imagePath});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    `;

    const ImagePath = () => {
      return voteItems.reduce((accumulator: string, value: IVoteItem) => {
        if (value._id === voteSong) {
          return `${value.image}`;
        }
        return accumulator;
      }, "");
    };

    return (
      <FormModal>
        <div>
          <CancelButton
            onClick={(e: any) => {
              setVoteFormOpen(false);
            }}
          >
            <LeftRight />
            <RightLeft />
          </CancelButton>
          {/* <modalImage
            imagePath={configService.getConfig()!.serverURL + "/" + ImagePath()}
          /> */}

          <ModalImage
            imagePath={configService.getConfig()!.serverURL + "/" + ImagePath()}
          ></ModalImage>

          <p>Please enter your email address to submit vote.</p>

          <FormModalSelection>
            {voteItems.reduce((accumulator: string, value: IVoteItem) => {
              if (value._id === voteSong) {
                return `${value.artist} - ${value.songName}`;
              }
              return accumulator;
            }, "")}
          </FormModalSelection>

          <EmailInput
            placeholder="Email"
            type={"email"}
            onChange={(event: any) => {
              setEmail(event.target.value);
            }}
          />
          <SubmitButton
            onClick={(e: any) => {
              apiService
                .postSubmitVote(email, voteSong as string, currentPoll!._id)
                .then(data => {
                  alert("thanks for Voting");
                  setVoteFormOpen(false);
                });
            }}
          >
            Vote
          </SubmitButton>
        </div>
      </FormModal>
    );
  };

  const buttonClicked = (songID: string) => {
    setVoteFormOpen(true);
    setVoteSong(songID);
  };

  return (
    // introduce a loading state which triggers full page when passed
    <FullPage>
      {voteFormOpen && <VoteForm />}
      {!voteItems || voteItems.length === 0 ? (
        <NoCurrentPolls />
      ) : (
        <GridWrapper isGridView={isGridView}>
          <Title>
            <h1>{currentPoll && currentPoll.name}</h1>
            <SettingsMenu
              onClick={e => {
                setIsGridView(!isGridView);
              }}
            >
              {isGridView && <MdChangeHistory />}
              {!isGridView && <MdViewModule />}
            </SettingsMenu>
          </Title>
          {voteItems.map((voteItem: IVoteItem, i: number) => {
            // insert a if statement here to either show list view or grid view

            // if (!isGridView) {
            //   return (
            //     <VoteItemWrapperList
            //       key={i}
            //       data={{ ...voteItem, rank: i + 1 }}
            //       onVote={buttonClicked}
            //     />
            //   );
            // } else {
            //   return (
            //     <VoteItemWrapper
            //       key={i}
            //       data={{ ...voteItem, rank: i + 1 }}
            //       onVote={buttonClicked}
            //     />
            //   );
            // }

            return (
              <VoteItemWrapper
                key={i}
                data={{ ...voteItem, rank: i + 1 }}
                onVote={buttonClicked}
                gridView={isGridView}
              />
            );
          })}
        </GridWrapper>
      )}
    </FullPage>
  );
};

const NoPollError = styled.div`
  width: 300px;
  height: 200px;
  color: white;
  background-image: url(${logoBlack});
  background-size: cover;
  background-color: rgb(28, 23, 26);
`;

const NoCurrentPolls = () => {
  return (
    <div
      data-testid="noCurrentPoll"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(28,23,26)"
      }}
    >
      <NoPollError>{/* your logo here */}</NoPollError>
    </div>
  );
};
