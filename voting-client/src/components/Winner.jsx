import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  
  render: function() {
    return (
      <div className="winner">
        <h1>Winner is {this.props.winner}!</h1>
      </div>
    );
  }
})
