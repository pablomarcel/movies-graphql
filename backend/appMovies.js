const express = require('express');
// returns an object with a property called graphqlHTTP that is the function you want to call
// graphqlHTTP is middleware and is applied to just one route
// graphqlHTTP function accepts options like shcema and graphiql
// graphqlHTTP is used in the route handler
// used to construct an express application based on the graphql schema
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema_movies');
const { mongoose } = require('mongoose');
const cors = require('cors');
const appMovies = express();

// allow cross-origin requests
// this is needed since the server and client are running on different ports
appMovies.use(cors());

// make sure to replace my db string & creds with your own
// mongoose is middleware that handles the communication to the database
// mongoose creates models tied to the database collections

mongoose.connect('mongodb+srv://candy-dev:nIcjQAp7LPdpzDhm@cluster0.xaqhzyx.mongodb.net/movie-database?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// bind express with graphql
// request to /graphql
// graphql middleware
// graphiql true means we can use the graphiql front end @ end point /graphql for testing purposes

appMovies.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

appMovies.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
