import React from 'react';
import { serializeForm, getLabelFor } from '../util.js';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import bindAll from 'lodash/bindAll';
import { Button } from 'reactstrap';

import OrderSummary from './order_summary.jsx';
import Address from '../models/address.js';
import classNames from 'classnames';

class AddressForm extends React.Component {
  constructor() {
    super()

    let addresses = sortBy(Address.getAll(), a => a.default)

    bindAll(this, ['addAnotherAddress']);

    this.state = {
      errors: {},
      logged_in: false,
      addresses: addresses || []
    }

  }

  submitAddress(e) {
    e.preventDefault()
    Address.validate(serializeForm(e.currentTarget), (response) => {
      if (Object.keys(response.errors || {}).length) {
        this.setState({errors: response.errors})
      } else {
        Address.push(new Address(response))
        Address.saveToLocalStorage()
      }
    });
  }

  handleChange(e, attr) {
    if (this.state.errors[attr] && e.currentTarget.value) {
      this.state.errors[attr] = [];
      this.setState({errors: this.state.errors});
    }
  }

  renderFormGroup(attr) {
    let errors = this.state.errors[attr] || []
    let auto_complete = Address.getAutoComplete(attr) || attr;
    let label = getLabelFor(attr, {optional: Address.isOptionalAttr(attr)})
    let groupClassNames = classNames({'form-group': true, 'has-error': errors.length});

    if (attr === 'email' && get(this.props, 'user.email')) {
      return
    }

    return (
      <div className={groupClassNames} key={attr}>
        <label htmlFor={`address_${attr}`}>{label}</label>
        <input id={`address_${attr}`} autoComplete={`shipping ${auto_complete}`}
          className="form-control" name={attr} placeholder={label} size="30" type="text"
          onChange={(e) => this.handleChange(e, attr)} />
        <div className='error-message'>{errors.join(' & ')}</div>
      </div>
    )
  }

  clickLogin(e) {
    e.preventDefault()
    window.authModal.open()
  }

  fillInDummyData(e) {
    e.preventDefault();

    let form = e.currentTarget.closest('form');

    let form_data = serializeForm(form);

    let random_no = Math.floor((Math.random() * 3));
    let address_data = App.dummyAddresses.addresses[random_no];

    Object.keys(address_data).forEach((key) => {
      form.querySelector(`[name=${key}]`).value = address_data[key];
    })
  }

  renderAddress(address) {
    return (
      <div key={address.uuid} className="d-flex align-items-center">
        <div className="px-2 d-flex align-items-center">
          <input type="radio" name="selected" defaultChecked={address.default} />
        </div>

        <div style={{minWidth: '50%'}} className="pr-2">
          <h5>{address.first_name} {address.last_name}</h5>
          <div>{address.address1}</div>
          <div>{address.city} {address.state} {address.zip}</div>
          <div>{address.country}</div>
        </div>
      </div>
    )
  }

  addAnotherAddress(e) {
    this.setState({
      addAnotherAddress: true
    })
  }

  renderAddressOrForm() {
    if (!this.state.addAnotherAddress && this.state.addresses.length) {
      return (
        <div className="pt-2">
          {this.state.addresses.map(a => this.renderAddress(a))}

          <div className="mt-2">
            <Button onClick={this.addAnotherAddress} outline className="ml-2" color="secondary">Add another address</Button>{' '}
          </div>

          <Button size="lg" className="mt-4 ml-2" color="primary">Continue to payment</Button>{' '}
        </div>
      )
    } else {
      return (
        <div className='address-form-hold pt-2'>
          <form action="/" id="shipping_form" onSubmit={(e) => this.submitAddress(e) }>
            <div className="shipping-section">
              <div className="layout vertical">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Contact info & address</h5>

                  <div>
                    <a className='text-warning' href='#' onClick={this.fillInDummyData.bind(this)}>
                      Fill in dummy data
                    </a>
                  </div>
                </div>
                {this.renderFormGroup('email')}
              </div>
              <div className="layout vertical">
                {Address.getFormAttrs().map((attr) => this.renderFormGroup(attr))}
              </div>
              <div className="form-group submit-hold">
                <input className="btn btn-info submit-shipping" type="submit" value="Continue to payment method" />
              </div>
            </div>
          </form>
        </div>
      )
    }
  }

  renderBackButtonIfNecessary() {
    debugger
    if (this.state.addresses.length && this.state.addAnotherAddress) {
      return (
        <div className='back-button'>
          {App.svgs['long-arrow-alt-left']}
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="shipping-hold">
        {this.renderBackButtonIfNecessary()}
        <OrderSummary />

        {this.renderAddressOrForm()}
      </div>
    )
  }
}

export default AddressForm;
