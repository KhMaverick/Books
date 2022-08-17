import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import All from '../skeleton/All'
import './style.scss'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const [stateData, setStateData] = useState([])

  const axios = require('axios').default;

  useEffect(() => {

    axios.get('https://api.nytimes.com/svc/books/v3/lists/current/childrens-middle-grade.json?api-key=0nG5do2caU59G7F2PT1eRQD0RAsaX5Du')
      .then(function (response) {
        console.log(response.data.results.books);
        setStateData(response.data.results.books);
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  const Requesting = () => {
    const action = { type: 'PUSH', payload: stateData };
    dispatch(action);
    console.log(data);
  }

  const Info =(ind)=>{
    const action = { type: 'INFO', payload: stateData };
    dispatch(action);

  }

  return (
    <div>
      <All>
        <div>
          <Link to={'/'} onClick={() => Requesting()} id='link'>
            <h3 className='text-center fw-bold my-3'> Bestselling books </h3>
          </Link>

          <div className="container">
            <div className="row">
              {
                (data.length > 0) ? (
                  data.map((v, i) => {
                    return <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                      <div  id='mainCard' className='text-center my-3 m-2 p-2'>
                        <h6>{v.title}</h6>
                        <h5 className='text-secondary'>{v.author}</h5>
                        <img className='img-fluid px-3 py-2' src={v.book_image} alt="image" />
                        <h6 className='text-danger'>USD$ {v.price}</h6>
                        <div className="d-flex justify-content-between">
                          <button className='btn border-0 fs-3'>
                            <AiOutlineShoppingCart/>
                          </button>
                          <Link to={'/about'}  onClick={()=>Info(i)} className='btn btn-secondary'>
                            Info
                          </Link>
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


        </div>

      </All>

    </div>
  )
}

export default Home