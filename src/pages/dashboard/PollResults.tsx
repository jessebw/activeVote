import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiService from "../../services/apiService";
import { IPollResult, IPoll } from "../../interfaces";
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
      {results &&
        results.map(result => {
          return (
            <div key={result.songId}>
              <h1>{result.songName}</h1>
              <h3>{result.votes}</h3>
            </div>
          );
        })}
    </div>
  );
};
