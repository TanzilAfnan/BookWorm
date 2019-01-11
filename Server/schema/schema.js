const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const books = [
    {name: 'Children Of Time', genre: 'sifi', id: '1', authorId: '1'},
    {name: 'Harry Potter 1', genre: 'fantacy', id: '2', authorId: '2'},
    {name: 'Harry Potter 2', genre: 'fantacy', id: '3', authorId: '2'},
    {name: 'Harry Potter 3', genre: 'fantacy', id: '4', authorId: '2'},
    {name: 'Harry Potter 4', genre: 'fantacy', id: '5', authorId: '2'},
    {name: 'The Martian', genre: 'sifi', id: '6', authorId: '3'},
    {name: 'mindset the new psychology of success', genre: 'psychology', id: '7', authorId: '4'}
];

const authors = [
    {name: 'Adrian Tchaikovsky', age: 55, id: '1'},
    {name: 'jk rowling', genre: 65, id: '2'},
    {name: 'Andy Weir', genre: 50, id: '3'},
    {name: 'Carol Dweck', genre: 50, id: '4'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList (BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }

        },
        authors: {
          type: new GraphQLList(AuthorType),
            resolve(parent, args){
              return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});