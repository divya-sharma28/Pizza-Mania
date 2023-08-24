import express from "express"
import { addPizza, getPizza, updatePizza } from "../controllers/pizza.controller";

const pizzaRouter = express.Router()

pizzaRouter.post('/add-pizza',addPizza)
pizzaRouter.get('/get-pizza',getPizza)
pizzaRouter.patch('/update-pizza/:id',updatePizza)

export default pizzaRouter;