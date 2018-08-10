import React from 'react';
import classNames from 'classnames';
import { centsToDollaString } from '../util.js';

class OrderSummary extends React.Component {
  constructor() {
    super()
    this.state = {open: false};
    this.cart = App.cart;
  }

  clickButton(e) {
    e.preventDefault()
    this.state = {open: false};

    this.setState((prevState) => {
      setTimeout(() => {
        this.setState({transitioning: false})
      }, 315)

      return {
        open: !prevState.open,
        transitioning: true
      }
    });
  }

  componentDidMount() {
    const children  = Array.from(this.summaryHold.children);
    const height = children.reduce((accumulator, ele) => {
      return accumulator + ele.offsetHeight;
    }, 0)

    this.height = height + 100;
  }

  renderWidget(widget) {
    let width = parseInt(widget.size.replace('px', '')) / 4
    let svg = App.svgs[`cogs-${widget.thickness}`]

    return (
      <div className="cart-item d-flex justify-content-between" key={widget.key}>
        <div className="d-flex">
          <div className="item__image">
            <div style={{width: 35, height: 35}}>
              <div className='mt-2' style={{width: width, fill: widget.color}} dangerouslySetInnerHTML={{__html: svg}}>
              </div>
            </div>
            <span className="product-thumbnail__quantity">{widget.quantity}</span>
          </div>
          <div className="item-text d-flex flex-column">
            <div className="cart-item__variant-title">{widget.getName()}</div>
            <span className="cart-item__title">SLO Widget</span>
          </div>
        </div>
        <div>{widget.getFormattedPrice()}</div>
      </div>
    )
  }

  render() {
    const widgets = this.cart.getWidgets()

    const widgetsClass = classNames({
      'order-summary--transition ': this.state.transitioning,
      'order-summary--is-collapsed': !this.state.open,
      'order-summary--is-expanded': this.state.open
    });

    const divStyle = this.state.open ? {height: `${this.height}px`} : {height: 0}

    let cartSvg = App.svgs.cart

    return (
      <div className='order-summary-hold'>
        <button className="order-summary-btn" onClick={(e) => this.clickButton(e)}>
          <div className="order-summary-inner d-flex justify-content-between">
            <div className="layout horizontal">
              <div className="order-summary-toggle__icon-wrapper" >
                <div className='cart-svg-hold' dangerouslySetInnerHTML={{__html: cartSvg}}>
                </div>
              </div>
              <div className="order-summary-toggle__text order-summary-toggle__text--show">
                <span>Show order summary</span>
                <svg className="order-summary-toggle__dropdown" fill="#000" height="6" width="11" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
                </svg>
              </div>
            </div>
            <div className="order-summary-toggle__text order-summary-toggle__text--hide hidden">
              <span>Hide order summary</span>
              <svg className="order-summary-toggle__dropdown" fill="#000" height="7" width="11" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
              </svg>
            </div>
            <div className="order-summary-toggle__total-recap total-recap"><span className="total-recap__final-price">{centsToDollaString(this.cart.calcTotal())}</span></div>
          </div>
        </button>
        <div style={divStyle} className={`order-summary ${widgetsClass} summary-hold`} ref={(div) => this.summaryHold = div}>
          <div className="summary-items-hold">
            {widgets.map((widget) => this.renderWidget(widget))}
          </div>
          <div className='calc-rows-hold px-2'>
            <div className='d-flex justify-content-between'>
              <div>Subtotal</div>
              <div>{centsToDollaString(this.cart.calcSubtotal())}</div>
            </div>

            <div className='d-flex justify-content-between'>
              <div>Shipping</div>
              <div>{centsToDollaString(this.cart.calcShipping())}</div>
            </div>

            <div className='d-flex justify-content-between'>
              <div>Taxes</div>
              <div>{centsToDollaString(this.cart.calcTaxes())}</div>
            </div>

            <hr />

            <div className='d-flex justify-content-between total-row'>
              <div>Total</div>
              <div>{centsToDollaString(this.cart.calcTotal())}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderSummary;
