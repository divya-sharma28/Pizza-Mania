import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const ToastComp = ({showToast, setShowToast,toastMessage}) => {
  return (
    <>
     
        <ToastContainer position='middle-center'className='position-fixed' >
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={2500} autohide closebutton="false" bg='success' >

                    <Toast.Body>
                        <i className="fa-regular fa-circle-check fs-1" style={{ color: "#ffee00" }}></i>
                        <h5 className='text-white'>{toastMessage}</h5>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
    </>
  )
}

export default ToastComp