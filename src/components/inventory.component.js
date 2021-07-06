import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeAvailableFrom = this.onChangeAvailableFrom.bind(this);
    this.onChangeAvailableTo = this.onChangeAvailableTo.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        type: "",
        description: "",
        dtAvailableFrom: "",
        dtAvailableTo: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getInventory(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          name: name
        }
      };
    });
  }

  onChangeType(e) {
    const type = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          type: type
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  onChangeAvailableFrom(e) {
    const from = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dtAvailableFrom: from
      }
    }));
  }

  onChangeAvailableTo(e) {
    const to = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dtAvailableTo: to
      }
    }));
  }

  getInventory(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The inventory was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message);
      });
  }

  deleteInventory() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        alert("Inventory was successfully deleted.");
        this.props.history.push('/inventories');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Inventory Edit</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentTutorial.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  value={currentTutorial.type}
                  onChange={this.onChangeType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="availableFrom">Available From</label>
                <input
                  type="text"
                  className="form-control"
                  id="availableFrom"
                  value={currentTutorial.dtAvailableFrom}
                  onChange={this.onChangeAvailableFrom}
                />
              </div>
              <div className="form-group">
                <label htmlFor="availableTo">Available To</label>
                <input
                  type="text"
                  className="form-control"
                  id="availableTo"
                  value={currentTutorial.dtAvailableTo}
                  onChange={this.onChangeAvailableTo}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteInventory}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
