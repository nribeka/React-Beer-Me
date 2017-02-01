import React from 'react';
import Header from './Header';
import Loader from './Loader';

const Single = React.createClass({
  componentWillMount() {
    this.loadBeer();
  },
  getInitialState(){
    return{
      loading: true
    }
  },
  loadBeer() {
    this.setState({ loading : true });
    const beerId = this.props.params.beerId;
    const localStorageBeer = localStorage.getItem(`beer-${beerId}`);
    if (localStorageBeer) {
      console.log(localStorageBeer, JSON.parse(localStorageBeer));
      this.setState({
        beer: JSON.parse(localStorageBeer),
        loading: false
      })
    } else {
      fetch(`http://api.react.beer/v2/beer/${beerId}`)
        .then(data => data.json())
        .then(data => {
          localStorage.setItem(`beer-${beerId}`, JSON.stringify(data.data));
          this.setState({
            beer: data.data,
            loading: false
          });
        });
    }
  },
  render() {
    if (this.state.loading) {
      return (
        <div className="wrapper">
          <Header siteName="Beer Me! 💩"/>
          <Loader message="Pouring beer data ..." />
        </div>
      )
    }

    const { beer } = this.state;
    const { name, description } = beer;
    const image = beer.labels ? beer.labels.large : 'placeholder.jpg';

    return (
      <div className="wrapper">
        <Header siteName="Beer Me! 💩"/>
        <div className="single-beer">
          <h2>{name}</h2>
          <p>{description}</p>
          <img src={image} alt={name} />
        </div>
      </div>
    );
  }
});

export default Single;
