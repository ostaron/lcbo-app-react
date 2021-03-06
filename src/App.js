import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Header from './Header/Header';

import LandingPage from './routes/LandingPage';
import Search from './routes/Search';
import ProductResults from './routes/ProductResults';
import StoreResults from './routes/StoreResults';
import Address from './routes/Address';

import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleAddressFormSubmit = this
      .handleAddressFormSubmit
      .bind(this);

    this.handleSearchFormSubmit = this
      .handleSearchFormSubmit
      .bind(this);

    this.state = {
      searchQuery: '',
      userAddress: ''
    };
  }

  handleAddressFormSubmit(streetAddress, city) {
    this.setState({userAddress: `${streetAddress}, ${city}`})
  }

  handleSearchFormSubmit(searchQuery) {
    this.setState({searchQuery: searchQuery})
  }


  render() {
    /* PropsRoute allows us to send props to the component rendered by a Route
      NeedAddressRoute redirects a user who has not set their address to the landing page, where they can enter it
    */
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (React.createElement(component, finalProps));
    }

    const PropsRoute = ({
      component,
      ...rest
    }) => {
      return (<Route
        {...rest}
        render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}/>);
    }

    const NeedAddressRoute = ({ component: Component, ...rest }) => (
    (this.state.userAddress.length > 0 ? (
          <PropsRoute component={Component} {...rest}/>
        ) : (
          <Redirect to={{
            pathname: '/'
          }}/>
        )
      )
    )

    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header
              searchQuery={this.state.searchQuery}
              userAddress={this.state.userAddress}/>
            <Switch>
              <PropsRoute
                exact
                path="/"
                component={LandingPage}
                handleAddressFormSubmit={this.handleAddressFormSubmit}/>
              ]
              <NeedAddressRoute
                path="/update-address"
                component={Address}
                handleAddressFormSubmit={this.handleAddressFormSubmit}/>
              <NeedAddressRoute
                path="/search"
                component={Search}
                handleSearchFormSubmit={this.handleSearchFormSubmit}
                />
              <NeedAddressRoute
                path="/products/:query/:page_num?"
                component={ProductResults}
                userAddress={this.state.userAddress}
                />
              <NeedAddressRoute
                path="/stores/:product_id/:page_num?"
                component={StoreResults}
                userAddress={this.state.userAddress}/>
            </Switch>
          </div>
        </BrowserRouter>
        <div className="attribution">
         <p> App developed by <a href="www.benjie.ca">Benjie Kibblewhite</a></p>
          <p><a href="https://github.com/ostaron/lcbo-app-react">View the Github Repo.</a></p>
          <p>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
        </div>
      </div>
    );
  }
}
export default App;
