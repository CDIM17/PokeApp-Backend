const {Schema,model} = require('mongoose');

const UserSchema = Schema({

    createdDate:{
        type:Date,
        default: Date.now,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'USER'
    }

});

module.exports = model('User',UserSchema);