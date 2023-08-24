import mongoose from "mongoose";
const Schema = mongoose.Schema

const pizzaSchema = new Schema({
    name:{
        type:String,
        required: true
    }, 
    size:{
        type:Array,
        required: true
    }, 
    price:{
        type:Array,
        required: true
    }, 
    category:{
        type:String,
        required: true
    }, 
    image:{
        type:String,
        required: true
    }, 
    description:{
        type:String,
        required: true
    }, 

},{
    timestamps: true
})

export default mongoose.model("pizza",pizzaSchema);