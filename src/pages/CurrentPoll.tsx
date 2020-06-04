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
  FullPage,
} from "../components/StyledComponents";
import logoBlack from "../assets/images/activeLogoBlack.png";
import { useGlobalState } from "../state/stateContext";
import configService from "../services/configService";
import {
  MdChangeHistory,
  MdViewModule,
  MdExpandMore,
  MdExpandLess,
  MdList,
  MdApps,
} from "react-icons/md";
import { toast } from "react-toastify";
import { css } from "glamor";
import ReactGA from "react-ga";

const GridWrapper = styled.div<{ isGridView: boolean }>`
  background-color: #0c0c0c;
  width: 100vw;
  display: grid;
  color: #fff;
  grid-template-columns: ${(props) => {
    return props.isGridView
      ? "repeat(auto-fit, minmax(250px, 1fr));"
      : "repeat(auto-fit, minmax(1, 1fr));";
  }};
  grid-template-rows: ${(props) => {
    return props.isGridView
      ? "repeat(auto-fit, 250px);"
      : "repeat(auto-fill, minmax(1, 1fr));";
  }};

  > div {
    min-height: ${(props) => {
      return props.isGridView ? "250px;" : "100px;";
    }};
    height: 100%;
  }
`;

const VoteItem = styled.div<{
  onClick: any;
  imagePath: string;
  isGridView: boolean;
}>`
  cursor: pointer;
  color: ${(props) => {
    return props.isGridView ? "#fff" : "#fff";
  }};
  background-image: url(${(props) => props.imagePath});
  background-repeat: no-repeat;
  background-position: ${(props) => {
    return props.isGridView ? "center" : "right";
  }};
  background-size: ${(props) => {
    return props.isGridView ? "cover" : "contain";
  }};
  text-align: ${(props) => {
    return props.isGridView ? "center" : "left";
  }};
  height: ${(props) => {
    return props.isGridView ? "100%" : "100%";
  }};
  width: ${(props) => {
    return props.isGridView ? "100%" : "50%";
  }};
  margin: 0 auto;
  display: flex;
  position: relative;
  border-top: ${(props) => {
    return props.isGridView ? "0" : "2px solid RGBA(242, 242, 242, .1)";
  }};

  @media screen and (max-device-width: 1000px) {
    width: ${(props) => {
      return props.isGridView ? "100%" : "100%";
    }};
  }
  .vote-btn {
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: ${(props) => {
      return props.isGridView ? "center" : "left";
    }};
    top: ${(props) => {
      return props.isGridView ? "auto" : "50%";
    }};
    align-self: ${(props) => {
      return props.isGridView ? "flex-end" : "center";
    }};
    width: ${(props) => {
      return props.isGridView ? "100%" : "100%";
    }};
    background: ${(props) => {
      return props.isGridView ? "RGBA(12, 12, 12, .7)" : "none";
    }};
  }
`;

const VoteItemData = styled.div<{ isGridView: boolean }>`
  width: 50%;
  padding-left: ${(props) => {
    return props.isGridView ? "0" : "150px";
  }};
  @media screen and (max-device-width: 1000px) {
    padding-left: ${(props) => {
      return props.isGridView ? "0" : "60px";
    }};
  }
`;

const VoteButton = styled.div`
  width: 100%;
`;

const ActiveButton = styled.button`
  border: 2px solid #fff;
  border-radius: 4px;
  font-weight: 700;
  width: auto;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  letter-spacing: 3px;
`;

