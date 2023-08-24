import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addtoCart = createAsyncThunk("addToCart",async(payload,{rejectWithValue})=>{
    // console.log(payload.id,"payloadID")
    const response = await axios.post(`http://localhost:4123/pizza-mania/add-to-cart/${payload.id}`,payload)
    // console.log(response,"response")

    try {
        const result = response.data.data
        // console.log(result,"result")
        return result

    }  catch (error) {
        return rejectWithValue(error)
    }  
} )

export const getCart = createAsyncThunk("getCart",async(args,{rejectWithValue})=>{
    const response = await axios.get(`http://localhost:4123/pizza-mania/cart`)
    try {
        const result = response.data.data
        return result

    }  catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteItem = createAsyncThunk("deleteItem", async(id, {rejectWithValue})=>{
    const response = await axios.delete(`http://localhost:4123/pizza-mania/delete-item/${id}`)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateQuantity = createAsyncThunk("updateQuantity", async(payload, {rejectWithValue })=>{
    const response = await axios.patch(`http://localhost:4123/pizza-mania/update-item/${payload._id}`,payload)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

export const checkout = createAsyncThunk("checkout", async(payload, {rejectWithValue})=>{
    
     const response = await axios.post(`http://localhost:4123/pizza-mania/order`,payload)
     const key= await axios.get('http://localhost:4123/pizza-mania/getkey')
     try{
        const result = response.data.data
        console.log(razor,"raz")

        // console.log(response)
        const options = {
            key: key.data.key, // Enter the Key ID generated from the Dashboard
            amount: payload.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Pizza Mania",
            description: "Razorpay Transaction",
            image: "https://cdn.razorpay.com/logos/MBGIR4aTtrWckU_medium.png",
            order_id: result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            userID: result.userID,
            callback_url: "http://localhost:4123/pizza-mania/payment",
            prefill: {
                name: payload.userName,
                email: payload.email,
            },
            notes: {
                address: "Pizza Mania pvt ltd"
            },
            theme: {
                color: "#ffee00" 
            },
        };
        var razor = new window.Razorpay(options);
        razor.open();

        console.log(result,"result")
        return result
         
     }
     catch(error){
        console.log(error)
        return rejectWithValue(error)
    }
})