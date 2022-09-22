import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMovieQuery } from '../queries/queriesMovies';

// the getMovieQuery has nested objects, movie->director->movies
// that's why you can iterate over the movies by director

class MovieDetails extends Component {
    displayMovieDetails(){
        const { movie } = this.props.data;
        if(movie){
            return(
                <div>
                    <h2>{ movie.title }</h2>
                    <p>{ movie.genre }</p>
                    <p>{ movie.director.name }</p>
                    <p>All movies by this director:</p>
                    <ul id="details-list">
                        { movie.director.movies.map(item => {
                            return <li key={item.id}>{ item.title }</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return( <div>No Movie selected...</div> );
        }
    }
    render(){
        return(
            <div id="movie-details">
                { this.displayMovieDetails() }
            </div>
        );
    }
}

// bind query to component
// access to the data that comes back from the query
// data stored in the props

export default graphql(getMovieQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.movieId
            }
        }
    }
})(MovieDetails);
