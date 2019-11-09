const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://localhost:27017/yujin_data',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})

const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error
        }
    },
    password :{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type: String,
        required:true,
    },
    contact:{
        type :Number,
        required:true,
        minlength:10,
        maxlength:10
    }
})
const Users = mongoose.model('Users',userSchema)

module.exports = Users