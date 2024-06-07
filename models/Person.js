const mongoose = require('mongoose');
const {date, string, number} = require("joi");
const {Schema} = require("mongoose");

const PersonSchema = new mongoose.Schema({
    lastname :{
        type : String,
        required : true,
        minlength : 2,
        maxlength :50
    },
    firstname :{
        type : String,
        required : true,
        minlength : 2,
        maxlength :50
    },
    dob:{
        type: Date,
    },
    lieuNaissance:{
        type: String,
    },
    email:{
        type: String,
        required : true,
        unique : true,
    },
    phone:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true,
    },
    role:{
        type: String,
        required : true,
    },
    address:{
        type: String,
    },
    isActivate:{
        type:Boolean
    }

}, { strict: false });


const Person = mongoose.model('Person', PersonSchema);

exports.Person=Person;
exports.PersonSchema = PersonSchema;