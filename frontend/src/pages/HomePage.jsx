import React, { useEffect, useState } from 'react';
import PizzaComponent from '../components/PizzaComponent';
import { Col, Container, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPizza } from '../redux/actions/PizzaAction';
import { getCart } from '../redux/actions/CartAction';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';
import ToggleComponent from '../components/ToggleComponent';
import ToastComp from '../components/ToastComp';
import SearchPizzaComp from '../components/SearchPizzaComp';
import '../styles/HomePage.css'

const HomePage = () => {

  let { pizzas, loading, error, searchPizzaData} = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(true);
  const [toggle, setToggle] = useState(false)
  const [showToast, setShowToast] = useState(false);


  const filteredPizzas = pizzas && pizzas.filter(val => toggle ? val.category === "nonveg" : val.category === "veg")

  useEffect(() => {

    dispatch(getPizza());
    dispatch(getCart());

    // To increase loading time
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    // Set the delay in milliseconds (2 seconds in this example)
  }, []);

  // console.log(pizzas);

  return (
    < >
      {showLoader || loading ? (
        <Loader />
      ) : error ? <ErrorComponent /> : (
        <>
        <Container >
          <ToastComp showToast={showToast} setShowToast={setShowToast} toastMessage={'Added to Cart!!'} />
          <Row >
          <div className='d-flex flex-wrap-reverse justify-content-sm-between align-items-center col-12 px-5 justify-content-center'>
          <SearchPizzaComp/>
            <ToggleComponent setToggle={setToggle} />
          </div>
          

            {
              filteredPizzas&& filteredPizzas.filter((pizzaName) => {
                return pizzaName.name.toLowerCase().includes(searchPizzaData.toLowerCase())
              }).map((val, index) => (
                <Col lg={4} sm={6}  key={index}>
                  <PizzaComponent val={val} setShowToast={setShowToast} />
                </Col>
              ))
            }
          </Row>
        </Container>
        </>
      )}
    </>
  );
};

export default HomePage;
