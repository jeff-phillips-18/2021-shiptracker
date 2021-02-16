import React from 'react';
import { Polyline } from '@react-google-maps/api';
import { ShippingType } from './types';
import MapPort from './Port';
import Ship from './Ship';
import { getCurvedPath, getGeodesicPath } from '../utilities/mapUtils';

const getOptions = (isOrigin, dashOffset = 0, geodesic = true): google.maps.PolylineOptions => {
  return {
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 4,
          strokeColor: isOrigin ? '#32ff00' : '#fff',
        },
        offset: `${dashOffset}px`,
        repeat: `${20}px`,
      },
    ],
    geodesic,
    strokeOpacity: 0,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  };
};

interface LineType {
  points: google.maps.LatLng[];
  options: google.maps.PolylineOptions;
}

interface ShipmentProps {
  shipment: ShippingType;
  map: google.maps.Map;
  arcDistMultiplier: number;
  geodesic: boolean;
}

const Shipment: React.FC<ShipmentProps> = ({ shipment, map, arcDistMultiplier, geodesic }) => {
  const [offset, setOffset] = React.useState<number>(0);
  const [originLine, setOriginLine] = React.useState<LineType>();
  const [destinationLine, setDestinationLine] = React.useState<LineType>();
  const [shipLocation, setShipLocation] = React.useState<google.maps.LatLng>();
  React.useEffect(() => {
    const path = geodesic
      ? getGeodesicPath(
          new google.maps.LatLng(shipment.startPort.latitude, shipment.startPort.longitude, true),
          new google.maps.LatLng(shipment.endPort.latitude, shipment.endPort.longitude, true),
        )
      : getCurvedPath(
          new google.maps.LatLng(shipment.startPort.latitude, shipment.startPort.longitude, true),
          new google.maps.LatLng(shipment.endPort.latitude, shipment.endPort.longitude, true),
          map,
          arcDistMultiplier,
        );
    const shipPoint = Math.ceil(path.length * (shipment.ship.percentTravelled / 100));
    const originPoints = path.slice(0, shipPoint);
    const destinationPoints = path.slice(shipPoint - 1);
    setShipLocation(path[shipPoint]);
    setOriginLine({
      points: originPoints,
      options: getOptions(true, 0),
    });
    setDestinationLine({
      points: destinationPoints,
      options: getOptions(false, 0),
    });
  }, [shipment, arcDistMultiplier, map, geodesic]);

  React.useEffect(() => {
    if (originLine) {
      setOriginLine({
        points: [...originLine.points],
        options: getOptions(true, offset),
      });
    }
    if (destinationLine) {
      setDestinationLine({
        points: [...destinationLine.points],
        options: getOptions(false, offset),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setOffset(offset === 19 ? 0 : offset + 1);
    }, 100);
    return () => {
      clearTimeout(handle);
    };
  }, [offset]);

  return (
    <>
      <MapPort port={shipment.startPort} />
      <MapPort port={shipment.endPort} />
      {originLine ? (
        <Polyline path={originLine.points.slice(1)} options={originLine.options} />
      ) : null}
      {destinationLine ? (
        <Polyline path={destinationLine.points.slice(1, -1)} options={destinationLine.options} />
      ) : null}
      <Ship shipment={shipment} location={shipLocation} />
    </>
  );
};

export default React.memo(Shipment);
