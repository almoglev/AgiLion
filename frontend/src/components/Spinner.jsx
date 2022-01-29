import React from 'react'
import SpinnerGif from '../assets/spinner.gif'

function Spinner() {
  return <div aign="center">
      <img src={SpinnerGif} alt="loading..." width="100px" height= "100px" />
  </div>;
}

export default Spinner;
