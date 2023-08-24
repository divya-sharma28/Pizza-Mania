import axios from "axios"
import {createAsyncThunk} from "@reduxjs/toolkit"

export const getPizza = createAsyncThunk("getPizza", async(args,{rejectWithValue})=>{

    const response = await axios.get(`http://localhost:4123/pizza-mania/get-pizza`)
        try {
            const result = response.data.data
            return result
        } catch (error) {
            return rejectWithValue(error)
        }  
}) 
