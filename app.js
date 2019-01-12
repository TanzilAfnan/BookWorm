const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// let mongoose = require('./models/db');

const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    //Or we can also wtite the code below with es6
    // schema

    graphiql: true
}));

app.listen(4000, ()=>{
    console.log("Listening to port 4000");
});
// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
//
// const app = express();
//
// // bind express with graphql
// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));
//
// app.listen(4000, () => {
//     console.log('now listening for requests on port 4000');
// });