import { useState } from 'react';

const NumberInput = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return <input type="number" value={value} onChange={handleChange} />;
};

export default NumberInput;
