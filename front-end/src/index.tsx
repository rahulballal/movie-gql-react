import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AddMovie } from "./add";
import { useAddMovieMutation, useGetAllMoviesQuery } from "./generated";
import { MovieList } from "./list";


const apolloClient = new ApolloClient({
    uri: `${window.location.origin}/graphql`,
    cache: new InMemoryCache(),
})


const App: React.FC = () => {
  const { data, loading, refetch } = useGetAllMoviesQuery();
  const [addMovie] = useAddMovieMutation();
  if (loading) return <span>Loading ...</span>;
  return (
    <React.Fragment>
      <div>
        <MovieList movies={data?.movies || []} />
      </div>
      <hr/>
      <div>
        <AddMovie
          submit={async (params) => {
              if (params) {
                await addMovie({ variables: { addMovieInput: params } });
                refetch();
              }
          }}
        />
      </div>
    </React.Fragment>
  );
};

const MainApp = () => {
    return <ApolloProvider client={apolloClient}><App/></ApolloProvider>

}

ReactDOM.render(<MainApp />, document.getElementById("root"));
