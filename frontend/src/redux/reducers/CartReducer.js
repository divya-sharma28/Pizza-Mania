import { addtoCart, getCart, deleteItem, updateQuantity, checkout } from "../actions/CartAction";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        loading: false,
        error: null,
        cartTotal: 0,
    },

    reducers:{},

    extraReducers:{
        [addtoCart.pending]:(state)=>{
            state.loading = true;
        },
        [addtoCart.fulfilled]:(state,action)=>{
            state.loading = false;
            const new_item = action.payload;
            const itemExists = state.cart.find(item => item._id === new_item._id && item.size=== new_item.size)

            if(itemExists){
                itemExists.quantity += new_item.quantity;
            }
            else{
                state.cart.push(new_item); 
            }
          
    
        },
        [addtoCart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },

        [getCart.pending]:(state)=>{
            state.loading = true;
        },

        [getCart.fulfilled]:(state,action)=>{
            state.loading = false;
            state.cart = action.payload
    
            const priceArr = state.cart.map(val=> val.price);
            const sum = priceArr.reduce((a,b)=> a+b,0)
            state.cartTotal= sum
            // console.log(state.cart, "eeeee")
           
        },

        [getCart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        [deleteItem.pending]:(state)=>{
            state.loading = true;
        },

        [deleteItem.fulfilled]:(state,action)=>{
            state.loading = false;
            const id = action.payload._id;
            if(id){
                state.cart = state.cart.filter(val => val._id !== id)
                state.cartTotal = state.cartTotal - action.payload.price
            }

        },

        [deleteItem.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        
        [updateQuantity.pending]:(state)=>{
            state.loading = true;
        },

        [updateQuantity.fulfilled]:(state,action)=>{
            state.loading = false;
            const id = action.payload._id;
                state.cart = state.cart.map(elem => (
                    elem._id === id? action.payload : elem
                ));
                const priceArr = state.cart.map(val=> val.price);
                const sum = priceArr.reduce((a,b)=> a+b,0)
                state.cartTotal= sum
        },

        [updateQuantity.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },

        [checkout.pending]:(state)=>{
            state.loading = true
        },
        [checkout.fulfilled]:(state,action)=>{
            state.loading = false
        },
        [checkout.rejected]:(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        
    }
})

export default cartSlice.reducer
  
