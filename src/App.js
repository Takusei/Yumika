import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ReservationTimelines from "./components/ReservationTimelines.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="navbar-brand">
            Yumika
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/reservations"} className="nav-link">
                TBD
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/reservations"]} component={ReservationTimelines} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
