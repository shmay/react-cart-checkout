/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const internal_attrs = ['uuid', 'billing', 'id', 'default']
const form_attrs = ['first_name', 'last_name', 'company', 'address1',
                    'address2', 'city', 'state', 'zip'];
const optional_attrs = ['company']
const all_attrs = [].concat(internal_attrs).concat(form_attrs);

const auto_complete_map = {
  first_name: 'given-name',
  last_name: 'famil-name',
  company: 'organization',
  address1: 'addresss-line1',
  address2: 'address-line2'
}

import { genUUID } from '../util.js';

class Address {
  constructor(vals) {
    this.toJSON = this.toJSON.bind(this);
    if (vals == null) { vals = {}; }
    for (let a of Array.from(all_attrs)) {
      this[a] = vals[a];
    }

    if (!vals.uuid) { this.uuid = genUUID(); }
  }

  toJSON() {
    const json = {};

    for (let a of Array.from(all_attrs)) {
      json[a] = this[a];
    }

    return json;
  }

  static validate(attrs, successCb) {
    fetch('/api/addresses/validate', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(attrs),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }),
      credentials: 'same-origin'
    }).then(res => res.json())
      .catch(error => alert('an error occurred while trying to validate this address'))
      .then(successCb)
  }

  static getAll() {
    if (this.addresses) { return this.addresses; }

    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    this.addresses = _.map(addresses, addr => new App.Address(addr));

    return this.addresses;
  }

  static push(addr) { this.getAll().push(addr); }

  static saveToLocalStorage(json) {
    localStorage.setItem('addresses', JSON.stringify(json || this.getAll()));
  }

  static reset() {
    this.saveToLocalStorage([]);
    this.addresses = [];
  }

  static getAttrs() {
    return attrs;
  }

  static getFormAttrs() {
    return form_attrs;
  }

  static getAutoComplete(attr) {
    return auto_complete_map[attr];
  }

  static isOptionalAttr(attr) {
    return optional_attrs.includes(attr);
  }
}

export default Address;
