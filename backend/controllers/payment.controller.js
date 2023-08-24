import { instance } from "../index"
import crypto from 'crypto'
import paymentModel from "../models/payment.model"
import cartModel from "../models/cart.model"
import orderModel from "../models/processOrder.model"

export const checkout = async (req, res) => {
   try {
      const { amount, userID } = req.body

      const options = {
         amount: amount * 100,
         currency: "INR", 
         // receipt: "order_rcptid_11"
      };

      instance.orders.create(options, async function  (err, order) {
         if (err) {
            res.status(400).json({
               message: err
            })
         }
         else {

         const orderData = new orderModel({
            userID: userID,
            order: order
         })

         orderData.save()

          res.status(200).json({
             data:orderData
         })

      
    
      }
   })
  

   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error.message}`
      })
   }
 
}

// BdThB-9nzNyXUgQ


export const paymentVerification = async (req, res) => {
   try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
      
      const orderFind = await orderModel.findOne({['order.id']:razorpay_order_id})
      const userID = orderFind.userID
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto

         .createHmac("sha256",process.env.KEY_SECRET)

         .update(body.toString())

         .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature

      if (isAuthentic) {

         const userCart = await cartModel.find({userID:userID})
         // console.log(userCart)

         await paymentModel.create({
            paymentID: razorpay_payment_id,
            orderID: razorpay_order_id,
            signature: razorpay_signature,
            userID: userID,
            userOrder: userCart,
            orderTotal: orderFind.order.amount/100
         })

         await cartModel.deleteMany({userID: userID})
 
         res.redirect(`http://localhost:5173?reference=${razorpay_payment_id}`)
      }
      else {
         res.status(400).json({
            success: false,
         });
      }

   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error}`
      })
   }

}

export const razorpayKey = (req, res) => {

   try {

      res.status(200).json({
         key: process.env.KEY_ID
      })
   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error}`
      })
   }
}


export const getUserOrder = async (req,res)=>{
try {

   const userID = req.params.userID
   console.log(userID)
   const getData = await paymentModel.find({userID: userID});
   console.log(getData,"getData")

   if (getData) {
      res.status(200).json({
         data: getData,
         message: 'data fetched successfully!'
      })
   }

   else{
      res.status(400).json({
         message: 'Failed to fetch data!'
      })
   }

} catch (error) {
   res.status(500).json({
      message: `Server Error ${error}`
   })
}
}
// export const getOrders = async (req,res)=>{
// try {
//    const getData = await paymentModel.find()

// } catch (error) {
   
// }
// }