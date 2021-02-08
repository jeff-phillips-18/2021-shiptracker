import React from 'react';
import { connect } from 'react-redux';
import '@patternfly/react-core/dist/styles/base.css';
import Earth from './Earth';
import Cloud1 from '../images/cloud-1.svg';
import Cloud2 from '../images/cloud-2.svg';
import Sun from '../images/sun.svg';
import ShadowClip from './ShadowClip';
import { initShipping, getShipping } from '../redux/actions/actions';

import './App.scss';

const POSITION_CHANGE_VALUE = 5;
const ATLANTIC_LOCATION = { latitude: 20, longitude: -38};
const PACIFIC_LOCATION = { latitude: 20, longitude: -177 };

interface AppProps {
  initShipping: () => void;
  getShipping: () => void;
  shippingInitialized: boolean;
  shipping: any[];
}

const App: React.FC<AppProps> = ({ getShipping, shipping }) => {
  const [location, setLocation] = React.useState<{ latitude: number, longitude: number }>(ATLANTIC_LOCATION);
  const [endLocation, setEndLocation] = React.useState<{ latitude: number, longitude: number }>(ATLANTIC_LOCATION);
  const [zoom, setZoom] = React.useState<number>(2.59);
  const focusRef = React.useRef<HTMLElement | null>();

  React.useEffect(() => {
    let handle;
    const watchShipping = () => {
      getShipping();
      setTimeout(() => watchShipping(), 5000);
    };
    watchShipping();

    return () => clearTimeout(handle);
  }, []);

  React.useEffect(() => {
    if (location.latitude === endLocation.latitude && location.longitude === endLocation.longitude) {
      return;
    }

    let updatedLocation = { ...endLocation };
    if (location.latitude > endLocation.latitude) {
      updatedLocation.latitude = Math.max(location.latitude - POSITION_CHANGE_VALUE, endLocation.latitude);
    } else {
      updatedLocation.latitude = Math.min(location.latitude + POSITION_CHANGE_VALUE, endLocation.latitude);
    }
    if (location.longitude > endLocation.longitude) {
      updatedLocation.longitude = Math.max(location.longitude - POSITION_CHANGE_VALUE, endLocation.longitude);
    } else {
      updatedLocation.longitude = location.longitude + POSITION_CHANGE_VALUE;
      updatedLocation.longitude = Math.min(location.longitude + POSITION_CHANGE_VALUE, endLocation.longitude);
    }
    const handle = setTimeout(() => {
      setLocation(updatedLocation);
    }, 10);
    return () => {
      clearTimeout(handle);
    }
  }, [location, endLocation]);

  const updateLocation = (endLocation) => {
    if (endLocation.latitude === location.latitude && endLocation.longitude === location.longitude) {
      return;
    }
    let updatedLocation = { ...endLocation };
    if (location.latitude > endLocation.latitude) {
      updatedLocation.latitude = location.latitude - POSITION_CHANGE_VALUE;
    } else {
      updatedLocation.latitude = location.latitude + POSITION_CHANGE_VALUE;
    }
    if (location.longitude > endLocation.longitude) {
      updatedLocation.longitude = location.longitude - POSITION_CHANGE_VALUE;
    } else {
      updatedLocation.longitude = location.longitude + POSITION_CHANGE_VALUE;
    }
    setLocation(updatedLocation);
    setTimeout(() => updateLocation(endLocation), 500);
  };

  React.useEffect(() => {
    if (focusRef.current) {
      (focusRef.current as HTMLElement).focus();
    }
  }, [focusRef.current]);

  const handleKeyPress = (e) => {
    if (e.key === '+') {
      setZoom(zoom + 0.01);
    }
    if (e.key === '-') {
      setZoom(zoom - 0.01);
    }
    if (e.key === 'ArrowLeft') {
      // setEndLocation(PACIFIC_LOCATION);
      setEndLocation({ latitude: location.latitude, longitude: location.longitude - 10 });
    }
    if (e.key === 'ArrowRight') {
      // setEndLocation(ATLANTIC_LOCATION);
      setEndLocation({ latitude: location.latitude, longitude: location.longitude + 10 });
    }
    if (e.key === 'Enter' || e.key === ' ') {
      setEndLocation(location.latitude === PACIFIC_LOCATION.latitude && location.longitude === PACIFIC_LOCATION.longitude ?
        ATLANTIC_LOCATION :
        PACIFIC_LOCATION);
    }
  };

  const onMapFocus = () => {
    focusRef.current && (focusRef.current as HTMLElement).focus();
  };

  return (
    <div className="csd-shipping">
      <input
        className="csd-shipping__map-control"
        type="text"
        onKeyDown={handleKeyPress}
        autoFocus={true}
        ref={focusRef}
      />
      <div className="csd-shipping__atmosphere">
        <div className="csd-shipping__atmospheric-object csd-shipping__cloud-1">
          <img src={Cloud1} />
        </div>
        <div className="csd-shipping__atmospheric-object csd-shipping__cloud-2">
          <img src={Cloud2} />
        </div>
        <ShadowClip />
        <Earth
          onFocus={onMapFocus}
          lat={location.latitude}
          lng={location.longitude}
          zoom={zoom}
          shipments={shipping}
        />
      </div>
      <div className="csd-shipping__atmospheric-object csd-shipping__sun">
        <img src={Sun} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shippingInitialized: state.appReducer.shippingInitialized,
  shipping: state.appReducer.shipping,
});

const mapDispatchToProps = (dispatch) => ({
  initShipping: () => dispatch(initShipping()),
  getShipping: () => dispatch(getShipping()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
