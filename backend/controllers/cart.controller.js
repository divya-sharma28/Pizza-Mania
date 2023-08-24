import cartModel from "../models/cart.model";
import pizzaModel from "../models/pizza.model";
import mongoose from "mongoose";


// ================= ADD TO CART ====================
export const addtoCart = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id,"id")
        const pizzaID = new mongoose.Types.ObjectId(id);

        const { price, quantity, size, userID } = req.body;

        const itemExists = await cartModel.findOne({ pizzaID:pizzaID, size:size});
        // console.log(itemExists,"itemExists");

        const data = await pizzaModel.findOne({ _id: pizzaID });
                 
        let updateData, addData;
        if (itemExists) {
            updateData = await cartModel.updateOne({ _id: itemExists._id }, {
                $set: {
                    name: data.name,
                    category: data.category,
                    price: (itemExists.price/itemExists.quantity)*(itemExists.quantity+1),
                    quantity: itemExists.quantity + 1,
                    size: size,
                    image: data.image,
                    pizzaID: data.pizzaID,
                    userID: userID
                }
            });
        } else {
              addData = new cartModel({
                name: data.name,
                category: data.category,
                price: price,
                quantity: quantity,
                size: size,
                image: data.image,
                pizzaID: data._id,
                userID: userID

            });

            addData.save();
        }

        const new_data = await cartModel.findOne({pizzaID:pizzaID});
        // console.log(new_data,"new_data")

        if (addData || updateData) {
            res.status(201).json({
                data: new_data || addData,
                message: "Data saved to database"
            });
        } else {
            res.status(400).json({
                message: "Error while saving data"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error}`
        });
    }
};


// =============== GET CART ======================

export const getCart = async (req, res) => {

    try {
        const getData = await cartModel.find()

        if (getData) {
            res.status(200).json({
                data: getData,
                message: "Data fetched successfully"
            })

        }

        else {
            res.status(400).json({
                message: "Error while fetching data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `"Server Error:${error}`
        })
    }
}

// ============== DELETE ITEM ===============

export const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;        
        const data = await cartModel.findOne({_id:id})
        const deleteData = await cartModel.deleteOne({ _id: id });

        if(deleteData.deletedCount==1){
            res.status(200).json({
                data: data,
                message: "Data deleted successfully"
            })
   
        }
        else {
            res.status(400).json({
                message: "Error while deleting data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `"Server Error:${error}`
        })
    }
}

// =============== QUANTITY UPDATE ======================

export const updateQuantity =async (req,res) =>{
    try {
        const id = req.params.id
        const data = await cartModel.findOne({_id: id});
        // console.log(data,"data")
        const orignalPrice = data.price/data.quantity
        // console.log(orignalPrice,"orignalPrice")

        const {quantity} = req.body

        const updateData  = await cartModel.updateOne({_id:id},{
            $set:{
            name: data.name,
            category: data.category,
            price: orignalPrice*quantity,
            quantity: quantity,
            size: data.size,
            image: data.image,
            pizzaID: data.pizzaID
            }
        })
        const new_data = await cartModel.findOne({_id:id})

        if(updateData){
            res.status(200).json({
                data: new_data,
                message: "Data updated successfully"
            })
        }
        else {
            res.status(400).json({
                message: "Error while updating data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `"Server Error:${error}`
        })
    }
}
