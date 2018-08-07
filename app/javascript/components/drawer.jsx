import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash/bindAll';
import CartMenu from './cart_menu.jsx';

class Drawer extends React.Component {
  constructor() {
    super()
    this.state = {widgets: [], open: false};
    bindAll(this, ['clickClose'])
  }

  open() {
    return {open: true, slightlyOpen: true, fullyExpanded: false}
  }

  widgetAdded() {
    this.cartChanged(this.sneakInState())
  }

  cartChanged(attrs = {}) {
    Object.assign(attrs, {widgets: App.cart.toStatefulJSON()})
    this.setState(attrs);
  }

  sneakInState() {
    return {open: true, slightlyOpen: true, fullyExpanded: false, checkoutPage: null}
  }

  clickClose(e) {
    this.setState({open: false, slightlyOpen: false, fullyExpanded: false});
  }

  render() {
    var [open, slightly_open, fully_expanded] = [this.state.open, this.state.slightlyOpen, this.state.fullyExpanded];

    const drawerClass = classNames({open, slightly_open, fully_expanded});

    return (
      <div id='drawer' className={`is-initialized ${drawerClass}`}>
        <div className='close' onClick={this.clickClose}>×</div>

        <CartMenu widgets={this.state.widgets} />
      </div>
    )
  }
}

export default Drawer;
