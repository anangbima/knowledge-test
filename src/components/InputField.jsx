import React from 'react'

const InputField = ({
  name,
  placeholder,
  type,
  invalid,
  value,
}) => {
  return (
    <div className='input-field'>
      <input 
        className= {invalid ? 'invalid' : ''}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={value ? value : ''}
      />
      <div className={'validation-message ' + (invalid ? 'show' : 'hide')}>
        * {invalid}
      </div>
    </div>
  )
}

export default InputField