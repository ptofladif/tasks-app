const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
})

const User = mongoose.model('User',
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value){
            if(value < 0) throw new Error( "A idade tem de ser superior a 0");
        },
        default: 13
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Introduza uym email válido');
            }
        },
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if( value === 'pass' || value === 'pwd' || value === 'password' ) throw new Error( "Password incorreta");

            // if(value.includes('pass') || value.includes('pwd') || value.includes('password')){

            // }
        }
    }
})

module.exports = User;