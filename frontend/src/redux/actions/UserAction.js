import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'


export const userRegister = createAsyncThunk("userRegister", async(payload,{rejectWithValue})=>{

    
    try {
        const response = await axios.post(`http://localhost:4123/pizza-mania/user-register`, payload)


            const result = response.data.data

            return result 

            

        

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})


export const userLogin = createAsyncThunk("userLogin", async(payload, {rejectWithValue})=>{

    try {   
        const response = await axios.post(`http://localhost:4123/pizza-mania/user-login`, payload)
        const result = response.data

        return result

    } catch (error) {
        console.log(error)
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message)
    }

})


