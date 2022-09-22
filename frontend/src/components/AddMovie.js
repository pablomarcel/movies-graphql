import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getDirectorsQuery, addMovieMutation, getMoviesQuery } from '../queries/queriesMovies';

class AddMovie extends Component {
    constructor(props){
        // state is updated once the user types in the data in the form
        super(props);
        this.state = {
            title: '',
            genre: '',
            directorId: ''
        };
    }
    displayDirectors(){
        var data = this.props.getDirectorsQuery;
        if(data.loading){
            return( <option disabled>Loading directors</option> );
        } else {
            return data.directors.map(director => {
                return( <option key={ director.id } value={director.id}>{ director.name }</option> );
            });
        }
    }

    // if refetchQueries is not used, the new movie will not be displayed in the browser right away. only after a refresh

    submitForm(e){
        e.preventDefault()
        // use the addmovieMutation
        this.props.addMovieMutation({
            variables: {
                title: this.state.title,
                genre: this.state.genre,
                directorId: this.state.directorId
            },
            refetchQueries: [{ query: getMoviesQuery }]
        });
    }
    render(){
        return(
            <form id="add-movie" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Movie Title:</label>
                    <input type="text" onChange={ (e) => this.setState({ title: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Director:</label>
                    <select onChange={ (e) => this.setState({ directorId: e.target.value }) } >
                        <option>Select Director</option>
                        { this.displayDirectors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

// need to use compose to handle multiple queries
// this might be deprecated by now. need to investigate alternatives
// props are added separately as getDirectorsQuery and addMovieMutation to the AddMovie component

export default compose(
    graphql(getDirectorsQuery, { name: "getDirectorsQuery" }),
    graphql(addMovieMutation, { name: "addMovieMutation" })
)(AddMovie);
