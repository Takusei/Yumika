import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Inventory from "./components/inventory.component";
import Reservation from "./components/reservation.component";
import TutorialsList from "./components/tutorials-list.component";
import ReservationTimelines from "./components/ReservationTimelines.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Hakone Inn Inventory Management System
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/inventories"} className="nav-link">
                Inventories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/reservations"} className="nav-link">
                Reservations
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/reservations"]} component={ReservationTimelines} />
            <Route exact path="/inventories" component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/inventories/:id" component={Inventory} />
            <Route path="/reservations/:id" component={Reservation} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
