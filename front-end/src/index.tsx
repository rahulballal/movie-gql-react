import React from "react";
import ReactDOM from "react-dom";
import { AddMovie } from "./add";
import { useAddMovieMutation, useGetAllMoviesQuery } from "./generated";
import { MovieList } from "./list";

const App: React.FC = () => {
  const { data, loading, refetch } = useGetAllMoviesQuery();
  const [addMovie] = useAddMovieMutation();
  if (loading) return <span>Loading ...</span>;
  return (
    <React.Fragment>
      <div>
        <MovieList movies={data?.movies || []} />
      </div>
      <div>
        <AddMovie
          submit={async (params) => {
            await addMovie({ variables: { addMovieInput: params } });
            refetch();
          }}
        />
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
