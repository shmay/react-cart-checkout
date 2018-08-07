import React from 'react';
import ReactDOM from 'react-dom';
import AddToCartView from './add_to_cart_view.js';
import Cart from './models/cart.js';
import Drawer from './components/drawer.jsx';

window.App = {};
window.App.cart = new Cart;

document.addEventListener('DOMContentLoaded', () => {
  new AddToCartView;

  const drawer = React.createElement(Drawer)

  App.drawer = ReactDOM.render(
    drawer,
    document.body.appendChild(document.createElement('div'))
  )
})
