 import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import pizzaRouter from "./routers/pizza.router"
import cartRouter from "./routers/cart.router"
import userRouter from "./routers/user.router"
import payRouter from "./routers/payment.router"
import Razorpay from "razorpay"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const db = process.env.DB

var corsOptions = {
  origin: ['http://localhost:5173','http://localhost:5174'],
  optionsSuccessStatus:200
}
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port, ()=> console.log(`Server on port: ${port}`));

mongoose.connect(`${db}/pizzamania`)
  .then(() => console.log(`Connected to pizzamania!`))
  .catch(()=> console.log(`Error connecting to database`));

app.use('/pizza-mania', pizzaRouter)
app.use('/pizza-mania', cartRouter)
app.use('/pizza-mania', userRouter)
app.use('/pizza-mania', payRouter)


export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

