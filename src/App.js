import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Inventory from "./components/inventory.component";
import TutorialsList from "./components/tutorials-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/inventories"} className="navbar-brand">
            Inventory Management System
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/inventories"} className="nav-link">
                Tutorials
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
            <Route exact path={["/", "/inventories"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/inventories/:id" component={Inventory} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
