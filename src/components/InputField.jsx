import React from 'react'

const InputField = ({
  name,
  icon,
  placeholder,
  type
}) => {
  return (
    <div className='input-icons'>
      <input type={type} name={name} placeholder={placeholder} />
      <div className='icon'>
        {icon}
      </div>
    </div>
  )
}

export default InputField