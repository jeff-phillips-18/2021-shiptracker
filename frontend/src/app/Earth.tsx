import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { LocationType, RouteType, ShippingType } from './types';
import Route from './Route';
import { googleMapsApiKey } from './constants';

interface MapContainerProps {
  lat: number;
  lng: number;
  zoom: number;
  shipments: ShippingType[];
  onMapFocus: () => void;
}

const Earth: React.FC<MapContainerProps> = ({ lat, lng, zoom, shipments, onMapFocus }) => {
  const [center, setCenter] = React.useState<LocationType>({ lat, lng });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey
  });

  React.useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setCenter({ lat, lng });
      }, 100);
    }
  }, [isLoaded]);

  React.useEffect(() => {
    if (isLoaded) {
      setCenter({ lat, lng });
    }
  }, [lat, lng]);

  const mapStyles = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  };

  const mapOptions = {
    scrollwheel: false,
    draggable: false,
    disableDefaultUI: true,
    panControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none',
    zoom: zoom,
    noClear: true,
    styles: [
      {
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          { color: "#00ccff" },
        ]
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          { color: "#609907" },
        ]
      },
    ]
  };

  return (
    <div className="csd-shipping__earth" onFocus={onMapFocus}>
      {isLoaded && (
        <GoogleMap
          tabIndex={-1}
          mapContainerStyle={mapStyles}
          zoom={zoom}
          center={center}
          options={mapOptions}
        >
          {shipments?.length ? (
            shipments.map((shipment) => <Route key={shipment.id} shipment={shipment} />)
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Earth;
