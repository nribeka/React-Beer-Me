import React from 'react';
import Header from './Header';
import Results from './Results';
import Search from './Search';

const Main = React.createClass({
  getInitialState(){
    return{
      beers: [],
      numBeers: 10,
      loading: true
    }
  },
  componentWillMount() {
    const params = this.props.params || {};
    const searchTerm = params.searchTerm || undefined;
    this.loadBeers(searchTerm);
  },
  // Fix for search from searching page. When searching from search page,
  // the component will mount is not getting called again because it's already
  // mounted. So we need to reload the beers data on other react lifecycle.
  componentWillReceiveProps(nextProps) {
    this.loadBeers(nextProps.params.searchTerm);
  },
  incrementBeers(){
    const beerAmount = this.state.numBeers + 1;
    this.setState({
      numBeers: beerAmount
    });
  },
  loadBeers(searchTerm = 'hops') {
    this.setState({ loading : true });
    const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
    if (localStorageBeers) {
      this.setState({
        beers: JSON.parse(localStorageBeers),
        loading: false
      });
    } else {
      fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
        .then(data => data.json())
        .then(beers => {
          const filteredBeers = beers.data.filter(beer => !!beer.labels);
          this.setState({
            beers: filteredBeers,
            loading: false
          });
          localStorage.setItem(`search-${searchTerm}`, JSON.stringify(filteredBeers));
        })
        .catch(err => {
          this.setState({
            loading: true
          });
        });
    }
  },
  render() {
    return(
      <div className="wrapper">
        <Header siteName="Beer Me! 💩"/>
        <Search />
        {/*
        // Spread operator, this will spread the state object into it own props
        // using the state key and value
        <Results {...this.state} />
        */}
        <Results beers={this.state.beers} loading={this.state.loading }/>
      </div>
    );
  }
});

export default Main;
