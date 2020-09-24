import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_SONGS = gql`
  query {
    Song {
      id
      name
      artist {
        id
        name
      }
      album {
        id
        name
      }
      image
    }
  }
`;

export const SongsTwo = () => {
  const { loading, error, data } = useQuery(GET_ALL_SONGS);

  if (loading) return <>"Loading..."</>;
  if (error) return <>`Error! {error.message}`</>;

  return (
    <div>
      {data.Song.map((song: any) => {
        return (
          <div>
            {song?.name} - {song?.artist[0]?.name} - {song?.album?.name}
          </div>
        );
      })}
      {/* {JSON.stringify(data)} */}
    </div>
  );
};
