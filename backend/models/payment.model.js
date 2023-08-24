import mongoose from "mongoose";

const Schema = mongoose.Schema

const dateObject = new Date()
const d1= dateObject.getDate()
const d2= dateObject.getMonth() + 1
const d3= dateObject.getFullYear()
const paymentSchema = new Schema({
    paymentID:{
        type: String,
        required: true
    },
    orderID:{
        type: String,
        required: true
    },
    signature:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    userOrder:{
        type: Array,
        required: true
    },
    orderTotal:{
        type: Number,
        required: true
    },
    Date:{
        type: String,
        default: `${d1}/${d2}/${d3}`
    }
},
{
    timestamps: true,

})

export default mongoose.model('payment', paymentSchema)
 

 
