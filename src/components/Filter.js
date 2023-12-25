import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

function Filter(props) {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [sdt, setSdt] = useState('');
  const [edt, setEdt] = useState('');

  const handleChangeState = event => {
    setState(event.target.value);
  };

  const handleChangeCity = event => {
    setCity(event.target.value);
  };

  const handleChangeSdt = event => {
    setSdt(event.target.value);
  };

  const handleChangeEdt = event => {
    setEdt(event.target.value);
  };

  const handleClick = event => {
    event.preventDefault();
    
    // Pass the filter criteria to the parent component (Eventtest)
    props.onFilter(state, city, sdt, edt);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="State" variant="outlined" onChange={handleChangeState} />
        <TextField id="filled-basic" label="City" variant="outlined" onChange={handleChangeCity} />
        <TextField id="standard-basic" label="Start Date Time" variant="outlined" onChange={handleChangeSdt} />
        <TextField id="standard-basic" label="End Date Time" variant="outlined" onChange={handleChangeEdt} />
        <Button variant="contained" onClick={handleClick}>Submit</Button>
      </Box>
    </div>
  );
}

export default Filter;
