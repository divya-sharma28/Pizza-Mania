import express from "express"
import { addtoCart, getCart, deleteItem, updateQuantity} from "../controllers/cart.controller"

const cartRouter = express.Router()

 cartRouter.post("/add-to-cart/:id",addtoCart)
 cartRouter.delete("/delete-item/:id",deleteItem)
 cartRouter.get("/cart",getCart)
 cartRouter.patch("/update-item/:id",updateQuantity)


export default cartRouter