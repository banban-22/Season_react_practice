// import { render } from '@testing-library/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

if (module.hot) {
  module.hot.accept();
}

class App extends React.Component {
  state = { lat: null, errorMessage: '' };
  //   constructor(props) {
  //     super(props);

  //     // This is the only time we do direct assignmnet
  //     // to this.state
  //     this.state = { lat: null, errorMessage: '' };
  //   }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  // React says we have to define render!! (Requirement from React)

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
