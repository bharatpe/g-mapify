import React, { useCallback, useState, useRef } from 'react'

import { GMap } from 'g-map'
import 'g-map/dist/index.css'
// import InputDefault from './components/Input';

const App = () => {
  const mapOptions = {
    zoom: 15
  };

  const [showSearch, setShowSearch] = useState(false);
  const [inputVal, setInputval] = useState('');
  const refs = useRef(null);

  const onMapSelect = useCallback((status, data) => {
    console.warn(data);
    setInputval(data.formatted_address);
  }, []);

  return (
  <>
    <GMap mapOptions={mapOptions} appKey="AIzaSyBeZ5-CnQtbhPaEr2u162G-SoCF44lQRAg" mapClassName="h-20">
      
    </GMap>

  </>
  )
}

export default App
