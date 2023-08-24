import React from 'react';
import pizzacry from '../assets/pizzacry.png'
import "../styles/EmptyOrError.css"

const ErrorComponent = () => {
  return (
    <div className='error'>

      <div className="img">
        <img src={pizzacry} alt="crying pizza"  height={300}/>
      </div>
        
        <div className="dialog">
        <span> Oops!! Something went wrong...</span>
        </div>
    </div>
  )
}

export default ErrorComponent