import {
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_UNSUCCESSFUL
} from '../actions/types';

const initialState = { products: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESSFUL:
      return {
        products: action.payload.products
      };

    case FETCH_PRODUCTS_UNSUCCESSFUL:
      return { error: action.payload };

    default:
      return state;
  }
};
