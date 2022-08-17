import React, { useState } from 'react'
// import './Header.css'
// import { AiFillHeart, AiOutlineUser } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const searchData = useSelector(state=>state);
  const dispatch = useDispatch();
  const [inval, setInval] = useState("");


  const Searching =()=>{
    let data = searchData.filter(v=>{
      return v.title.toLowerCase().includes(inval.toLowerCase()) || v.author.toLowerCase().includes(inval.toLowerCase());
    })
    
    const action = { type: 'SEARCH',  payload: data}
    dispatch(action);
  }
  // Searching();

  return (
    <div>
      <div className="header bg-info">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4">
              <h1 className='text-light'>BookSpace</h1>
            </div>
            <div className="col-5">
              <input className='form-control rounded-pill border-info' type="text" onInput={()=>Searching()} onChange={(v)=>setInval(v.target.value)}/>
            </div>
            <div className="col-2">
              <div className="text-end">
                <button type="button" className="btn btn-primary mt-2 rounded-circle position-relative">
                <AiOutlineShoppingCart/>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    +4
                    {/* <span className="visually-hidden">Added ones</span> */}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header