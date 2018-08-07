import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash/bindAll';

class Drawer extends React.Component {
  constructor() {
    super()
    this.state = {open: false};
    bindAll(this, ['clickClose'])
  }

  open() {
    return {open: true, slightlyOpen: true, fullyExpanded: false}
  }

  lineItemAdded() {
    this.cartChanged(this.sneakInState())
  }

  cartChanged(attrs = {}) {
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
      </div>
    )
  }
}

export default Drawer;
