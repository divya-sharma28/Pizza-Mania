import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectID,
        required: true
    },
    order:{
        type: Object,
        required: true
    }
},
{
    timestamps: true,

})

export default mongoose.model('processOrder', orderSchema)