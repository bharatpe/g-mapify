# g-mapify [![NPM version](https://img.shields.io/npm/v/g-mapify.svg)](https://www.npmjs.com/package/g-mapify) [![Downloads](http://img.shields.io/npm/dm/g-mapify.svg)](https://npmjs.org/package/g-mapify)
Flexible react google map with more options of search, pick & select.

![g-mapify](https://raw.githubusercontent.com/bharatpe/g-mapify/master/g-mapify.png)


# Getting Started

```javascript
yarn add g-mapify
```

or

```javascript
npm i g-mapify
```


## Usage
Basic use:
```javascript
    import  React from  'react';
    import { GMapify } from  'g-mapify';
    import  'g-mapify/dist/index.css';
    
    const  App = () => {
	    return (
		    <GMapify appKey="[google-map-key]" />
	    )
    }
```

### Example: Basic map
![basic map image](https://raw.githubusercontent.com/bharatpe/g-mapify/master/example/images/basic-map.png?raw=true)

## Options
|  Props                        | Description                                           | Default value
|-------------------------------|-------------------------------------------------------|-------------------------------|
| appKey                        | google map app key                                    | It's a mandatory options
|lat                            | default latitude of map                               | 28.7041
|lng                            | default logitude of map                               | 77.1025
|mapOptions                     | google map options that you can change or add more    | zoom:  15, zoomControl:  false, mapTypeControl:  false, fullscreenControl:  false, streetViewControl:  false, clickableIcons:  false, mapTypeId:  "roadmap"
|libraries                      | add more funcationality on google map                 | places
|mapClassName                   | custom class name for map element                     | 
|hasMarker                      | show marker in map                                    | true
|markerIcon                     | map marker icon                                       | https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png
|hasSearch                      | apply search in map                                   | false
|mapSearchPlace                 | map search input box place (required a valid selector name like (#id, .class)) | bottom of the map
|debounceTime                   | search debounce time (unit *ms*)                      | 2000
|inputClassName                 | custom class name for Search input                    | 
|searchPlaceHolder              | placeholder of search box                             | Search here
|searchClassName                | custom class name of search container                 |
|onSelect                       | trigger whenever map position changed (return *status: [true/false], data: [map data object], mapStatus: [map native status]*)| 

## Example with options
```javascript
    import  React from  'react';
    import { GMapify } from  'g-mapify';
    import  'g-mapify/dist/index.css';
    
    const  App = () => {
        const  onMapSelect = (status, data)=> {
            if (status) {
	            console.warn(status, data);
	        }
        };
        
	    return (
		    <GMapify appKey="[google-map-key]" hasSearch onSelect={onMapSelect}/>
	    )
    }
```
 #### Note
 If *status* is getting *false* that means something happened bad on location search.


### See below pictures
![Map Search image](https://raw.githubusercontent.com/bharatpe/g-mapify/master/example/images/map-search2.png?raw=true)

![Map Search container](https://raw.githubusercontent.com/bharatpe/g-mapify/master/example/images/map-search1.png?raw=true)


## Address Formatter
You can get City, Pincode, State etc. from *address_components* using **addressFormatter** method. This method transfrom *address_components* array data into *object*.

    import { GMapify, AddressFormatter } from  'g-mapify'
    
    const  onMapSelect = (status, data) => {
        if (status) {
	        console.warn('Map Data', data);
    
		    // get formatted address from google map address_components
		    const  formattedAddress = AddressFormatter(data.address_components);
		    console.warn('formated address', formattedAddress);
		    }
    };


# Releases
Here [Releases](https://github.com/bharatpe/g-mapify/blob/master/releases.md)

    
## Note: For Contributors
This repo build with [create-react-library](https://github.com/transitive-bullshit/create-react-library)


## Contributors
Here [Contributors](https://github.com/bharatpe/g-mapify/graphs/contributors)


## License
ISC [BharatPe TM](https://github.com/BharatPe)
