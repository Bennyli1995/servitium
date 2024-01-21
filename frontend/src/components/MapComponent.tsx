import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const MapComponent = ({ onLocationSelect }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your API Key
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default location
  const mapStyles = { height: "400px", width: "100%" };
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const searchBoxRef = useRef();

  const onSelect = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLocation({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      onSelect(places[0]);
    }
  };

  const libraries = ["places"];

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `100%`,
            height: `40px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={location}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
