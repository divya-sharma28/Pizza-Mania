import React from 'react'
import { Modal} from 'react-bootstrap';



const ModalComp = ({showModal, setShowModal}) => {

    const handleClose = () => setShowModal(false);
  return (
    <>
           <Modal
                show={showModal}
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

    </>
  )
}

export default ModalComp