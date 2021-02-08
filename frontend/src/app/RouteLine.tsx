import * as React from 'react';
import { Polyline } from '@react-google-maps/api';
import { LocationType } from './types';

const standardOptions = {
  strokeOpacity: 0,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

const getOptions = (isOrigin, dashOffset = 0) => {
  return {
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 4,
          strokeColor: isOrigin ? '#32ff00' : '#fff'
        },
        offset: `${dashOffset}px`,
        repeat: `${20}px`,
      },
    ],
    ...standardOptions
  };
};

interface RouteLineProps {
  start: LocationType;
  end: LocationType;
  isOrigin: boolean;
  offset: number;
}

const RouteLine: React.FC<RouteLineProps> = ({ start, end, isOrigin, offset }) => {
  const [routeLine, setRouteLine] = React.useState<{ points: LocationType[]; options: any }>();

  React.useEffect(() => {
    setRouteLine({
      points: [
        start,
        end,
      ],
      options: getOptions(isOrigin, offset),
    });
  }, [start, end, offset]);

  return (
    routeLine ? <Polyline path={routeLine.points} options={routeLine.options} /> : null
  );
};

export default RouteLine;
