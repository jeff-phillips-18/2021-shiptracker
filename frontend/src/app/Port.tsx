import React from 'react';
import { Marker } from '@react-google-maps/api';
import { PortType } from './types';
import { getPortImage } from './constants';

interface MapPortProps {
  port: PortType;
}


const Port: React.FC<MapPortProps> = ({ port }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const initializeMarker = (newMarker) => {
    const icon = {
      url: getPortImage(port.name),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(28,42),
      // anchor: new google.maps.Point(34,53),
      scaledSize: new google.maps.Size(60,60)
    };
    newMarker.setIcon(icon);
    setMarker(newMarker)
  };

  return (
    <Marker
      className="csd-shipping__port-marker"
      position={{ lat: port.latitude, lng: port.longitude }}
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

export default React.memo(Port);
