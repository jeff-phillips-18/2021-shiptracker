import React from 'react';
import { ShippingType } from './types';
import MapPort from './Port';
import RouteLine from './RouteLine';
import Ship from './Ship';

interface RouteProps {
  shipment: ShippingType;
}

const Route: React.FC<RouteProps> = ({ shipment }) => {
  const [offset, setOffset]  = React.useState<number>(0);

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setOffset(offset === 20 ? 0 : offset + 1);
    }, 100);
    return (() => {
      clearTimeout(handle);
    })
  }, [offset]);

  const shipLocation = React.useMemo(() => ({
    latitude: shipment.ship.latitude ?? shipment.startPort.latitude,
    longitude: shipment.ship.longitude ?? shipment.startPort.longitude
    }), [shipment.ship]);

  return (
    <>
      <MapPort port={shipment.startPort} is />
      <MapPort port={shipment.endPort} />
      <RouteLine
        start={{ lat: shipment.startPort.latitude, lng: shipment.startPort.longitude }}
        end={{ lat: shipLocation.latitude, lng: shipLocation.longitude}}
        isOrigin={true}
        offset={offset}
      />
      <RouteLine
        start={{ lat: shipLocation.latitude, lng: shipLocation.longitude }}
        end={{ lat: shipment.endPort.latitude, lng: shipment.endPort.longitude}}
        isOrigin={false}
        offset={offset}
      />
      <Ship ship={shipment.ship} origin={shipment.startPort} destination={shipment.endPort} />
    </>
  );
};

export default React.memo(Route);