//Title Of The Poll - Top left box.
const Title = styled.div`
  font-family: "Montserrat-Light";
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Ranked number box
const Rank = styled.div<{ isGridView: boolean }>`
  position: absolute;
  left: ${(props) => {
    return props.isGridView ? "0px" : "10px";
  }};
  top: ${(props) => {
    return props.isGridView ? "0px" : "10px";
  }};
  background-color: ${(props) => {
    return props.isGridView ? "rgba(0, 0, 0, 0.6)" : "none";
  }};
  color: #fff;
  width: ${(props) => {
    return props.isGridView ? "40px" : "80px";
  }};
  height: ${(props) => {
    return props.isGridView ? "40px" : "80px";
  }};
  text-align: center;
  font-size: ${(props) => {
    return props.isGridView ? "1em" : "2em";
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 3px 0px;
  @media screen and (max-device-width: 1000px) {
    width: ${(props) => {
      return props.isGridView ? "40px" : "40px";
    }};
    height: ${(props) => {
      return props.isGridView ? "40px" : "40px";
    }};
    top: ${(props) => {
      return props.isGridView ? "0px" : "25px";
    }};
  }
`;

const WelcomeModal = styled.div`
  > * {
    border-radius: 4px;
    position: fixed;
    width: 80%;
    top: 50%;
    left: 50%;
    background: rgba(0, 0, 0, 1);
    padding: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
    transform: translate(-50%, -50%);
    z-index: 2;
    text-align: center;
    border: 0 solid #000;
    cursor: pointer;
  }
  &:after {
    content: "";
    position: fixed;
    z-index: 1;
    background: rgba(0, 0, 0, 0.9);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

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
      onClick={(e: MouseEvent) => {
        props.onVote(props.data._id);
      }}
    >
      <Rank isGridView={props.gridView}>{props.data.rank}</Rank>

      <VoteButton className="vote-btn">
        <VoteItemData isGridView={props.gridView}>
          <div style={{ opacity: ".7" }}>{props.data.artist}</div>
          <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            {props.data.songName}
          </div>
          <div style={{ opacity: ".7" }}>{props.data.album}</div>
        </VoteItemData>
      </VoteButton>
    </VoteItem>
  );
};

const VoteForm = (props: {
  closeCallBack: () => void;
  voteItem: IVoteItem;
  currentPoll: IPoll;
}) => {
  const [email, setEmail] = useState<string>("");
  const [globalState, dispatch] = useGlobalState();
  const ModalImage = styled.div<{ imagePath: string }>`
    width: 100%;
    height: 50%;
    background-image: url(${(props) => props.imagePath});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `;

  return (
    <FormModal>
      <div>
        <CancelButton
          onClick={(e: any) => {
            props.closeCallBack();
            ReactGA.event({
              category: "User",
              action: "Vote form closed with cancel",
            });
          }}
          style={{ backgroundColor: "white" }}
        >
          <RightLeft />
          <LeftRight />
        </CancelButton>
        <ModalImage
          imagePath={
            configService.getConfig()!.serverURL + "/" + props.voteItem.image
          }
        ></ModalImage>

        <p style={{ color: "rgba()0,0,0, .5" }}>
          Enter your email address to submit vote.
        </p>

        <FormModalSelection>
          <h3 style={{ color: "rgba(0, 0, 0, .5)" }}>
            {props.voteItem.artist}
          </h3>

          <h2>{props.voteItem.songName}</h2>
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
            const valid: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              email
            );
            if (valid === false) {
              toast.error("This is not an email address");
              ReactGA.event({
                category: "User",
                action: "Vote failed not a valid address",
              });
              return;
            }

            apiService
              .postSubmitVote(email, props.voteItem._id, props.currentPoll._id)
              .then(
                (data) => {
                  toast("Thanks for Voting", {
                    className: css({
                      background: "#000 !important",
                      color: "#c9c9c9 !important",
                      fontWeight: "bold",
                    }),
                    progressClassName: css({
                      background: "#242222 !important",
                    }),
                  });
                  props.closeCallBack();
                  ReactGA.event({
                    category: "User",
                    action: "Vote success",
                  });
                },
                (error) => {
                  toast.error("Sorry you can only vote once a week");
                  ReactGA.event({
                    category: "User",
                    action: "Vote failed - already voted",
                  });
                }
              );
          }}
        >
          Vote
        </SubmitButton>
      </div>
    </FormModal>
  );
};
``;

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
        backgroundColor: "rgb(28,23,26)",
      }}
    >
      <NoPollError>{/* your logo here */}</NoPollError>
    </div>
  );
};

