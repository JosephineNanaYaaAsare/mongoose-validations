const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        minLength: [6, "password too short"]

    }
})

module.exports = model("user" ,userSchema)