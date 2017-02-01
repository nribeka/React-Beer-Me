import React from 'react';
import { Link } from 'react-router';
import slug from 'slugify';

const Beer = React.createClass({
  propTypes: {
    details: React.PropTypes.object.isRequired
  },
  render() {
    const { name, labels, id } = this.props.details;
    const image = labels ? labels.medium : 'placeholder.jpg';

    return (
      <div className="beer">
        <Link to={`/beer/${id}/${slug(name)}`}>
          <h2>{name}</h2>
          <img src={image} alt={name} />
        </Link>
      </div>
    );
  }
});

export default Beer;
