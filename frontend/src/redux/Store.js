import { configureStore } from "@reduxjs/toolkit";
import PizzaReducer from "./reducers/PizzaReducer";
import CartReducer from "./reducers/CartReducer";
import UserReducer from "./reducers/UserReducer";
import OrdersReducer from "./reducers/OrdersReducer";

export const store = configureStore({
    reducer:{
        pizzas: PizzaReducer,
        cart: CartReducer,
        users: UserReducer,
        orders: OrdersReducer

    }
})