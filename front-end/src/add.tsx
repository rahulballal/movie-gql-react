import React from "react";
import { AddMovieInput, Movie, MovieSource } from "./generated";

const defaultState: Movie = {
  isFlop: false,
  name: "",
  releaseDate: new Date(),
  source: MovieSource.Bollywood,
};

interface IAddMovieProps {
  submit: (param: AddMovieInput) => Promise<void>;
}
export const AddMovie: React.FC<IAddMovieProps> = (props) => {
  const [{ isFlop, name, releaseDate, source }, setFormState] =
    React.useState<Movie>(defaultState);
  const handleClick = () => {
    props.submit({ name, source });
  };
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={name}
        onBlur={(e) => {
          const val = e.target.value;
          setFormState((value) => Object.assign({}, value, { name: val }));
        }}
      />
      <label htmlFor="releaseDate">Release Date</label>
      <input
        type="datetime-local"
        value={releaseDate}
        readOnly
      />
      <label htmlFor="name">Is Hollywood</label>
      <input
        type="checkbox"
        checked={source === MovieSource.Bollywood ? false : true}
        readOnly
      />
      <label htmlFor="name">Flop?</label>
      <input
        type="checkbox"
        checked={isFlop}
        readOnly
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};
