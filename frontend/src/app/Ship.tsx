import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import ShipImageEast from '../images/ship-east.svg';
import ShipImageWest from '../images/ship-west.svg';
import { PortType, ShipType, } from './types';

interface ShipProps {
  ship: ShipType;
  origin: PortType;
  destination: PortType;
}

const Ship: React.FC<ShipProps> = ({ ship, origin, destination }) => {
  const [marker, setMarker] = React.useState<Marker>();

  const headEast = React.useCallback(() => {
    if (origin && destination) {
      const originLng = origin.longitude + 180;
      const destinationLng = destination.longitude + 180;
      return (originLng < destinationLng) && (Math.abs(originLng- destinationLng) <= 180);
    }
    return true;
  }, [origin, destination]);


  const initializeMarker = (newMarker) => {
    const icon = {
      url: headEast() ? ShipImageEast : ShipImageWest,
      anchor: new google.maps.Point(25,33),
      scaledSize: new google.maps.Size(50,50),
    };
    newMarker.setIcon(icon);
    setMarker(newMarker)
  };

  React.useEffect(() => {
    if (marker) {
      const icon = {
        url: headEast() ? ShipImageEast : ShipImageWest,
        anchor: new google.maps.Point(25,33),
        scaledSize: new google.maps.Size(50, 50),
      };
      marker.setIcon(icon);
    }
  }, [marker, headEast]);

  const shipPosition = React.useMemo(() => ({
    lat: ship.latitude ?? origin.latitude,
    lng: ship.longitude ?? origin.longitude
  }), [ship, origin]);

  return (
    <Marker
      className="csd-shipping__port-marker"
      position={shipPosition}
      draggable={false}
      onLoad={initializeMarker}
      title={name}
    />
      //   <InfoWindow anchor={marker} options={{ disableAutoPan: true }}>
      //     <div className="csd-shipping__port-marker">
      //       <img src={Halifax} />
      //     </div>
      //   </InfoWindow>
      // </Marker>
  );
};

export default React.memo(Ship);
