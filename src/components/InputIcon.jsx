import React from 'react'

const InputIcon = ({
  name,
  icon,
  placeholder,
  type,
  invalid,
}) => {
  return (
    <div className='input-icons'>
      <input 
        className={invalid ? 'invalid' : ''} 
        type={type} 
        name={name} 
        placeholder={placeholder}
        autoComplete={type == 'password' ? 'on' : 'off'}
      />
      <div className='icon'>
        {icon}
      </div>
      <div className={'validation-message ' + (invalid ? 'show' : 'hide')}>
        * {invalid}
      </div>
    </div>
  )
}

export default InputIcon