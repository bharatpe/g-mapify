# g-map
Google map with search functionality.
# Getting Started
Add it to package.json as a dependency

    General
    "g-map": "git+ssh://git@github.com/bharatpe/g-map.git"
    
    With Authtoken
    "g-map": "git+https://[AUTH_TOKEN]:x-oauth-basic@github.com/bharatpe/g-map.git"
## Note: For Contributors
This repo build with [create-react-library](https://github.com/transitive-bullshit/create-react-library)
## Usage
Basic use:

    import  React from  'react';
    import { GMap } from  'g-map';
    import  'g-map/dist/index.css';
    
    const  App = () => {
	    return (
		    <GMap appKey="[google-map-key]" />
	    )
    }
### Example: Basic map
   ![Basic Map Image](https://raw.githubusercontent.com/bharatpe/g-map/master/example/images/basic-map.png?token=AOWSXMSGWSD3E2HFNB6OD4S66CMAK)
## Options
|  Props | Description  | Default value
|--|--|--|
| appKey | google map app key | It's a mandatory options
|lat| default latitude of map | 28.7041
|lng| default logitude of map | 77.1025
|mapOptions| google map options that you can change or add more | zoom:  15, zoomControl:  false, mapTypeControl:  false, fullscreenControl:  false, streetViewControl:  false, clickableIcons:  false, mapTypeId:  "roadmap"
|libraries| add more funcationality on google map | places
|mapClassName| custom class name for map element| 
|hasMarker| show marker in map | true
|markerIcon| map marker icon | https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png
|hasSearch| apply search in map | false
|mapSearchPlace| map search input box place (required a valid selector name like (#id, .class)) | bottom of the map
|debounceTime| search debounce time (unit *ms*) | 2000
|inputClassName| custom class name for Search input | 
|searchPlaceHolder| placeholder of search box | Search here
|searchClassName| custom class name of search container
|onSelect| trigger whenever map position changed (return *status: [true/false], data: [map data object], mapStatus: [map native status]*)| 

## Example with options
    import  React from  'react';
    import { GMap } from  'g-map';
    import  'g-map/dist/index.css';
    
    const  App = () => {
        const  onMapSelect = useCallback((status, data)=> {
            console.warn(data);
        }, []);
        
	    return (
		    <GMap appKey="[google-map-key]" hasSearch onSelect={onMapSelect}/>
	    )
    }
![map search image](https://raw.githubusercontent.com/bharatpe/g-map/master/example/images/map-search2.jpg?token=AOWSXMW35JZIB46KBJUZD3K66DZRI)
  
  ![map search container](https://raw.githubusercontent.com/bharatpe/g-map/master/example/images/map-search1.jpg?token=AOWSXMRR2GFIWJR625KQHFS66DZUK)

## License
BharatPe © [BharatPe TM](https://github.com/BharatPe TM)