export const CurrentPoll = () => {
  const [voteItems, setVoteItems] = useState<IVoteItem[]>([]);
  const [voteFormOpen, setVoteFormOpen] = useState<boolean>(false);
  const [voteSong, setVoteSong] = useState<string>();
  const [currentPoll, setCurrentPoll] = useState<IPoll>();
  const mql = window.matchMedia("(max-width: 500px)");
  const [isGridView, setIsGridView] = useState<boolean>(!mql.matches);
  const [topMenu, setTopMenu] = useState<boolean>(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(true);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    apiService
      .getCurrentPoll()
      .then((poll: IPoll) => {
        setCurrentPoll(poll);
        apiService.pollResults(poll._id).then((votes) => {
          setVoteItems(
            poll.songs.sort((a: ISong, b: ISong) => votes[b._id] - votes[a._id])
          );
        });
      })

      .catch((err) => {
        console.log("error happened", err);
      });
  }, []);

  const welcomeModalContainer = () => {
    return (
      <WelcomeModal>
        <div
          style={{ color: "#fff" }}
          onClick={(e) => {
            setWelcomeModalOpen(false);
          }}
        >
          <h3 style={{ letterSpacing: ".2em", color: "rgba(255,255,255, .8)" }}>
            The RadioActive.FM
          </h3>
          <h3 style={{ fontSize: "3em", letterSpacing: ".2em" }}>Top 11</h3>
          <hr style={{ color: "rgba(255,255,255, .5)", width: "50%" }} />
          <p style={{ color: "rgba(255,255,255, .5)" }}>
            Select the artist you would like to see win the Top 11
          </p>
          <p style={{ color: "rgba(255,255,255, .5)" }}>
            Played out every Wednesday night from 7 till 9PM on Radio Active
            88.6FM
          </p>
          <p style={{ fontSize: ".6em", color: "rgba(255,255,255, .5)" }}>
            Please only vote once, we do not collect your email address for any
            purpose other than voting.
          </p>
          <ActiveButton style={{ marginTop: "10px" }}>
            Start Voting
          </ActiveButton>
        </div>
      </WelcomeModal>
    );
  };

  const topMenuContainer = () => {
    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <div
          onClick={() => {
            setTopMenu(!topMenu);
          }}
          style={{
            position: "absolute",
            left: "10px",
            top: "10px",
            fontSize: "2em",
          }}
        >
          {topMenu && <MdExpandLess />}
        </div>
        <div
          style={{
            fontSize: "2em",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={(e) => {
              ReactGA.event({
                category: "User",
                action: "List view clicked",
              });
              setIsGridView(false);
            }}
          >
            <MdList />
            <p>List</p>
          </span>
          <span
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={(e) => {
              ReactGA.event({
                category: "User",
                action: "Grid view clicked",
              });
              setIsGridView(true);
            }}
          >
            <MdApps />
            <p>Grid</p>
          </span>
        </div>
      </div>
    );
  };

  const buttonClicked = (songID: string) => {
    setVoteSong(songID);
    setVoteFormOpen(true);
    ReactGA.event({
      category: "User",
      action: "Vote form open",
    });
  };

  return (
    // introduce a loading state which triggers full page when passed
    <FullPage>
      {!welcomeModalOpen ? "" : welcomeModalContainer()}
      {!topMenu ? "" : topMenuContainer()}
      {voteFormOpen && (
        <VoteForm
          closeCallBack={() => {
            setVoteFormOpen(false);
          }}
          voteItem={
            voteItems.find((value) => value._id === voteSong) as IVoteItem
          }
          currentPoll={currentPoll as IPoll}
        />
      )}
      {!voteItems || voteItems.length === 0 ? (
        <NoCurrentPolls />
      ) : (
        <GridWrapper isGridView={isGridView}>
          <Title>
            <div
              onClick={() => {
                setTopMenu(!topMenu);
              }}
              style={{
                position: "absolute",
                left: "10px",
                top: "10px",
                fontSize: "2em",
              }}
            >
              {!topMenu && <MdExpandMore />}
            </div>
            <div>
              <h2
                style={{
                  textAlign: "center",
                  display: "block",
                  color: "rgba(255, 255, 255, .2)",
                }}
              >
                The RadioActive.FM
              </h2>
              <h1 style={{ textAlign: "center", display: "block" }}>
                {currentPoll && currentPoll.name}
              </h1>
            </div>
          </Title>
          {voteItems.map((voteItem: IVoteItem, i: number) => {
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
