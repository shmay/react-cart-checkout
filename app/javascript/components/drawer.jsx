import React from 'react';
import classNames from 'classnames';
import CartMenu from './cart_menu.jsx';

class DrawerView extends React.Component {
  open() {
    return {open: true, slightlyOpen: true, fullyExpanded: false}
  }

  render() {
    var [open, slightly_open, fully_expanded] = [this.state.open, this.state.slightlyOpen, this.state.fullyExpanded];

    const drawerClass = classNames({open, slightly_open, fully_expanded});

    return (
      <div id='drawer' className={`is-initialized ${drawerClass}`}>
        <div className='close' onClick={this.clickClose.bind(this)}>×</div>

        {this.renderMenu()}
      </div>
    )
  }
}
