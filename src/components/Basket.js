import React, { Component } from 'react';

export default class Basket extends Component {
  render() {
    const { cartItems, handleRemoveFromCart } = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          ' Basket is empty'
        ) : (
          <div>you have {cartItems.length} products</div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b>x {item.count} = {item.price * item.count}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
