import Widget from './widget.js.erb';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import sumBy from 'lodash/sumBy';

class Cart {
  constructor() {
    this.widgets = null;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.getWidgets()))
  }

  getWidgets() {
    if (this.widgets) { return this.widgets; }

    let widgets = JSON.parse(localStorage.getItem('widgets')) || [];
    widgets = widgets.map(w => new Widget(w));

    return this.widgets = widgets;
  }

  pushWidget(widget) {
    let existing_widget;

    if ((existing_widget = this.findWidget(widget))) {
      existing_widget.quantity += 1;
    } else {
      this.getWidgets().push(widget);
    }

    this.saveCart();
  }

  toStatefulJSON() {
    return map(this.getWidgets(), w => w.toStatefulJSON())
  }

  saveCart(new_widgets) {
    const widget_json = new_widgets || this.getWidgets();
    localStorage.setItem('widgets', JSON.stringify(widget_json));

    App.drawer.cartChanged()

    if (widget_json.length === 1) {
      setTimeout(() => App.cartTab.cartChanged(), 500)
    } else {
      App.cartTab.cartChanged()
    }
  }

  clearCart() { this.saveCart([]); }

  removeWidget(widget) {
    this.widgets = this.widgets.filter(w => !w.eq(widget));
  }

  numWidgets() {
    return sumBy(this.getWidgets(), w => w.quantity)
  }

  calcSubtotal() {
    return reduce(this.getWidgets(), (memo, widget) => {
      return memo + widget.total()
    }, 0);
  }

  calcShipping() {
    return 5000;
  }

  calcTaxes() {
    return parseInt(this.calcSubtotal() * 0.085);
  }

  calcTotal() {
    return this.calcSubtotal() + this.calcTaxes() + this.calcShipping();
  }

  findWidget(widget) {
    return this.getWidgets().find(w => widget.eq(w));
  }

  findWidgetByKey(key) {
    return this.getWidgets().find(w => w.key === key)
  }
}

export default Cart;
