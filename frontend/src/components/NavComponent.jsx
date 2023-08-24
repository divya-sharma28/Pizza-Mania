import React,{useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cartImg from '../assets/carts.png'
import Badge from 'react-bootstrap/Badge';
import {getCart} from "../redux/actions/CartAction"
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import logo from '../assets/logo-1.png'



import '../styles/NavComponent.css'
import { Offcanvas } from 'react-bootstrap';

const NavComponent = () => {

const {cart} = useSelector(state => state.cart)
let {currentUser} = useSelector(state => state.users)
  
const positioning ={
  bottom: "15px",
  left: "26px"
}

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(()=>{
  dispatch(getCart())
},[])

const userLogout = () =>{
  // navigate('/pizzamania/login')
  window.location.href = "/pizzamania/login"
  localStorage.removeItem('token')
  localStorage.removeItem('currentUser')
  currentUser={} 

  }


const userData = JSON.parse(localStorage.getItem('currentUser'));
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" className='navbar sticky-top' >
        <Container>

          <Navbar.Brand>
             <Link to="/" className='brandName'>
              <img src={logo} alt="" className='logo' />
             </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleShow} />

          <Navbar.Offcanvas id="responsive-navbar-nav">
            

            <Nav className="ms-auto">

            {userData?<span className='navlink fs-6'>{'Hi '+userData.fullName}!</span>: null}


                <Link to='/'  className='navlink' > Home </Link>
                <Link to="/pizzamania/myOrders" className='navlink'>My Orders</Link>
                <p className='navlink' onClick={userLogout}>{currentUser?'Logout':'Login'}</p>



             { <Link to={!userData?"/pizzamania/login": '/cart'} className='navlink'>
                
                <div className=' position-relative' style={{width:'50px',margin:"auto"}}>
                <img src={cartImg} alt="" style={{ height: "30px" }} />

                <Badge pill bg="light" text="dark" className=' position-absolute' style={positioning}>
                  {cart.length}
                </Badge>

                </div>
              </Link>}
              
            </Nav>

          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
  }

export default NavComponent