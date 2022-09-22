const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');
const _ = require('lodash');

// destructuring the graphql object

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// define a new MovieType

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        // Type Relations
        // parent refers to the Movie object. the movie object has a property called directorId
        // Director comes form the models.
        // It was set up by mongoose to deal with the directors collection in the database
        // mongoose pluralizes Director into directors
        director: {
            type: DirectorType,
            resolve(parent, args){
                // Director model is used to interact with the directors Collection
                return Director.findById(parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        // here parent refers to the Director object.
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // Mongoose model is used to interact with the movies Collection
                return Movie.find({ directorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // this is one of the queries that you can run in graphiql
        movie: {
            type: MovieType,
            // expect the user to pass arguments
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db
                // the Movie model refers to the movies collection
                return Movie.findById(args.id);
            }
        },
        // this is one of the queries that you can run in graphiql
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db
                // the Director model refers to the directors collection
                return Director.findById(args.id);
            }
        },
        // this is one of the queries that you can run in graphiql
        movies: {
            // one difference is that this is a List of MovieTypes
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // code to get data from db
                // the Movie model referst to the movies collection
                // uses the filter instead to retrieve all the objects
                return Movie.find({});
            }
        },
        // this is one of the queries that you can run in graphiql
        directors: {
            // this is a list of DirectorTypes
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                // code to get data from db
                // the Director model refers  to the directors collection
                return Director.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // one mutation
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                // create local variable director
                let director = new Director({
                    name: args.name,
                    age: args.age
                });
                // update database
                // the director local variable refers to the Director model which in turns refers to the directors collection
                return director.save();
            }
        },
        // another mutation
        addMovie: {
            type: MovieType,
            args: {
                // pay attention to NonNull
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                // create local variable movie
                let movie = new Movie({
                    title: args.title,
                    genre: args.genre,
                    directorId: args.directorId
                });
                // update database
                // the movie local variable refers to the Movie model which in turns refers to the movies collection
                return movie.save();
            }
        }
    }
});

// exports the schema with a query and a mutation

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
