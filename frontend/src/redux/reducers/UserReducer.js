import { userRegister, userLogin } from "../actions/UserAction";
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        error: null,
        loading: false,
        registerSuccess: null,
        loginSuccess: null,
        currentUser:{},
    },
    reducers:{},
    extraReducers:{
        [userRegister.pending] :(state) =>{
            state.loading = true
            state.registerSuccess = null

        },
        [userRegister.fulfilled]: (state,action) =>{
            state.loading = false;
            state.users = [...state.users, action.payload];
            state.registerSuccess = true

        },

        [userRegister.rejected]: (state, action) =>{
            state.loading = false;
            state.error = action.payload
            state.registerSuccess = false

        },
    
        [userLogin.pending] :(state) =>{
            state.loading = true
            state.loginSuccess = null

        },
        [userLogin.fulfilled]: (state,action) =>{
            state.loading = false;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('currentUser',  JSON.stringify(action.payload.data));
            state.currentUser = action.payload;
            state.loginSuccess = true

        },
        [userLogin.rejected]: (state, action) =>{
            state.loading = false,
            state.error= action.payload
            state.loginSuccess = false

        }
    }

})

export default userSlice.reducer  