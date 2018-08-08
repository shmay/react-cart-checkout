import React from 'react';
import { serializeForm, getLabelFor } from '../util.js';
import get from 'lodash/get';

import OrderSummary from './order_summary.jsx';
import Address from './models/address.js';
import classNames from 'classnames';

class AddressView extends React.Component {
  constructor() {
    super()
    this.state = {
      errors: {},
      logged_in: false
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

    if (attr === 'email' && baseGet(this.props, 'user.email')) {
      return
    }

    return (
      <div className={groupClassNames} key={attr}>
        <label htmlFor={`address_${attr}`}>{label}</label>
        <input id={`address_${attr}`} autoComplete={`shipping ${auto_complete}`} className="form-control"
          name={attr} placeholder={label} size="30" type="text" onChange={(e) => this.handleChange(e, attr)} />
        <div className='error-message'>{errors.join(' & ')}</div>
      </div>
    )
  }

  clickLogin(e) {
    e.preventDefault()
    window.authModal.open()
  }

  renderLogin() {
    const email = baseGet(this.props, 'user.email')

    if (email) {
      return (
        <div>Welcome, {email.split('@')[0].replace(/\d+$/, '')}</div>
      )
    } else {
      return (
        <div>
          <span>already have an account?</span>
          <a href="#" onClick={e => this.clickLogin(e)}>login</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="shipping-hold">
        <OrderSummary />
        <div className='address-form-hold'>
          <form action="/" id="shipping_form" onSubmit={(e) => this.submitAddress(e) }>
            <div className="shipping-section">
              <div className="layout vertical">
                <div className="layout horizontal center justified">
                  <h2>Contact information</h2>

                  {this.renderLogin()}
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
      </div>
    )
  }
}

export default AddressView;
