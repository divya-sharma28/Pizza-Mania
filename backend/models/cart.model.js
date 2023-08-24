import mongoose from "mongoose";


const Schema = mongoose.Schema

const cartSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    pizzaID:{
        type: Object,
        required: true
    },
    userID:{
        type: Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true,

});

export default mongoose.model("cart", cartSchema);

