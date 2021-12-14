import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddMovieInput = {
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  isFlop: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['DateTime']>;
  source?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovie: Movie;
};


export type MutationAddMovieArgs = {
  addMovieInput: AddMovieInput;
};

export type Query = {
  __typename?: 'Query';
  movie: Movie;
  movies: Array<Movie>;
};

export type GetAllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', name?: string | null | undefined, isFlop: boolean, releaseDate?: any | null | undefined, source?: string | null | undefined }> };

export type AddMovieMutationVariables = Exact<{
  addMovieInput: AddMovieInput;
}>;


export type AddMovieMutation = { __typename?: 'Mutation', addMovie: { __typename?: 'Movie', name?: string | null | undefined, isFlop: boolean, releaseDate?: any | null | undefined, source?: string | null | undefined } };


export const GetAllMoviesDocument = gql`
    query GetAllMovies {
  movies {
    name
    isFlop
    releaseDate
    source
  }
}
    `;

/**
 * __useGetAllMoviesQuery__
 *
 * To run a query within a React component, call `useGetAllMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
      }
export function useGetAllMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
        }
export type GetAllMoviesQueryHookResult = ReturnType<typeof useGetAllMoviesQuery>;
export type GetAllMoviesLazyQueryHookResult = ReturnType<typeof useGetAllMoviesLazyQuery>;
export type GetAllMoviesQueryResult = Apollo.QueryResult<GetAllMoviesQuery, GetAllMoviesQueryVariables>;
export const AddMovieDocument = gql`
    mutation AddMovie($addMovieInput: AddMovieInput!) {
  addMovie(addMovieInput: $addMovieInput) {
    name
    isFlop
    releaseDate
    source
  }
}
    `;
export type AddMovieMutationFn = Apollo.MutationFunction<AddMovieMutation, AddMovieMutationVariables>;

/**
 * __useAddMovieMutation__
 *
 * To run a mutation, you first call `useAddMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieMutation, { data, loading, error }] = useAddMovieMutation({
 *   variables: {
 *      addMovieInput: // value for 'addMovieInput'
 *   },
 * });
 */
export function useAddMovieMutation(baseOptions?: Apollo.MutationHookOptions<AddMovieMutation, AddMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMovieMutation, AddMovieMutationVariables>(AddMovieDocument, options);
      }
export type AddMovieMutationHookResult = ReturnType<typeof useAddMovieMutation>;
export type AddMovieMutationResult = Apollo.MutationResult<AddMovieMutation>;
export type AddMovieMutationOptions = Apollo.BaseMutationOptions<AddMovieMutation, AddMovieMutationVariables>;