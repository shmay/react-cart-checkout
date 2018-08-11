/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const internal_attrs = ['uuid', 'billing', 'id', 'default']
const form_attrs = ['email', 'first_name', 'last_name', 'company', 'address1', 'address2', 'city', 'state', 'zip'];

const optional_attrs = ['company']
const all_attrs = [].concat(internal_attrs).concat(form_attrs);

const auto_complete_map = {
  first_name: 'given-name',
  last_name: 'famil-name',
  company: 'organization',
  address1: 'addresss-line1',
  address2: 'address-line2'
}

import bindAll from 'lodash/bindAll';
import map from 'lodash/map';
import reject from 'lodash/reject';

import { genUUID, push } from '../util.js';

class Address {
  constructor(vals = {}) {
    bindAll(this, ['toJSON', 'emailUnique']);

    for (let a of Array.from(all_attrs)) {
      this[a] = vals[a];
    }

    if (!vals.uuid) {
      this.uuid = genUUID(vals.email);
    }
  }

  toJSON() {
    const json = {};

    for (let a of all_attrs) {
      json[a] = this[a];
    }

    return json;
  }

  emailUnique() {
    return !Address.getAll().some(a => a.email === this.email)
  }

  validate(successCb) {
    fetch('/api/addresses/validate.json', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(this.toJSON()),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }),
      credentials: 'same-origin'
    }).then(res => res.json())
      .then((json) => {
        if (!this.emailUnique()) {
          push(json, 'errors.email', 'email is not unique')
        }

        successCb(json)
      })
  }

  static getAll() {
    if (this.addresses) { return this.addresses; }

    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    this.addresses = map(addresses, a => new Address(a));

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

  static remove(addr) {
    this.addresses = reject(this.getAll(), a => addr.uuid === a.uuid)
  }

  static delete(addr) {
    Address.remove(addr);
    Address.saveToLocalStorage();
  }


  valid() {
    this.errors = []

    Address.getAll().forEach((a) => {
      if (a.email === this.email) {
        this.errors.push('Email already exists')
      }
    });

    return this.errors.length > 1
  }

}

export default Address;
