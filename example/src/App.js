import React, { useCallback, useState, useRef } from 'react'

import { GMap } from 'g-map'
import 'g-map/dist/index.css'
// import InputDefault from './components/Input';

const App = () => {
  const mapOptions = {
    zoom: 15
  };

  const [showSearchMap, setShowSearchMap] = useState(false);
  const [inputVal, setInputval] = useState('');
  const refs = useRef(null);

  const onMapSelect = useCallback((status, data) => {
    console.warn(data);
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
        <GMap key={1} mapOptions={mapOptions} appKey="AIzaSyBeZ5-CnQtbhPaEr2u162G-SoCF44lQRAg" mapClassName="h-100" />
      )
      :
      (
        // example with additional options
        <GMap key={2} mapOptions={mapOptions} appKey="AIzaSyBeZ5-CnQtbhPaEr2u162G-SoCF44lQRAg" mapClassName="h-100" hasSearch onSelect={onMapSelect} />
      )
    }

  </>
  )
}

export default App
