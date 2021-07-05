import React, {Component, forwardRef} from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveInventories = this.retrieveInventories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInventory = this.setActiveInventory.bind(this);
    this.removeAllInventories = this.removeAllInventories.bind(this);
    this.searchBoth = this.searchBoth.bind(this);
    this.handleChangeFromTo = this.handleChangeFromTo.bind(this);


    this.state = {
      inventories: [],
      currentInventory: null,
      currentIndex: -1,
      searchName: "",
      searchFrom: "",
      searchTo: ""
    };
  }

  componentDidMount() {
    this.retrieveInventories();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  handleChangeFromTo(dates) {
    const [from, to] = dates;
    this.setDateFrom(from);
    this.setDateTo(to);
  }

  setDateFrom(date){
    const formatDate = date == null? "": format(date, "yyyy-MM-dd", {
      awareOfUnicodeTokens: true })
    console.log("search from",  formatDate);
    this.setState({
      searchFrom:formatDate
    });
  }

  setDateTo(date) {
    const formatDate = date == null? "" : format(date, "yyyy-MM-dd", {
      awareOfUnicodeTokens: true })
    console.log("search to",  formatDate);
    this.setState({
      searchTo:formatDate
    });
  }

  retrieveInventories() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          inventories: response.data
        });
        console.log("retrieve inventory", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    console.log("refresh list");
    this.retrieveInventories();
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });
  }

  setActiveInventory(inventory, index) {
    this.setState({
      currentInventory: inventory,
      currentIndex: index
    });
  }

  removeAllInventories() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName(name) {
    // this.retrieveInventories();
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });
    let inventories = this.state.inventories;

    console.log("Flitter", name, inventories.filter(inventories => inventories.name == name));
    return inventories.filter(inventories => inventories.name == name);
  }


  searchBoth() {
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });

    if(this.state.searchName !== ""){
      console.log("search by name")
      this.setState({
        inventories: this.searchName(this.state.searchName)
      })
    }

    if(this.state.searchFrom !== "" && this.state.searchTo !== ""){
      console.log("search by date")
      TutorialDataService.findByDate(this.state.searchFrom, this.state.searchTo)
          .then(response => {
            this.setState({
              inventories: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    if(this.state.searchFrom === "" && this.state.searchTo === "" && this.state.searchName === "") {
      this.retrieveInventories();
    }
  }

  render() {
    const { searchName, searchFrom, searchTo, inventories, currentInventory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <DatePicker
                className="form-control"
                selected={Date.parse(searchFrom)}
                onChange={this.handleChangeFromTo}
                selectsRange
                placeholderText="Search by Available"
                startDate={Date.parse(searchFrom)}
                endDate={Date.parse(searchTo)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                showClearButton={true}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBoth}
              >
                Search
              </button>
            </div>
          </div>
          {searchFrom && searchTo && (
              <div className="summary">
                <p>
                  You search an inventory from {searchFrom} to{" "}
                  {searchTo}.
                </p>
              </div>
          )}
        </div>

        <div className="col-md-6">
          <h4>Inventory List</h4>
          <ul className="list-group">
            {inventories &&
            inventories.map((inventory, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInventory(inventory, index)}
                  key={index}
                >
                  {inventory.id + " " + inventory.name + " " +inventory.type }
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllInventories}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentInventory ? (
            <div>
              <h4>Inventory</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {currentInventory.id}
              </div>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentInventory.name}
              </div>
              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentInventory.type}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentInventory.description}
              </div>
              <div>
                <label>
                  <strong>Available From:</strong>
                </label>{" "}
                {currentInventory.dtAvailableFrom}
              </div>
              <div>
                <label>
                  <strong>Available To:</strong>
                </label>{" "}
                {currentInventory.dtAvailableTo}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentInventory.status}
              </div>

              <Link
                to={"/inventories/" + currentInventory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Inventory...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
