import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({

    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }

},{
    timestamps: true
})

export default mongoose.model('user', userSchema);