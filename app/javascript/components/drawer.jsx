import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash/bindAll';
import CartMenu from './cart_menu.jsx';
import AddressForm from './address_form.jsx';

class Drawer extends React.Component {
  constructor() {
    super()
    this.state = {widgets: [], open: false};
    bindAll(this, ['clickClose'])
  }

  open() {
    this.cartChanged(this.sneakInState())
  }

  widgetAdded() { this.open() }

  checkoutState(page) {
    return Object.assign(this.expandedState(), {checkoutPage: page})
  }

  cartChanged(attrs = {}) {
    Object.assign(attrs, {widgets: App.cart.toStatefulJSON()})
    this.setState(attrs);
  }

  expandedState() {
    return {open: true, slightlyOpen: false, fullyExpanded: true}
  }

  sneakInState() {
    return {open: true, slightlyOpen: true, fullyExpanded: false, checkoutPage: null}
  }

  clickClose(e) {
    this.setState({open: false, slightlyOpen: false, fullyExpanded: false});
  }

  beginCheckout() {
    this.setState(this.checkoutState('address'))
  }

  renderMenu() {
    if (this.state.checkoutPage) {
      switch (this.state.checkoutPage) {
        case 'address':
          return (<AddressForm />)
      }
    } else {
      return (
        <CartMenu widgets={this.state.widgets} />
      )
    }
  }

  render() {
    var [open, slightly_open, fully_expanded] = [this.state.open, this.state.slightlyOpen, this.state.fullyExpanded];

    const drawerClass = classNames({open, slightly_open, fully_expanded});

    return (
      <div id='drawer' className={`is-initialized ${drawerClass}`}>
        <div className='close' onClick={this.clickClose}>×</div>

        {this.renderMenu()}
      </div>
    )
  }
}

export default Drawer;
