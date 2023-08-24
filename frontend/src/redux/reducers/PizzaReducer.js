import { getPizza } from "../actions/PizzaAction";

import {createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
    name: "pizzas",
    initialState:{
        pizzas:[],
        loading: false,
        error: null,
        searchPizzaData:""
    },
    reducers:{
        searchPizza:(state,action)=>{
                state.searchPizzaData= action.payload
            
        }
    },

    extraReducers:{
        // Handling promises
        [getPizza.pending]: (state) =>{
            state.loading = true;
        }, 
        [getPizza.fulfilled]:(state,action) =>{
            state.loading = false;
            state.pizzas = action.payload;
        },
        [getPizza.rejected]:(state,action) =>{
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default pizzaSlice.reducer
export const { searchPizza } = pizzaSlice.actions;
