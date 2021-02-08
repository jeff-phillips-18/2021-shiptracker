import axios from 'axios';
import { getBackendURL } from './utils';
import { DEV_MODE } from '../../utilities/const';
import { MockShipping } from '../../__mocks__/shipping';

export const INIT_SHIPPING_PENDING = 'INIT_SHIPPING_PENDING';
export const INIT_SHIPPING_FULFILLED = 'INIT_SHIPPING_FULFILLED';
export const INIT_SHIPPING_REJECTED = 'INIT_SHIPPING_REJECTED';

export const initShippingPending = (): any => ({
  type: INIT_SHIPPING_PENDING,
  payload: {},
});

export const initShippingFulfilled = () => {
  return ({
    type: INIT_SHIPPING_FULFILLED,
  });
};

export const initShippingRejected = (error) => ({
  type: INIT_SHIPPING_REJECTED,
  payload: {
    error,
  },
});

export const initShipping = () => {
  const initDataUrl = getBackendURL('/shipments/initdata');
  const initUrl = getBackendURL('/shipments/init');
  return async function (dispatch) {
    dispatch(initShippingPending());
    if (DEV_MODE) {
      setTimeout(() => {
        dispatch(initShippingFulfilled());
      }, 100);
      return
    }

    await axios
      .get(initDataUrl)
      .then(async(response) => {
        await axios
          .get(initUrl)
          .then((response) => {
            dispatch(initShippingFulfilled());
          })
          .catch((e) => {
            dispatch(initShippingRejected(e.response.data));
          });
      })
      .catch((e) => {
        dispatch(initShippingRejected(e.response.data));
      });
  };
};

export const GET_SHIPPING_PENDING = 'GET_SHIPPING_PENDING';
export const GET_SHIPPING_FULFILLED = 'GET_SHIPPING_FULFILLED';
export const GET_SHIPPING_REJECTED = 'GET_SHIPPING_REJECTED';

export const getShippingPending = (): any => ({
  type: GET_SHIPPING_PENDING,
  payload: {},
});

export const getShippingFulfilled = (response) => {
  console.dir(response);
  return ({
    type: GET_SHIPPING_FULFILLED,
    payload: {
      response,
    },
  });
};

export const getShippingRejected = (error) => ({
  type: GET_SHIPPING_REJECTED,
  payload: {
    error,
  },
});

export const getShipping = () => {
  const getUrl = getBackendURL('/shipments');
  return async function (dispatch) {
    if (DEV_MODE) {
      setTimeout(() => {
        dispatch(getShippingFulfilled(MockShipping));
      }, 100);
      return;
    }

    dispatch(getShippingPending());
    await axios
      .get(getUrl)
      .then(async(response) => {
        dispatch(getShippingFulfilled(response.data))
      })
      .catch((e) => {
        dispatch(getShippingRejected(e.response.data));
      });
  };
};
