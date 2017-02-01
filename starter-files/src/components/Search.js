import React from 'react';

const Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleSubmit(e) {
    // 1. Prevent form from submitting
    e.preventDefault();
    // 2. Get the search term
    const searchTerm = this.q.value;
    // 3. Navigate the user to /search/searchTerm
    this.context.router.transitionTo(`/search/${searchTerm}`);
  },
  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(q) => this.q = q} placeholder="Hoppy, Malt, Angry, New..."/>
          <input type="submit" value="Search"/>
        </form>
      </div>
    );
  }
});

export default Search;
