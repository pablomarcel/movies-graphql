import { gql } from 'apollo-boost';

// queries that are used by apollo to glue to components
// so that the data that comes back from the server can use glued
// as props to the component
// react does not understand graphql so apollo middleware is used to
// manage the translation

const getDirectorsQuery = gql`
    {
        directors {
            name
            id
        }
    }
`;

// these are the kind of queries done in GraphiQL

const getMoviesQuery = gql`
    {
        movies {
            title
            id
        }
    }
`;

// this uses query parameters
// the AddMovie mutation requires the title, genre, and directorID
// all of those require to be non-null

const addMovieMutation = gql`
    mutation AddMovie($title: String!, $genre: String!, $directorId: ID!){
        addMovie(title: $title, genre: $genre, directorId: $directorId){
            title
            id
        }
    }
`;

// this also uses query parameters. requires an id in order to find the movie

const getMovieQuery = gql`
    query GetMovie($id: ID){
        movie(id: $id) {
            id
            title
            genre
            director {
                id
                name
                age
                movies {
                    title
                    id
                }
            }
        }
    }
`;

// export the queries so that they can be used in the components

export { getDirectorsQuery, getMoviesQuery, addMovieMutation, getMovieQuery };
