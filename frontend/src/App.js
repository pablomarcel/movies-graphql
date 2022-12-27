import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// ApolloProvider wraps the component so that the queries that come back from the server can be glued as props
// client is passed as props

// components
import MovieList from './components/MovieList';
//import AddMovie from './components/AddMovie';

// apollo client setup
const client = new ApolloClient({
    uri: 'https://graphql-movies.herokuapp.com/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <h1>Movies Database</h1>
                    <MovieList />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
