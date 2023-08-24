import React from 'react'
import pizzacry from '../assets/pizzacry.png'
import "../styles/EmptyOrError.css"
import { useNavigate } from 'react-router-dom'

const EmptyCartComp = () => {
    const navigate = useNavigate()
    return (
        <div className='empty'>


        

            <div className='img' onClick={()=> navigate('/') } >
                <img src={pizzacry} alt="crying pizza" height={300} />
            </div>



            <div className='dialog'>
                <span>Add me to your cart !!</span>
            </div>
        </div>


    )
}

export default EmptyCartComp