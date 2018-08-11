import React from 'react';
import { Tooltip } from 'reactstrap';

class AddressBackButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState((state) => {
      return {tooltipOpen: !state.tooltipOpen}
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.props.onClick} className='pb-2' id='add-address-back-button' dangerouslySetInnerHTML={{__html: App.svgs['long-arrow-alt-left']}}>
        </div>
        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="add-address-back-button" toggle={this.toggle}>
          Back to addresses
        </Tooltip>
      </div>
    );
  }
}

export default AddressBackButton;
