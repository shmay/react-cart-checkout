import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash/bindAll';

class CartTab extends React.Component {
  constructor(props) {
    super(props)

    bindAll(this, ['clickTab']);

    this.state = {
      num_widgets: App.cart.numWidgets()
    }
  }

  cartChanged() {
    this.setState({
      num_widgets: App.cart.numWidgets()
    })
  }

  clickTab(e) {
    e.preventDefault()

    App.drawer.open()
  }

  render() {
    const hidden = this.state.num_widgets === 0;

    const tabClasses = classNames({
      'cart-tab': true,
      hidden: hidden
    });

    const svg = App.svgs.cart;

    return (
      <div className={tabClasses} onClick={this.clickTab}>
        <div>{this.state.num_widgets}</div>
        <div className='cart-tab-svg-hold mt-2' dangerouslySetInnerHTML={{__html: svg}}>
        </div>
      </div>
    )
  }
}

export default CartTab;
