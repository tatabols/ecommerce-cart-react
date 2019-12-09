import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';

class App extends Component {
  state = {
    filteredProducts: [],
    products: [],
    cartItems: [],
    size: '',
    sort: ''
  };

  componentDidMount() {
    fetch('http://localhost:8000/products')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ products: data });
        this.setState({ filteredProducts: data });
      })
      .catch(e => console.log(e));

    if (localStorage.getItem('cartItems')) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      });
    }
  }

  handleAddCart = product => {
    const cartItems = this.state.cartItems;
    let productAlreadyInCart = false;
    cartItems.forEach(item => {
      if (item.id === product.id) {
        item.count++;
        productAlreadyInCart = true;
      }
    });
    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return this.setState({ cartItems });
  };

  handleRemoveFromCart = product => {
    const cartItems = this.state.cartItems.filter(
      item => item.id !== product.id
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.setState({ cartItems });
  };

  handleChangeSize = e => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };

  handleChangeSort = e => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== '') {
        state.products.sort((a, b) =>
          state.sort === 'lowest'
            ? a.price < b.price
              ? -1
              : 1
            : a.price > b.price
            ? -1
            : 1
        );
      } else {
        state.products.sort((a, b) => (a.id < b.id ? -1 : 1));
      }

      if (this.state.size !== '') {
        return {
          filteredProducts: this.state.products.filter(
            product => product.availableSizes.indexOf(this.state.size) !== -1
          )
        };
      }

      return {
        filteredProducts: state.products
      };
    });
  };

  render() {
    return (
      <div className="container">
        <h1>E-Commerce Shpping Cart</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              count={this.state.filteredProducts.length}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
            />
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddCart={this.handleAddCart}
            />
          </div>

          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
