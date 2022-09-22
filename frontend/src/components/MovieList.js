import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMoviesQuery } from '../queries/queriesMovies';

// components
import MovieDetails from './MovieDetails';

class MovieList extends Component {
    constructor(props){
        super(props);
        // the state is needed to handle the click event
        // when the user clicks on a movie, the movie id is passed to the MovieDetails component
        // so that the movie details are displayed on the right portion of the screen
        this.state = {
            selected: null
        }
    }
    displayMovies(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading movies...</div> );
        } else {
            // displays the list of movies
            // also handles the click event and changes the MovieList state
            return data.movies.map(movie => {
                return(
                    <li key={ movie.id } onClick={ (e) => this.setState({ selected: movie.id }) }>{ movie.title }</li>
                );
            })
        }
    }

    // the MovieList state was updated and is passed to the MovieDetails component

    render(){
        return(
            <div>
                <ul id="movie-list">
                    { this.displayMovies() }
                </ul>
                <MovieDetails movieId={ this.state.selected } />
            </div>
        );
    }
}

// bind query to component
// access to the data that comes back from the query
// data stored in the props

export default graphql(getMoviesQuery)(MovieList);
