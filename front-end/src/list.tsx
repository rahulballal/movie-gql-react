import React from "react";
import { Movie } from "./generated";

interface IMovieListProps {
    movies: NonNullable<Movie[]>
}

export const MovieList: React.FC<IMovieListProps> = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Source</td>
          <td>Released On</td>
          <td>Flop?</td>
        </tr>
      </thead>
      <tbody>
        {props.movies.map(({ name, source, releaseDate, isFlop }, idx) => {
          return (
            <tr key={`movie_${idx}`}>
              <td>{name}</td>
              <td>{source}</td>
              <td>{releaseDate}</td>
              <td>{isFlop ? "Yes" : "No"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
