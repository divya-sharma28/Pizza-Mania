import React, { useState, useEffect } from 'react'
import { Modal, Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux"
import { addtoCart, getCart } from '../redux/actions/CartAction';

const PizzaComponent = ({ val, setShowToast  }) => {

    useEffect(() => {
        dispatch(getCart())
    }, [])
    
    const [quantity, setQuantity] = useState(1)
    const [pizzaSize, setPizzaSize] = useState("small")

    const pizzaPrice = val.price[0][pizzaSize] * quantity
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const payload = {
        name: val.name,
        image: val.image,
        category: val.category,
        price: pizzaPrice,
        quantity: quantity,
        size: pizzaSize,
        id: val._id,
        userID : userData?userData._id:''
    }
    const dispatch = useDispatch()

    const addCartItem = (payload) => {
        dispatch(addtoCart(payload))
        setShowToast(true) //---------------------------------------------------------------------------------
    }
    return (
        <div>
       


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ backgroundColor: "#ffee00" }}>
                    <Modal.Title>{val.name}</Modal.Title>
                </Modal.Header>
                <div className='d-flex'>
                    <Modal.Body className='p-0'>
                        <img src={val.image} alt="" className='' />
                    </Modal.Body>
                    <div className='p-4'>
                        {val.description}
                    </div>
                </div>

            </Modal>

            <Card style={{ width: '90%', margin: '15px auto' }}  >
                
                <Card.Body className='pizza-card'>
                <Card.Img variant="top" src={val.image} onClick={handleShow} className='pizza-imgs'/>


<div>
                    <Card.Title className='pizza-title '>{val.name}</Card.Title>
                    <Card.Text className=''>
                        <div className='selecting'>
                        <Form.Select aria-label="Default select example" className=' select' onChange={(e) => setPizzaSize(e.target.value)}>
                            {/* <option value="">Size</option> */}
                            {
                                val.size.map((sizes, ind) => (
                                    <option key={ind} value={sizes}>{sizes}</option>
                                ))
                            }

                        </Form.Select>
                        <Form.Select aria-label="Default select example" className='select' onChange={(e) => setQuantity(e.target.value)}>
                            {/* <option value="">Quantity</option> */}
                            {
                                [...Array(10).keys()].map((x, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))
                            }

                        </Form.Select>
                        </div>
                      
                    </Card.Text>
                    </div>
               

                </Card.Body>
                <div className='d-flex align-items-center justify-content-between pay-add m-3'>
                        <p className='m-0'>₹ {
                            pizzaPrice
                        }</p>
                        {/* TO SEND ALL THESE VALUES AS PAYLOAD:- */}
                        <Button variant="dark" style={{ color: "#ffee00" ,display:"block"}} onClick={() => addCartItem(payload)}  >Add to cart</Button>
                    </div>
            </Card>

        </div>

    )
}

export default PizzaComponent