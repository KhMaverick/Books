import React from 'react'
import Header from './Header'

const All = ({children}) => {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default All