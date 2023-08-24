import { useEffect } from 'react'
import React from 'react'
import { myOrders } from '../redux/actions/OrdersAction'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/MyOrderPage.css'

const MyOrderPage = () => {
    const { orderInfo } = useSelector(state => state.orders)
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userData._id, "userID")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(myOrders(userData._id))
        console.log(orderInfo,"orderInfo")

    }, [])

    return (
        <div className='mt-4 p-3'>
            <h2 className='order-title'>My Orders</h2>
            {
                orderInfo.map(val => (
                    <div className='order-box container'>
                
                        <p className='date'>{val.Date}</p>

                     
                        <div className=" order align-items-center row  position-relative">
                            <div className="col-12  d-flex align-items-center justify-content-between position-absolute top-0 total-oid">
                            <p className='m-2 '>Total: ₹{val.orderTotal}</p>
                                <p className='small oid'>#{val.orderID.slice(6)}</p>
                            </div>
                            <div className='col-12 pt-2' >{val.userOrder.map(a =>
                            
                                <div className='row justify-content-around '>
                                    
                                       <span className='col-5 '> {a.name}</span>
                                        <span className='me-4 ms-2 small col-1'> {a.size}</span>
                                        <span className='ms-3 col-1 text-center'>{a.quantity} </span>
                                </div>
                            )}</div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default MyOrderPage