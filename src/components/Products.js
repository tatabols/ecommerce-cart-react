import React, { Component } from 'react';
import util from '../util';

class Products extends Component {
  render() {
    const producItems = this.props.products.map(product => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          <a href={`#${product.id}`}>
            <img
              src={`/products/${product.sku}_1.jpg`}
              alt={product.description}
            />
            <p>{product.title}</p>
          </a>
          <div>
            <b>{util.formatCurrency(product.price)}</b>
            <button
              className="btn btn-primary"
              onClick={() => this.props.handleAddCart(product)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    ));

    return <div className="row">{producItems}</div>;
  }
}

export default Products;
