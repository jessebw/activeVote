import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiService from "../../services/apiService";
import { IPollResult, IPoll } from "../../interfaces";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip
} from "recharts";

export const PollResults = () => {
  const [results, setResults] = useState<IPollResult[]>();
  const { pollId } = useParams();
  useEffect(() => {
    apiService.pollResults(pollId as string).then((results: any) => {
      return apiService.getPollById(pollId as string).then((poll: IPoll) => {
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
    <div>
      <BarChart
        width={500}
        height={300}
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
    </div>
  );
};
