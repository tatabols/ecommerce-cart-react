import {
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_UNSUCCESSFUL
} from './types';

export const fetchProducts = () => dispatch => {
  console.log('actions-fetchProducts');
  fetch('http://localhost:8000/products')
    .then(resp => resp.json())
    .then(data => {
      console.log('actions-fetchProducts-data', { products: data });
      dispatch({
        type: FETCH_PRODUCTS_SUCCESSFUL,
        payload: { products: data }
      });
    })
    .catch(e => {
      dispatch({
        type: FETCH_PRODUCTS_UNSUCCESSFUL,
        payload: { error: e }
      });
    });
};
