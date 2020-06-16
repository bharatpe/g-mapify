import React, { useCallback, useState, useRef } from 'react'

import { GMapify, addressFormatter } from 'g-mapify'
import 'g-mapify/dist/index.css'
// import InputDefault from './components/Input';

const App = () => {
  const mapOptions = {
    zoom: 15
  };

  const [showSearchMap, setShowSearchMap] = useState(false);
  const [inputVal, setInputval] = useState('');
  const refs = useRef(null);

  const onMapSelect = useCallback((status, data) => {
    console.warn('Map Data', data);

    // get formatted address from google map address_components
    const formattedAddress = addressFormatter(data.address_components);
    console.warn('formated address', formattedAddress);
  }, []);

  const onMapButtonClicked = useCallback(() => {
    setShowSearchMap(() => {
      return !showSearchMap;
    });
  }, [showSearchMap]);

  return (
  <>
    <button onClick={onMapButtonClicked} disabled={!showSearchMap}>Basic Map</button>
    <button onClick={onMapButtonClicked} disabled={showSearchMap}>Search Map</button>
    
     { 
      !showSearchMap ?
      (
        // Basic example
        <GMapify key={1} mapOptions={mapOptions} appKey="AIzaSyBeZ5-CnQtbhPaEr2u162G-SoCF44lQRAg" mapClassName="h-100" />
      )
      :
      (
        // example with additional options
        <GMapify key={2} mapOptions={mapOptions} appKey="AIzaSyBeZ5-CnQtbhPaEr2u162G-SoCF44lQRAg" mapClassName="h-100" hasSearch onSelect={onMapSelect} />
      )
    }

  </>
  )
}

export default App
