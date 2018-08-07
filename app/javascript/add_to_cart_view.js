import Widget from './models/widget.js.erb';
import { serializeRailsForm } from './util.js';

class AddToCartView {
  constructor() {
    const form = document.querySelector('#add_to_cart_form');
    form.onsubmit = function(e) {
      e.preventDefault();

      let widget = new Widget(serializeRailsForm(form))

      App.cart.pushWidget(widget)

      drawer.cartChanged();
    }
  }
}

export default AddToCartView;
