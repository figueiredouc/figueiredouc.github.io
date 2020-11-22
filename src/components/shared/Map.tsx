import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const Map = () => {
  const mapsOptions = {
    apiKey: 'AIzaSyBssvvGG5y34Sr-unhCxpPqvNG5Ha3ByJs',
    center: {
      lat: 40.211618,
      lng: -8.432225,
    },
    zoom: 11,
  };

  return (
    <div style={{ flex: 1, minHeight: 250 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapsOptions.apiKey }}
        defaultCenter={mapsOptions.center}
        defaultZoom={mapsOptions.zoom}
      >
        <AnyReactComponent
          lat={mapsOptions.center.lat}
          lng={mapsOptions.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
