import Widget from './widget.js.erb';

class Cart {
  constructor() {
  }

  getWidgets() {
    if (this.widgets) { return this.widgets; }

    let widgets = JSON.parse(localStorage.getItem('widgets')) || [];
    widgets = widgets.map(w => new Widget(w));

    return this.line_items = line_items;
  }

  pushWidget(widget) {
  }
}

export default Cart;
