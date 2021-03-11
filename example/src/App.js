import React, { useCallback, useState, useRef, useEffect } from "react";
import { GMapify, AddressFormatter } from "g-mapify";
import "g-mapify/dist/index.css";
import "./index.css";
// import InputDefault from './components/Input';

const BASIC = "basic_map";
const SEARCH_MAP = "search_map";
const MULTIPLE_MARKER = "marker_map";

const App = () => {
  const mapOptions = {
    zoom: 15
  };

  const markers = [
    [28.4165425, 77.0437857, "Hello 1"],
    [
      28.415671,
      77.0520993,
      `<div><h3>Southcity 2</h3> <img src="https://www.rentomojo.com/blog/wp-content/uploads/2019/07/shutterstock_1298400742.jpg" height="140"/> </div>`
    ],
    [28.4175717, 77.05284840000002, "<h1> Location </h1>"]
  ];

  const [mapType, setmapType] = useState(BASIC);
  const mapRef = useRef();

  const scrapeData = async () => {
    if (mapRef?.current) {
      const result = await mapRef?.current?.latLongFromQuery(
        "BharatPe Office Delhi"
      );
      const lat = result[0].geometry.location.lat();
      const lng = result[0].geometry.location.lng();
      console.log(lat, lng);
    }
  };

  const onMapSelect = (status, data) => {
    console.warn("Map Data", data);

    // get formatted address from google map address_components
    const formattedAddress = AddressFormatter(data.address_components);
    console.warn("formated address", formattedAddress);
  };

  const APPKEY = "AIzaSyCxZsdswuEcc3zk-vgGP8N_nUSluscy0";

  return (
    <>
      <button onClick={() => setmapType(BASIC)} disabled={mapType === BASIC}>
        Basic Map
      </button>
      <button
        onClick={() => setmapType(SEARCH_MAP)}
        disabled={mapType === SEARCH_MAP}
      >
        Search Map
      </button>
      <button
        onClick={() => setmapType(MULTIPLE_MARKER)}
        disabled={mapType === MULTIPLE_MARKER}
      >
        Custom Map
      </button>

      {mapType === BASIC && (
        <GMapify
          ref={mapRef}
          key={1}
          mapOptions={mapOptions}
          appKey={APPKEY}
          mapClassName="h-100"
        />
      )}
      {mapType === SEARCH_MAP && (
        <GMapify
          key={2}
          mapOptions={mapOptions}
          appKey={APPKEY}
          mapClassName="h-100"
          hasSearch
          onSelect={onMapSelect}
        />
      )}
      {mapType === MULTIPLE_MARKER && (
        <GMapify
          key={3}
          mapOptions={mapOptions}
          appKey={APPKEY}
          mapClassName="h-100"
          autoCenter={false}
          customMarkers={markers}
          onSelect={onMapSelect}
        />
      )}
      <button onClick={scrapeData}>Get Lat Long</button>
    </>
  );
};

export default App;
