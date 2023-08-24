import React from 'react'
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { deleteItem} from '../redux/actions/CartAction';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/actions/CartAction';
import "../styles/CartItem.css"



const   CartItem = ({val}) => {
    const handleOver = (e) => {
        e.target.className = 'fa-solid fa-trash fa-bounce'
    }
    const handleOut = (e) => {
        e.target.className = 'fa-solid fa-trash'
    }
    const inc_payload = {
            ...val,
            quantity: val.quantity + 1,
            price:  (val.price/val.quantity)*(val.quantity + 1)
    }
    const dec_payload = {
            ...val,
            quantity: val.quantity>1? val.quantity - 1  : 1,
            price:  (val.price/val.quantity)*(val.quantity - 1)
    }
    const dispatch = useDispatch()
    return (
        <>{
            <Row className=' text-dark item-row bg-white rounded-5 m-1 p-1' >
                <Col className='column col-6 col-sm-2'>
                    <img src={val.image} alt={val.name} height={100} width={100} className='rounded-5' />
                </Col>

                <Col className='column' s={4} xs={6}>
                    <div>
                        <h5>{val.name}</h5>
                        <div className='d-flex justify-content-center'>
                            <h6 style={val.category=="veg"? {color:"green"}: {color:"red"}}>{val.category}</h6>
                            <h6>[{val.size}]</h6>
                        </div>
                    </div>
                </Col>


                <Col className='column' s={6}>
                    <div className='d-flex w-100 justify-content-around align-items-center'>
                        <h6>₹{val.price}</h6>
                        <div className='d-flex align-items-center me-3 justify-content-between quan-group'>
                            <Button onClick={()=> dispatch(updateQuantity(inc_payload))} className='quan-btn' ><i className='fa-solid fa-plus'></i></Button>
                            <h6>{val.quantity}</h6>
                            <Button onClick={()=> dispatch(updateQuantity(dec_payload))} className='quan-btn'><i className='fa-solid fa-minus'></i></Button>
                        </div>

                        <Button variant="danger" onClick={() => dispatch(deleteItem(val && val._id))}>
                            <i className="fa-solid fa-trash" onMouseOver={handleOver} onMouseOut={handleOut}></i>
                        </Button>
                    </div>

                </Col>

            </Row>

        }
        </>

    )
}

export default CartItem