import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={ ["Trainspotting", "28 Days Later"]} />
    );

    const buttons = scryRenderedDOMComponentsWithClass(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokeds callback when a button is clicked', () => {
    let votedWidth;
    const vote = (entry) => votedWidth = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithClass(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWidth).to.equal('Trainspotting');
  })
});
