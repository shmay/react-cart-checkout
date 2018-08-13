import React from 'react';
import { serializeForm, getLabelFor } from '../util.js';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import bindAll from 'lodash/bindAll';
import { Form, FormGroup, Label, Input, Button, Tooltip } from 'reactstrap';

import OrderSummary from './order_summary.jsx';
import AddressBackButton from './address_back_button.jsx';
import Address from '../models/address.js';
import classNames from 'classnames';

class AddressForm extends React.Component {
  constructor(props) {
    super(props)

    let addresses = sortBy(Address.getAll(), a => !a.default)

    bindAll(this, ['addAnotherAddress', 'clickAddressBackButton', 'fillInDummyData']);

    this.state = {
      errors: {},
      logged_in: false,
      addresses: addresses || [],
      addAnotherAddress: false
    }

  }

  submitAddress(e) {
    e.preventDefault()
    let addr = new Address(serializeForm(e.currentTarget))
    addr.validate((response) => {
      if (Object.keys(response.errors || {}).length) {
        this.setState({errors: response.errors})
      } else {
        Address.getAll().forEach(a => a.default = false)
        Address.push(new Address(response))
        Address.saveToLocalStorage()

        let addresses = sortBy(Address.getAll(), a => !a.default);

        this.setState({
          addresses: addresses,
          addAnotherAddress: false
        })
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

  removeAddress(e, address) {
    e.preventDefault()

    Address.delete(address)

    this.setState({
      addresses: sortBy(Address.getAll(), a => !a.default)
    })
  }

  renderAddress(address) {
    return (
      <div key={address.uuid} className="address d-flex align-items-center mt-4">
        <FormGroup check className="mx-2 d-flex align-items-center">
          <Label check>
            <Input type="radio" name="default" defaultChecked={address.default} />{' '}
          </Label>
        </FormGroup>

        <div style={{minWidth: '50%'}} className="pr-2">
          <h5>{address.first_name} {address.last_name}<i className='address-email ml-2'>{address.email}</i></h5>
          <div>{address.address1}</div>
          <div>{address.city} {address.state} {address.zip}</div>
          <div>{address.country}</div>
        </div>

        <div className="pl-2 align-self-end">
          <a onClick={e => this.removeAddress(e, address)} href='#' className='text-danger'>remove</a>
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
    let addAnotherAddress = this.state.addAnotherAddress;

    if (!addAnotherAddress && this.state.addresses.length) {
      return (
        <div>
          <div style={{minWidth: 450}}>
            {this.state.addresses.map(a => this.renderAddress(a))}

            <div className="mt-4">
              <Button onClick={this.addAnotherAddress} outline className="ml-2" color="secondary">Add another address</Button>{' '}
            </div>

            <Button size="lg" className="mt-4 ml-2" color="primary">Continue to payment</Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='address-form-hold'>
          <form action="/" id="shipping_form" onSubmit={(e) => this.submitAddress(e) }>
            <div className="shipping-section">
              <div className="layout vertical">
                <div className="d-flex justify-content-between align-items-center">
                  {addAnotherAddress ? <AddressBackButton onClick={this.clickAddressBackButton} /> : null}

                  <h5>Contact info & address</h5>

                  <div>
                    <a className='text-info' href='#' onClick={this.fillInDummyData}>
                      Fill in dummy data
                    </a>
                  </div>
                </div>
              </div>
              <div className="layout vertical">
                {Address.getFormAttrs().map((attr) => this.renderFormGroup(attr))}
              </div>

              <Button size="lg" className="${addAnotherAddress ? 'mt-2' : 'mt-4'} mb-4 ml-2" color="primary">
                {addAnotherAddress ? 'Add Address' : 'Continue to payment'}
              </Button>
            </div>
          </form>
        </div>
      )
    }
  }

  clickAddressBackButton(e) {
    this.setState({
      addAnotherAddress: false
    })
  }

  render() {
    return (
      <div className="shipping-hold">
        <OrderSummary />

        <div className='address-hold pt-2'>
          {this.renderAddressOrForm()}
        </div>
      </div>
    )
  }
}

export default AddressForm;
