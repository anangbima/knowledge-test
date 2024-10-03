import React, { useState } from 'react'
import InputField from '../InputField'
import SelectField from '../SelectField'

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
        value={value ? value.item : ''}
      />

      <InputField
        name='price'
        type='number'
        placeholder='Price'
        invalid={isValidate}
        value={value ? value.price : ''}
      />

      <InputField
        name='date'
        type='date'
        placeholder='Date'
        invalid={isValidate}
        value={value ? value.date : ''}
      />

      <SelectField
        name='status'
        invalid={isValidate}
        value={value ? value.status : ''}
        option={['Waiting', 'Done', 'Cancel']}
      />
    </div>
  )
}

export default TransactionForm