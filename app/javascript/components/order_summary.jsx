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
    return (
      <div className="cart-item d-flex justify-content-between" key={widget.key}>
        <div className="d-flex">
          <div className="item__image">
            <img src={this.img} />
            <span className="product-thumbnail__quantity">{widget.quantity}</span>
          </div>
          <div className="item-text d-flex flex-column">
            <div className="cart-item__variant-title">{widget.getName()}</div>
            <span className="cart-item__title">SLO Widget</span>
          </div>
        </div>
        <div>{item.getFormattedPrice()}</div>
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

    return (
      <div className='order-summary-hold'>
        <button className="order-summary-btn" onClick={(e) => this.clickButton(e)}>
          <div className="order-summary-inner d-flex justify-content-between">
            <div className="layout horizontal">
              <div className="order-summary-toggle__icon-wrapper">
                <svg className="order-summary-toggle__icon mr-2" height="19" width="20" xmlns="http://www.w3.org/2000/svg">

                  <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                </svg>
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
