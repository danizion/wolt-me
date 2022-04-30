// import {useState} from "react"
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng,
// } from 'react-places-autocomplete';
//
//
// export default function Address(){
//     const [address,setAddress] = useState('')
//     const [coordinates,setCoordinates] = useState({
//         lat:null,
//         lng:null
//     })
//
//     const handleSelect = async val =>{
//         const results = await geocodeByAddress(val)
//         const ll = await getLatLng(results[0])
//         console.log(ll)
//         setAddress(val)
//         setCoordinates(ll)
//     }
//     return(
//         <div>
//             <p>lat: {coordinates.lat}</p>
//             <p>lat: {coordinates.lng}</p>
//             <p>address: {address}</p>
//
//             <PlacesAutocomplete
//                 value={address}
//                 onChange={setAddress}
//                 onSelect={handleSelect}
//             >
//                 {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                     <div>
//                         <input
//                             {...getInputProps({
//                                 placeholder: 'Search Places ...',
//                                 className: 'location-search-input',
//                             })}
//                         />
//                         <div className="autocomplete-dropdown-container">
//                             {loading && <div>Loading...</div>}
//                             {suggestions.map(suggestion => {
//                                 const className = suggestion.active
//                                     ? 'suggestion-item--active'
//                                     : 'suggestion-item';
//                                 // inline style for demonstration purpose
//                                 const style = suggestion.active
//                                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                                     : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                                 return (
//                                     <div
//                                         {...getSuggestionItemProps(suggestion, {
//                                             className,
//                                             style,
//                                         })}
//                                     >
//                                         <span>{suggestion.description}</span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </PlacesAutocomplete>
//         </div>
//     )
// }

// import React, {useEffect, useRef, useState} from 'react'
//
// import {Search} from "@material-ui/icons";
//
//
// const apiKey = 'AIzaSyCq7XgQTgXO7vGe_g7FFmcoCl43xqabH2A'
// const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
// const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';
// function loadAsyncScript(src) {
//     return new Promise(resolve => {
//         const script = document.createElement("script");
//         Object.assign(script, {
//             type: "text/javascript",
//             async: true,
//             src
//         })
//         script.addEventListener("load", () => resolve(script));
//         document.head.appendChild(script);
//     })
// }
//
// const extractAddress = (place) => {
//
//     const address = {
//         city: "",
//         state: "",
//         zip: "",
//         country: "",
//         plain() {
//             const city = this.city ? this.city + ", " : "";
//             const zip = this.zip ? this.zip + ", " : "";
//             const state = this.state ? this.state + ", " : "";
//             return city + zip + state + this.country;
//         }
//     }
//
//     if (!Array.isArray(place?.address_components)) {
//         return address;
//     }
//
//     place.address_components.forEach(component => {
//         const types = component.types;
//         const value = component.long_name;
//
//         if (types.includes("locality")) {
//             address.city = value;
//         }
//
//         if (types.includes("administrative_area_level_2")) {
//             address.state = value;
//         }
//
//         if (types.includes("postal_code")) {
//             address.zip = value;
//         }
//
//         if (types.includes("country")) {
//             address.country = value;
//         }
//
//     });
//
//     return address;
// }
//
//
// export default function Address() {
//     const searchInput = useRef(null);
//     const [address, setAddress] = useState({});
//
// // init gmap script
//     const initMapScript = () => {
//         // if script already loaded
//         if(window.google) {
//             return Promise.resolve();
//         }
//         const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
//         return loadAsyncScript(src);
//     }
//
//     // do something on address change
//     const onChangeAddress = (autocomplete) => {
//         const place = autocomplete.getPlace();
//         setAddress(extractAddress(place));
//     }
//
//     // init autocomplete
//     const initAutocomplete = () => {
//         if (!searchInput.current) return;
//
//         const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
//         autocomplete.setFields(["address_component", "geometry"]);
//         autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
//
//     }
//
//
//     const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
//         const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
//         searchInput.current.value = "Getting your location...";
//         fetch(url)
//             .then(response => response.json())
//             .then(location => {
//                 const place = location.results[0];
//                 const _address = extractAddress(place);
//                 setAddress(_address);
//                 searchInput.current.value = _address.plain();
//             })
//     }
//
//
//     const findMyLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 reverseGeocode(position.coords)
//             })
//         }
//     }
//
//
//
//
//
//     // load map script after mounted
//     useEffect(() => {
//         initMapScript().then(() => initAutocomplete())
//     }, []);
//
//
//     return(
//         <div>
//             <div className="search">
//                 <span><Search /></span>
//                 <input ref={searchInput} type="text" placeholder="Search location...."/>
//             </div>
//         </div>
//     )
// }


import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const center = { lat: 50.064192, lng: -130.605469 };
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
};
// const input = document.getElementById("pac-input");
const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
};
const google = window.google;

const autocomplete = new google.maps.places.Autocomplete('ma', options);
const test = autocomplete
console.log(autocomplete)


export class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for google map places autocomplete
            address: '',

            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {
                lat: 49.2827291,
                lng: -123.1207375
            }
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);

                // update center state
                this.setState({ mapCenter: latLng });
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div id='googleMaps'>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {/*{loading && <div>Loading...</div>}*/}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                {/*<Map*/}
                {/*    google={this.props.google}*/}
                {/*    initialCenter={{*/}
                {/*        lat: this.state.mapCenter.lat,*/}
                {/*        lng: this.state.mapCenter.lng*/}
                {/*    }}*/}
                {/*    center={{*/}
                {/*        lat: this.state.mapCenter.lat,*/}
                {/*        lng: this.state.mapCenter.lng*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Marker*/}
                {/*        position={{*/}
                {/*            lat: this.state.mapCenter.lat,*/}
                {/*            lng: this.state.mapCenter.lng*/}
                {/*        }} />*/}
                {/*</Map>*/}
            </div>
        )
    }
}
