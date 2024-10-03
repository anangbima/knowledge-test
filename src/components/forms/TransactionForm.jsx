import React, { useState } from 'react'
import InputField from '../InputField'

const TransactionForm = ({
  isValidate,
  value
}) => {
  

  return (
    <div className='form-wrap'>
      <InputField
        name='item'
        type='text'
        placeholder='Item'
        invalid={isValidate}
        value={value.item}
      />

      <InputField
        name='price'
        type='number'
        placeholder='Price'
        invalid={isValidate}
        value={value.price}
      />

      <InputField
        name='date'
        type='date'
        placeholder='Date'
        invalid={isValidate}
        value={value.date}
      />

      <InputField
        name='status'
        type='text'
        placeholder='Status'
        invalid={isValidate}
        value={value.status}
      />
    </div>
  )
}

export default TransactionForm