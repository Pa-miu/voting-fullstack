import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="winner">
        <h1>Winner is {this.props.winner}!</h1>
      </div>
    );
  }
})
