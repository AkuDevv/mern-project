import React, { Component } from "react";
import LoginPage from "./Components/loginpage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./Components/home";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      user: null
    };
  }

  testlogin() {
    if (this.state.connected)
      return (
        <Home
          user={this.state.user}
          logout={() => {
            this.setState({ connected: false });
          }}
        />
      );
    else
      return (
        <LoginPage
          login={user => {
            this.setState({ connected: true, user: user });
          }}
        />
      );
  }

  render() {
    return <div>{this.testlogin()}</div>;
  }
}

export default App;
