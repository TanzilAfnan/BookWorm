/**
 * Created by tanzi on 30-Sep-18.
 */

//require mongoose module
const mongoose = require('mongoose');
const dbCreds = require('../config').DBCreds;

const dbURL = "mongodb://"+dbCreds.dbUser+":"+dbCreds.dbPassword+"@"+dbCreds.server+"/"+dbCreds.DBName;
const options = {
    useNewUrlParser : true,
    useCreateIndex : true
};

//chalk module to give colors to console text
let chalk = require('chalk');
let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;


mongoose.connect(dbURL, options);

mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});
module.exports = mongoose;


