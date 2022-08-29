import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import All from '../skeleton/All'
import './style.scss'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.MainArray);
  const data2 = useSelector(state => state.BasketArray);
  const [stateData, setStateData] = useState([])
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);


  const axios = require('axios').default;

  useEffect(() => {

    axios.get('https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade.json?api-key=0nG5do2caU59G7F2PT1eRQD0RAsaX5Du')
      .then(function (response) {
        setStateData(response.data.results.books);
        console.log(data);

      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  const Requesting = () => {

    const action = { type: 'PUSH', payload: stateData };
    dispatch(action);
  }

  const handleClose = () => setShow(false);
  const handleShow = (ind) => {
    setIndex(ind)
    setShow(true)
  };

  const Basket = (ind) => {

    let numb = 0;
    for (let i = 0; i < data2.length; i++) {
      if (data[ind].primary_isbn13 === data2[i].primary_isbn13) {
        numb++
      }
    }

    if (numb > 0) {
      alert('You have already chosen this book !')
    } else {
      const action = { type: 'BASKET', payload: ind }
      dispatch(action)
    }
  }

  return (
    <div>
      <All>
        <div>
          <Link to={'/'} onClick={() => Requesting()} id='link'>
            <h3 className='text-center fw-bold my-3'> Bestselling books </h3>
          </Link>

          <div className="container mb-5">
            <div className="row g-4">
              {
                (data.length > 0) ? (

                  data.map((v, i) => {
                    return <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                      <div id='mainCard' className='text-center p-2'>
                        <h6>{v.title}</h6>
                        <h6 className='text-light'>{v.author}</h6>
                        <div>
                          <img className='img-fluid px-3 py-2' src={v.book_image} alt="image" />
                        </div>
                        <h6 className='text-danger'>USD$ {v.price}</h6>
                        <div className="d-flex justify-content-between h-100 align-items-end pb-2">
                          <button className='btn btn-success border-0' onClick={() => Basket(i)}>
                            < AiOutlineShoppingCart />
                          </button>
                          <button onClick={() => handleShow(i)} className='btn btn-secondary'>
                            Info
                          </button>
                        </div>
                      </div>
                    </div>
                  })
                ) : (
                  <h3>Click on <span className='text-warning'>"Bestselling books"</span> to see bestsellers!</h3>
                )
              }
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='bg-info'>
              <Modal.Title>More Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
              {
                (data.length > 0) ? (
                  <div className='row'>
                    <div className="col-6">
                      <img className='img-fluid' src={data[index].book_image} alt="image" />
                    </div>
                    <div className="col-6">
                      <h6 className='m-1'><span className='text-primary'>Title: </span> {data[index].title}</h6>
                      <h6 className='m-1'><span className='text-primary'>Author: </span> {data[index].author}</h6>
                      <h6 className='m-1'><span className='text-primary'>Publisher: </span> {data[index].publisher}</h6>
                      <h6 className='m-1'><span className='text-primary'>Contributor: </span> {data[index].contributor}</h6>
                      <h6 className='m-1'><span className='text-primary'>Description: </span> {data[index].description}</h6>
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

      </All>

    </div>
  )
}
export default Home