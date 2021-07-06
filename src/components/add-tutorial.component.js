import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAvailableFrom =  this.onChangeAvailableFrom.bind(this);
    this.onChangeAvailableTo =  this.onChangeAvailableTo.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      name: "",
      type:"",
      description: "",
      availableFrom:"",
      availableTo:"",
      published: false,
      submitted: false,
      error: ""
    };

  }

  onChangeName(e) {
    console.log("test", e.target.value);
    this.setState({
      name: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeAvailableFrom(e) {
    this.setState({
      availableFrom: e.target.value
    });
  }

  onChangeAvailableTo(e) {
    this.setState({
      availableTo: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      name: this.state.name,
      type: this.state.type,
      description: this.state.description,
      availableFrom: this.state.availableFrom,
      availableTo: this.state.availableTo
    };
    console.log(data);

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          // name: response.data.name,
          // type: response.data.type,
          // description: response.data.description,
          // availableFrom: response.data.availableFrom,
          // availableTo: response.data.availableTo,
          // published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      name: "",
      type:"",
      description: "",
      availableFrom:"",
      availableTo:"",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add Another Inventory
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Inventory Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Inventory Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Inventory Description</label>
              <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableFrom">Available Date From</label>
              <input
                  type="text"
                  className="form-control"
                  id="availableFrom"
                  required
                  value={this.state.availableFrom}
                  onChange={this.onChangeAvailableFrom}
                  name="availableFrom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availableTo">Available Date To</label>
              <input
                  type="text"
                  className="form-control"
                  id="availableTo"
                  required
                  value={this.state.availableTo}
                  onChange={this.onChangeAvailableTo}
                  name="availableTo"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Add New Inventory
            </button>

          </div>
        )}
      </div>
    );
  }
}
