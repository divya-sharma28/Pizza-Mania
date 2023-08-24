import React, { useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux'
import { userRegister } from '../redux/actions/UserAction';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import ToastComp from '../components/ToastComp';
import '../styles/AuthPage.css';

const RegisterSchema = Yup.object().shape({

    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Required'),

    password: Yup.string()
        .min(5, 'Minimun character should be 5')
        .required('Required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});


const UserRegisterComp = () => {

    const { error,registerSuccess } = useSelector(state => state.users)

    // STATES FOR PASSWORDS SHOW AND HIDE
    const [showPass, setShowPass] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfPass, setShowConfPass] = useState(false)

    const [showToast, setShowToast] = useState(false);


useEffect(() => {
    if(registerSuccess){
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            navigate('/pizzamania/login')
          }, 2000); 
       } 


}, [registerSuccess])



    // FUNCTIONS HANDLING SHOW AND HIDE PASSWORD
    const passwordHandler = () => {
        setShowPass(!showPass)
    }
    const passwordConfHandler = () => {
        setShowConfPass(!showConfPass)
    }


   
    
    const handleSubmit = async (values ,{ resetForm }) => {
        // same shape as initial values
        console.log(values);
        dispatch(userRegister(values));
        resetForm()
        

      
     
    }





    return (
        <>
            {registerSuccess && (
                <ToastComp
                    showToast={showToast}
                    setShowToast={setShowToast}
                    toastMessage={<h5>Registered Successfully! Please Login</h5>}
                />
            )}

<div className='w-100 position-relative authenticate'>
      <div className='tab-switch text-black'>
      <h4>Register</h4>
            <div>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',

                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}>

                    {({ errors, touched }) => (

                        <Form className='auth-form'>

                            <Field name="fullName" className='input' placeholder='Full Name' />
                            {errors.fullName && touched.fullName ? (
                                <span className='error-msg ms-auto'>*{errors.fullName}</span>
                            ) : null}

                            <Field name="email" type="email" placeholder='Email' className='input' />
                            {errors.email && touched.email ?
                                <span className='error-msg ms-auto'>*{errors.email}</span> : null}

                            <div className='password-box'>
                                <Field name="password" placeholder='Password' type={showPass ? "text" : "password"} className='input' />
                                {/* <i className="fa-regular fa-eye" ></i> */}
                                <i className={showPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} onClick={passwordHandler} name="eye"></i>
                            </div>

                            {errors.password && touched.password ? (
                                <span className='error-msg ms-auto '>*{errors.password}</span>
                            ) : null}
                            <div className='password-box'>

                                <Field name="confirmPassword" placeholder='Confirm Password' type={showConfPass ? "text" : "password"} className='input' />
                                <i className={showConfPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} onClick={passwordConfHandler} name="eye"></i>

                            </div>
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <span className='error-msg text-end'>*{errors.confirmPassword}</span>
                            ) : null}

                            <button type="submit" className='text-white'>Submit</button>


                        </Form>
                    )}
                </Formik>
                <h6 className={registerSuccess?"text-success  mx-auto":"text-danger mx-auto"}>{registerSuccess? 'Registered Successfully': error}</h6>
                    <Link to="/pizzamania/login" className='auth-link'>Already a user?</Link>
            </div>
      </div>
    </div>
            
        </>
    )
}

export default UserRegisterComp