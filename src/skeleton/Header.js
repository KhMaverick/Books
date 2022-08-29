import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
// mui
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
  const searchData = useSelector(state => state.MainArray);
  const basketD = useSelector(state => state.BasketArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const Searching = (val) => {
    let data = searchData.filter(v => {
      return v.title.toLowerCase().includes(val.toLowerCase()) || v.author.toLowerCase().includes(val.toLowerCase());
    })
    const action = { type: 'SEARCH', payload: data }
    dispatch(action);
  }

  const Basket = () => {
    navigate(
      '/basket'
    )
  }

  return (
    <div id='head'>
      <div className="header">
        <div className="container w-100">
          <div className="row align-items-center">
            <div className="col-lg-4 col-sm-4">
              <Link to={'/'} id='link'>
                <h1 className='text-light'>BookSpace</h1>
              </Link>
            </div>
            <div className="col-lg-5 col-sm-7">
              <input className='form-control rounded-pill border-info' type="text" onInput={(val) => Searching(val.target.value)} />
            </div>
            <div className="col-lg-3 col-sm-1">
              <div className="text-end">
                <button className='btn border-0' onClick={() => Basket()}>
                  <Badge badgeContent={basketD.length} color="primary">
                    <AiOutlineShoppingCart color="action" className='fs-3 text-light' />
                  </Badge>
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