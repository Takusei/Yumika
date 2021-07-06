import React, {Component} from "react";
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
      reservations:[],
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
      currentIndex: index,
    });
    this.setActiveReservation(inventory);
    console.log(index);
    console.log(this.state);
  }

  setActiveReservation(inventory) {
    TutorialDataService.getAllReservation()
        .then(response => {
          let reservations = response.data;
          reservations = reservations.filter(reservations => reservations.inventoryId === inventory.id);
          this.setState({
            reservations: reservations
          });
          console.log("retrieve reservations", reservations);
        })
        .catch(e => {
          console.log(e);
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
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });

    TutorialDataService.getAll()
        .then(response => {
          let inventories = response.data;
          inventories = inventories.filter(inventories => inventories.name === name);
          this.setState({
            inventories: inventories
          });
        })
        .catch(e => {
          console.log(e);
        });
  }


  searchBoth() {
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });

    if(this.state.searchFrom !== "" && this.state.searchTo !== ""){
      console.log("search by date")

      TutorialDataService.findByDate(this.state.searchFrom, this.state.searchTo)
          .then(response => {
            if (this.state.searchName === ""){
              this.setState({
                inventories: response.data
              });
            }else{
              let inventories = response.data;
              inventories = inventories.filter(inventories => inventories.name === this.state.searchName)
              this.setState({
                inventories: inventories
              })
            }
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    if(this.state.searchFrom === "" && this.state.searchName !== ""){
      console.log("search by name")
      this.searchName(this.state.searchName)
    }

    if(this.state.searchFrom === "" && this.state.searchTo === "" && this.state.searchName === "") {
      this.retrieveInventories();
    }
  }

  render() {
    const { searchName, searchFrom, searchTo, inventories, reservations, currentInventory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
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

        <div className="col-md-8">
          <h4>Inventory List</h4>
          <table className="table table-fixed">
            <thead>
            <tr>
              <th className="col-md-4">#</th>
              <th className="col-md-4">Inventory Name</th>
              <th className="col-md-4">Room Type</th>
            </tr>
            </thead>
            <tbody>
                {inventories &&
                inventories.map((inventory, index) => (
                    <tr
                      className={
                        (index === currentIndex ? "table-active" : "")
                      }
                      onClick={() => this.setActiveInventory(inventory, index)}
                      key={index}
                    >
                        <th className="col-md-4">{index + 1}</th>
                        <td className="col-md-4">{inventory.name}</td>
                        <td className="col-md-4">{inventory.type}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          {currentInventory ? (
            <div>
              <h4>Inventory Details</h4>
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
                className="btn btn-warning"
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

        <div className="col-md-12">
            <div>
              <h4>Reservation List</h4>
              <table className="table table-fixed">
                <thead>
                <tr>
                  <th className="col-md-3">Guests</th>
                  <th className="col-md-3">CheckIn</th>
                  <th className="col-md-3">CheckOut</th>
                  <th className="col-md-3">actions</th>
                </tr>
                </thead>
                <tbody>
                    {reservations &&
                    reservations.map((reservations, index) => (
                      <div>
                          <tr
                            key={index}
                          >
                            <td className="col-md-3">{reservations.guests}</td>
                            <td className="col-md-3">{reservations.dtCheckIn}</td>
                            <td className="col-md-3">{reservations.dtCheckOut}</td>
                            <td className="col-md-3">
                              <Link
                                  to={"/reservations/" + reservations.id}
                                  className="btn btn-warning"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                      </div>
                    ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }
}
