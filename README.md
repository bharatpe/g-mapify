# g-map
Google map with some additional functionality.
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
 ![basic map image](https://github.com/bharatpe/react-g-map/blob/master/example/images/basic-map.jpg?raw=true)
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
            if (status) {
	            console.warn(status, data);
	        }
        }, []);
        
	    return (
		    <GMap appKey="[google-map-key]" hasSearch onSelect={onMapSelect}/>
	    )
    }
 Note: If *status* is getting *false* that means something happened bad on location search.
### See below pictures
![Map Search image](https://github.com/bharatpe/react-g-map/blob/master/example/images/map-search2.jpg?raw=true)
  
  ![Map Search container](https://github.com/bharatpe/react-g-map/blob/master/example/images/map-search1.jpg?raw=true)
## Address Formatter
You can get City, Pincode, State etc. from *address_components* using **addressFormatter** method. This method transfrom *address_components* array data into *object*.

    import { GMap, addressFormatter } from  'g-map'
    
    const  onMapSelect = useCallback((status, data) => {
        if (status) {
	        console.warn('Map Data', data);
    
		    // get formatted address from google map address_components
		    const  formattedAddress = addressFormatter(data.address_components);
		    console.warn('formated address', formattedAddress);
		}
    }, []);

## License
BharatPe © [BharatPe TM](https://github.com/BharatPe TM)
