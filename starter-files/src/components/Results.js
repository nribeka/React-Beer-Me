import React from 'react';
import Beer from './Beer';
import Loader from './Loader';

const Results = React.createClass({
  propTypes: {
    beers: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired
  },
  render() {
    if (this.props.loading) {
      return <Loader message="Loading some beer data ..." />
    }
    return (
      <div className="beers">
        {this.props.beers.map(details => <Beer details={details} key={details.id} />)}
      </div>
    );
  }
});

export default Results;
