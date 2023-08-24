import React, { useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../redux/actions/UserAction';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/actions/UserAction';
import '../styles/AuthPage.css';


//  VALIDATION FOR USER LOGIN
const LoginSchema = Yup.object().shape({

    email: Yup.string()
        .required('Required'),

    password: Yup.string()
        .required('Required')
});

const UserLoginComp = () => {

    const [showPass, setShowPass] = useState(false)

    const passwordHandler = (e) => {
        setShowPass(!showPass)
    }

    const {error,loginSuccess} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let isLogged;
    useEffect(() => {
        loginSuccess&& navigate('/')
    }, [loginSuccess])
    
    return (
        <div className='w-100 position-relative authenticate'>
            <div className='tab-switch text-black'>
                <h4>Login</h4>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',

                    }}
                    validationSchema={LoginSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        dispatch(userLogin(values));

                        


                    }}
                >

                    {({ errors, touched }) => (
                        <Form className='auth-form'>
                            <Field name="email" className='input' placeholder='Email' type='email' />
                            {errors.email && touched.email ? (
                                <span className='error-msg ms-auto'>*{errors.email}</span>
                            ) : null}
                            <div className='password-box'>
                                <Field name="password" className='input' placeholder='Password' type={showPass ? "text" : "password"} />
                                <i className={showPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} onClick={passwordHandler} name="eye"></i>
                            </div>
                            {errors.password && touched.password ? (
                                <span className='error-msg ms-auto'>*{errors.password}</span>
                            ) : null}
                            <button type='submit'>Login</button>


                        </Form>)}

                </Formik>
                <h6 className={loginSuccess?"text-success mx-auto":"text-danger mx-auto"}>{loginSuccess? 'Logged In Successfully': error}</h6>
                    <Link to="/pizzamania/register" className='auth-link'>New user?</Link>

            </div>
        </div>

    )
}

export default UserLoginComp