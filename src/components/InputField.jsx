import React from 'react'

const InputField = ({
  name,
  icon,
  placeholder,
  type,
  invalid,
}) => {
  return (
    <div className='input-icons'>
      <input 
        className={invalid && 'invalid'} 
        type={type} 
        name={name} 
        placeholder={placeholder}
        autoComplete={type == 'password' ? 'on' : 'off'}
      />
      <div className='icon'>
        {icon}
      </div>
    </div>
  )
}

export default InputField