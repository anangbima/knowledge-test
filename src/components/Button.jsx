import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  text,
  type,
  to,
}) => {
  return (
    <>
      { type == 'submit' ?
        <button type={'submit'} className='btn'>
          {text}
        </button>
        :
        <Link className='btn' to={to}>
          {text}
        </Link>
      }
    </>
  )
}

export default Button