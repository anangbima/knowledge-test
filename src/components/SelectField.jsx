import React from 'react'

const SelectField = ({
  name,
  value,
  invalid,
  option,
}) => {
  return (
    <div className='input-field'>
      <select 
        name={name} 
        id={name}
        defaultValue={value ? value : ''}
        className= {invalid ? 'invalid' : ''}
      >
        <option>Choose one</option>
        {option.map((o, index) => 
          <option key={index} value={o}>{o}</option>
        )}
      </select>
    </div>
  )
}

export default SelectField