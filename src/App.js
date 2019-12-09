import React, { Component } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  state = {
    filteredProducts: [],
    products: [],
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
  }

  handleAddCart = () => {
    console.log('handleAddCart');
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
            product => product.availableSizes.indexOf(this.state.size) != -1
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
        </div>
      </div>
    );
  }
}

export default App;
