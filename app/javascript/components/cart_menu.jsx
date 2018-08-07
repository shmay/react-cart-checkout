import React from 'react';

import Widget from '../models/widget.js.erb';
import { centsToDollaString } from '../util.js';

class CartMenu extends React.Component {
  constructor() {
    super()
    this.cart = window.App.cart;
    this.renderWidget = this.renderWidget.bind(this);
  }

  decrementQuantity(e, key) {
    let widget = this.cart.findWidgetByKey(key)
    widget.decrementQuantity()
    this.checkIfQuantityZero(widget)
  }

  incrementQuantity(e, key) {
    let widget = this.cart.findWidgetByKey(key)
    widget.incrementQuantity()
    this.checkIfQuantityZero(widget)
  }

  handleChange(e, key) {
    let widget = this.cart.findWidgetByKey(key);
    widget.quantity = parseInt(e.target.value);
    this.checkIfQuantityZero(widget)
  }

  checkIfQuantityZero(widget) {
    if (widget.quantity < 1) {
      this.cart.removeWidget(widget)
    }

    this.cart.saveCart()
    App.drawer.cartChanged()
  }

  beginCheckout() {
    App.drawer.beginCheckout()
  }

  renderWidget(key) {
    let widget = this.cart.findWidgetByKey(key)

    let width = parseInt(widget.size.replace('px', '')) / 4
    let svg = App.svgs[`cogs-${widget.thickness}`]

    return (
      <div className="cart-item d-flex" key={key}>
        <div className="d-flex justify-content-center align-items-center item__svg" style={{width: 35}}>
          <div style={{width: width, fill: widget.color}} dangerouslySetInnerHTML={{__html: svg}}>
          </div>
        </div>
        <div className="item-text d-flex flex-column">
          <div className="cart-item__variant-title">{widget.getName()}</div>
          <span className="cart-item__title">SLO Widget</span>
          <div className="d-flex justify-content-between align-items-center">
            <div className="quantity-container d-flex">
               <button className="quantity-change quantity-decrement" onClick={(e) => this.decrementQuantity(e, key)}>
                 <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                   <path d="M4 7h8v2H4z"></path>
                 </svg>
               </button>
               <input className="quantity cart-item__quantity-input" min="0" type="number" value={widget.quantity} onChange={(e) => this.handleChange(e, key)} />
               <button className="quantity-change quantity-increment" type="button" onClick={(e) => this.incrementQuantity(e, key)}>
                 <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 7H9V4H7v3H4v2h3v3h2V9h3z"></path>
                 </svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const widgets = this.props.widgets;
    return (
      <div className='cart-menu layout vertical'>
        <div className="cart-header d-flex justify-content-between">
          <h2 className="cart-title">Cart</h2>
        </div>
        <div className='cart-scroll flex'>
          {widgets.map((widget_json) => this.renderWidget(widget_json.key))}
        </div>
        <div className="cart-bottom">
          <div className="layout horizontal justified">
            <p className="cart__subtotal__text">SUBTOTAL</p>
            <p className="cart__subtotal__price">{centsToDollaString(this.cart.calcSubtotal())}</p>
          </div>
          <p className="cart__notice">Shipping calculated by zip code at checkout.</p>
          <button className="btn btn-success btn btn-cart-checkout" onClick={(e) => this.beginCheckout()}>CHECKOUT</button>
        </div>
      </div>
    )
  }
}

export default CartMenu;
