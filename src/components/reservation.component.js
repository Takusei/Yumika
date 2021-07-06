import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGuests = this.onChangeGuests.bind(this);
    this.onChangeCheckIn = this.onChangeCheckIn.bind(this);
    this.onChangeCheckOut = this.onChangeCheckOut.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getReservation = this.getReservation.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        inventoryId: null,
        dtCheckIn: "",
        dtCheckOut: "",
        guests: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getReservation(this.props.match.params.id);
    console.log(this.state.currentTutorial);
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

  onChangeGuests(e) {
    const guests = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          guests: guests
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

  onChangeCheckIn(e) {
    const dtIn = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dtCheckIn: dtIn
      }
    }));
  }

  onChangeCheckOut(e) {
    const dtOut = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dtCheckOut: dtOut
      }
    }));
  }

  getReservation(id) {
    TutorialDataService.getReservation(id)
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

  updateReservation() {
    TutorialDataService.updateReservation(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The reservation was updated successfully."
        });
        setTimeout(
          () => this.props.history.push('/inventories'),
          1500
        );
      })
      .catch(e => {
        console.log(e);
        alert(e.response.data.message);
      });
  }

  cancelReservation() {    
    TutorialDataService.cancelReservation(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        alert("The reservation has been successfully canceled.");
        setTimeout(
          () => this.props.history.push('/inventories'),
          1500
        );
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
            <h4>Reservation Edit</h4>
            <form>
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <input
                  type="text"
                  className="form-control"
                  id="guests"
                  value={currentTutorial.guests}
                  onChange={this.onChangeGuests}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dtCheckIn">Checkin Date</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="dtCheckIn"
                  value={currentTutorial.dtCheckIn}
                  onChange={this.onChangeCheckIn}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dtCheckOut">Checkout Date</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  id="dtCheckOut"
                  value={currentTutorial.dtCheckOut}
                  onChange={this.onChangeCheckOut}
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
              className="btn btn-primary"
              onClick={this.updateReservation}
            >
              Update
            </button>
            <span> </span>
            <button
              className="btn btn-danger mr-2"
              onClick={this.cancelReservation}
            >
              Cancel
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