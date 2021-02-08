import {
  INIT_SHIPPING_PENDING,
  INIT_SHIPPING_FULFILLED,
  INIT_SHIPPING_REJECTED,
  GET_SHIPPING_PENDING,
  GET_SHIPPING_FULFILLED,
  GET_SHIPPING_REJECTED,
} from '../actions/actions';

const initialState = {
  shippingInitializing: false,
  shippingInitialized: false,
  shippingInitError: null,
  shipping: [],
  shippingLoading: false,
  shippingError: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SHIPPING_PENDING:
      return {
        ...state,
        shippingInitializing: true,
        shippingInitialized: false,
        shippingInitError: null,
      };
    case INIT_SHIPPING_FULFILLED:
      return {
        ...state,
        shippingInitializing: false,
        shippingInitialized: true,
        shippingInitError: null,
      };
    case INIT_SHIPPING_REJECTED:
      return {
        ...state,
        shippingInitializing: false,
        shippingInitialized: false,
        shippingInitError: action.payload.error,
      };
    case GET_SHIPPING_PENDING:
      return {
        ...state,
        shipping: [],
        shippingLoading: true,
        shippingError: null,
      };
    case GET_SHIPPING_FULFILLED:
      return {
        ...state,
        shipping: action.payload.response,
        shippingLoading: false,
        shippingError: null,
      };
    case GET_SHIPPING_REJECTED:
      return {
        ...state,
        shipping: [],
        shippingLoading: false,
        shippingError: action.payload.error,
      };
    default:
      return state;
  }
};

export default appReducer;
