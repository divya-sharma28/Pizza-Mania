import React,{useState} from 'react'
import  '../styles/ToggleComponent.css'

const ToggleComponent = ({setToggle}) => {

    return (
        <div className='d-flex align-items-center justify-content-end '>
            <span className='mt-3'>Veg</span>
            <div className="bauble_box">
            <input className="bauble_input" id="bauble_check" name="bauble" type="checkbox" onChange={(e)=> setToggle(e.target.checked)}/>
                <label className="bauble_label" htmlFor="bauble_check">Toggle</label>
            </div>
            <span className=' mx-3 mt-3'>Non Veg</span>
        </div>
    )
}

export default ToggleComponent