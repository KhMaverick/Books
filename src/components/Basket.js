import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import All from '../skeleton/All';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Basket = () => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);

    const basketData = useSelector(state => state.BasketArray);
    const dispatch = useDispatch();


    const handleClose = () => setShow(false);
    const handleShow = (ind) => {
        setIndex(ind)
        setShow(true)
    };

    const Del = (ind) => {
        const action = { type: 'DEL', payload: ind };
        dispatch(action);
    }

    return (
        <All>
            <div className='container m-5'>
                <div className="row g-3">
                    {
                        (basketData.length > 0) ? (
                            basketData.map((v, i) => {
                                return <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                                    <div id='mainCard' className='text-center p-2'>
                                        <h6>{v.title}</h6>
                                        <h6 className='text-light'>{v.author}</h6>
                                        <div>
                                            <img className='img-fluid px-3 py-2' src={v.book_image} alt="image" />
                                        </div>
                                        <h6 className='text-danger'>USD$ {v.price}</h6>
                                        <div className="d-flex justify-content-between h-100 align-items-end pb-2">
                                            <button onClick={() => handleShow(i)} className='btn btn-secondary'>
                                                Info
                                            </button>
                                            <button onClick={() => Del(i)} className='btn btn-danger'>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton className='bg-info'>
                                            <Modal.Title>More Information</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="bg-light">
                                            {
                                                (basketData.length > 0) ? (
                                                    <div className='row'>
                                                        <div className="col-6">
                                                            <img className='img-fluid' src={basketData[index].book_image} alt="image" />
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className='m-1'><span className='text-primary'>Title: </span> {basketData[index].title}</h6>
                                                            <h6 className='m-1'><span className='text-primary'>Author: </span> {basketData[index].author}</h6>
                                                            <h6 className='m-1'><span className='text-primary'>Publisher: </span> {basketData[index].publisher}</h6>
                                                            <h6 className='m-1'><span className='text-primary'>Contributor: </span> {basketData[index].contributor}</h6>
                                                            <h6 className='m-1'><span className='text-primary'>Description: </span> {basketData[index].description}</h6>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <h3>Loading</h3>
                                                )
                                            }
                                        </Modal.Body>
                                        <Modal.Footer className='bg-info'>
                                            <Button variant="light" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            })

                        ) : (
                            <h3>Your basket is empty ! Click <Link to='/'>here</Link> to return to main page.</h3>
                        )
                    }
                </div>
            </div>
        </All>
    )
}

export default Basket