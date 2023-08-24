import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../redux/actions/CartAction'
import CartItem from '../components/CartItem'
import { Container, Button, Navbar } from "react-bootstrap"
import ErrorComponent from '../components/ErrorComponent'
import EmptyCartComp from '../components/EmptyCartComp'
import "../styles/CartPage.css"
import {checkout} from '../redux/actions/CartAction'

const CartPage = () => {

  const { cart, error, cartTotal } = useSelector(state => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const userData = JSON.parse(localStorage.getItem("currentUser"))

  const payload ={
    userName: userData.fullName,
    email: userData.email, 
    amount:cartTotal,
    userID: userData._id
  }

  // console.log(payload)

  const orderHandler = (payload)=>{
    dispatch(checkout(payload))
    }
  return (

    <>
      {error ? <ErrorComponent /> : cart.length===0? <EmptyCartComp/>:
        <>
          <Navbar className="bg-dark cartSum justify-content-evenly">
              <h4> <span>subtotal:</span> ₹{cartTotal}/-</h4>
              
              <Button className='order-btn' onClick={()=>orderHandler(payload)}>Order Now</Button> 
              
          </Navbar>
          <Container className='pb-5'>


            {/* <div className='d-flex  align-items-center m-4 cartSum bg-dark'>
         
          </div> */}

            {
              cart.map((val, index) => <CartItem val={val} key={index} />)
            }
          </Container>

        </>
      }
    </>
  )
}

export default CartPage