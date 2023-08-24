import React from 'react'

const Payment = () => {
  return (
    <div  class="razorpay-embed-btn" data-url="https://pages.razorpay.com/pl_MB4Cz92RqvwS9y/view" data-text="Pay Now" data-color="#528FF0" data-size="large">
        {
          (function(){
            var d=document; var x=!d.getElementById('razorpay-embed-btn-js')
            if(x){ var s=d.createElement('script'); s.defer=!0;s.id='razorpay-embed-btn-js';
            s.src='https://cdn.razorpay.com/static/embed_btn/bundle.js';d.body.appendChild(s);} else{var rzp=window['__rzp__'];
            rzp && rzp.init && rzp.init()}})()   
        }
    </div>
  )
}

export default Payment


    