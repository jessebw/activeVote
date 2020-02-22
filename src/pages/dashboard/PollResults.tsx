import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiService from "../../services/apiService";
import { IPollResult, IPoll } from "../../interfaces";
import styled from "styled-components";
import moment from "moment";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip
} from "recharts";
import { number } from "prop-types";

const WrapperDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PollResults = () => {
  const [results, setResults] = useState<IPollResult[]>();
  const [poll, setPoll] = useState<IPoll>();
  const [chartSize, setChartSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );
  const { pollId } = useParams();
  const ref = React.createRef<HTMLDivElement>();

  const figureChartSize = () => {
    if (ref.current) {
      const wrapperStyles = getComputedStyle(ref.current);
      setChartSize({
        width: parseInt(wrapperStyles.width as string) * 0.8,
        height: parseInt(wrapperStyles.height as string) * 0.8
      });
    }
  };

  useEffect(() => {
    figureChartSize();
    const cb = () => {
      figureChartSize();
    };
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);

  useEffect(() => {
    apiService.pollResults(pollId as string).then((results: any) => {
      return apiService.getPollById(pollId as string).then((poll: IPoll) => {
        setPoll(poll);
        const resultSet = Object.keys(results).map(
          (key: any): IPollResult => {
            const song = poll.songs.find(song => song._id === key);
            return {
              pollId: pollId as string,
              songId: key,
              songName: song!.songName,
              votes: results[key] as number
            };
          }
        );
        setResults(resultSet);
      });
    });
  }, []);
  return (
    <WrapperDiv ref={ref}>
      <h1>{poll && poll.name}</h1>
      <p>
        Ends:{" "}
        {poll && moment(poll.endDateTime).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <BarChart
        width={chartSize.width}
        height={chartSize.height}
        data={results}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="songName" />
        <YAxis dataKey="votes" />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </WrapperDiv>
  );
};
