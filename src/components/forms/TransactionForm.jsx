import React, { useState } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'

const TransactionForm = ({
  value,
  itemError,
  priceError,
  dateError,
  statusError,
}) => {
  
  return (
    <div className='form-wrap'>
      <InputField
        name='item'
        type='text'
        placeholder='Item'
        invalid={itemError}
        value={value ? value.item : ''}
      />

      <InputField
        name='price'
        type='number'
        placeholder='Price'
        invalid={priceError}
        value={value ? value.price : ''}
      />

      <InputField
        name='date'
        type='date'
        placeholder='Date'
        invalid={dateError}
        value={value ? value.date : ''}
      />

      <SelectField
        name='status'
        invalid={statusError}
        value={value ? value.status : ''}
        option={['Waiting', 'Done', 'Cancel']}
      />
    </div>
  )
}

export default TransactionForm