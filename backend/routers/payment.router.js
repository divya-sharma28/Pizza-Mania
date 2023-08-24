 import express from "express";
import { checkout,paymentVerification , razorpayKey, getUserOrder} from "../controllers/payment.controller";

const payRouter = express.Router()

payRouter.post('/order', checkout);
payRouter.post('/payment', paymentVerification);
payRouter.get('/getkey', razorpayKey);
payRouter.get('/user-order/:userID', getUserOrder);



export default payRouter
