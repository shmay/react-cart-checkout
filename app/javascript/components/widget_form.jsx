import React from 'react';

import Widget from '../models/widget.js.erb';
import { centsToDollaString } from '../util.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import bindAll from 'lodash/bindAll';
import pick from 'lodash/pick';

class WidgetForm extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ['onChange', 'onSubmit'])

    this.state = {
      thickness: Widget.getThickness()[0],
      color: Widget.getColors()[0],
      size: Widget.getSizes()[0]
    }
  }

  onChange(e) {
    let t = e.currentTarget
    let state = {}
    state[t.getAttribute('name')] = t.value

    this.setState(state)
  }

  onSubmit(e) {
    e.preventDefault();

    let widget = new Widget(pick(this.state, ['size', 'color', 'thickness']))

    App.cart.pushWidget(widget)

    App.drawer.widgetAdded();
  }

  render() {
    const price = centsToDollaString(Widget.getBasePriceCents())
    const svg = App.svgs[`cogs-${this.state.thickness}`]

    return (
      <div>
        <h5>Widget Factory</h5>
        <b>{price}</b>

        <div id='svg-hold' className='d-flex justify-content-center align-items-center'>
          <div style={{width: this.state.size, fill: this.state.color}} dangerouslySetInnerHTML={{__html: svg}}>
          </div>
        </div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input name='size' type="select" onChange={this.onChange}>
              {Widget.getSizes().map(size => <option key={size}>{size}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Input name='thickness' type="select" onChange={this.onChange}>
              {Widget.getThickness().map(t => <option key={t}>{t}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Input name='color' type="select" onChange={this.onChange}>
              {Widget.getColors().map(c => <option key={c}>{c}</option>)}
            </Input>
          </FormGroup>

          <Button type='submit' color="primary">Add to Cart</Button>{' '}
        </Form>
      </div>
    )
  }
}

export default WidgetForm;
