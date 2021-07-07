import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";
import { Chart } from "react-google-charts";
import { Person, BoxArrowInRight, BoxArrowLeft, BoxArrowRight } from "react-bootstrap-icons";

const columns = [
    { type: "string", id: "InventoryName" },
    { type: "string", id: "ReservationGuests" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" }
]

export default class ReservationTimelinesComponent extends Component {
    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this);
        this.addRow = this.addRow.bind(this);
        this.setRowForInventory = this.setRowForInventory.bind(this);
        this.retrieveReservations = this.retrieveReservations.bind(this);
        this.retrieveInventories = this.retrieveInventories.bind(this);

        this.state = {
            inventories:[],
            reservations:[],
            rows: [],
            columns:[],
            size: 48
        };
    }

    async componentDidMount() {
        await this.retrieveInventories();
        await this.retrieveReservations();
        this.setData();
    }


    async retrieveInventories() {
        await TutorialDataService.getAll()
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

    async retrieveReservations() {
        await TutorialDataService.getAllReservation()
            .then(response => {
                this.setState({
                    reservations: response.data
                });
                console.log("retrieve reservations", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setData(){
        this.setState({
            columns:columns
        })

        this.setRowForInventory(this.state.inventories);
    }

    setRowForInventory(inventories){
        for (const inventory of inventories) {
            let reservations = this.findReservationsForInventory(inventory);
            if (reservations.length === 0){
                // this.addRow([inventory.name, "Guests:0",
                //     new Date(),new Date() ])
            }else{
                reservations.forEach((reservation)=>{
                    this.addRow([inventory.name, "Guests: "+reservation.guests.toString(),
                        new Date(reservation.dtCheckIn),new Date(reservation.dtCheckOut) ])
                })
            }
        }
    }


     findReservationsForInventory(inventory) {
        let reservations = this.state.reservations;
        reservations = reservations.filter(reservation => reservation.inventoryId === inventory.id);
        reservations = reservations.filter(reservation => (
            new Date(reservation.dtCheckIn) > new Date()
        ));
        return reservations;
    }

    addRow(row){
        let rows = this.state.rows;
        rows.push(row);
        this.setState({
            rows:rows
        })
    }

    render() {
        const {columns, rows} = this.state;

        return (
            <div>
                <div className="col-md-12 mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card border-secondary">
                                <div className="card-body">
                                    <div className="card-title">
                                        <strong>
                                            Arrivals
                                        </strong>
                                    </div>
                                    <div className="card-text">
                                        <div className="d-flex">
                                            <h3 className="mr-auto p-2">
                                                <BoxArrowInRight size={this.state.size}/>
                                            </h3>
                                            <h1 className="p-2">
                                                <div>2</div>
                                            </h1>
                                        </div>
                                        arrivals today
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-secondary">
                                <div className="card-body">
                                    <div className="card-title">
                                        <strong>
                                            Arrivals
                                        </strong>
                                    </div>
                                    <div className="card-text">
                                        <div className="d-flex">
                                            <h3 className="mr-auto p-2">
                                                <Person size={this.state.size} />
                                            </h3>
                                            <h1 className="p-2">
                                                <div>2</div>
                                            </h1>
                                        </div>
                                        guests today
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-light border-secondary">
                                <div className="card-body">
                                    <div className="card-title">
                                        <strong>
                                            Departure
                                        </strong>
                                    </div>
                                    <div className="card-text">
                                        <div className="d-flex">
                                            <h3 className="mr-auto p-2">
                                                <BoxArrowLeft size={this.state.size} />
                                            </h3>
                                            <h1 className="p-2">
                                              2  
                                            </h1>
                                        </div>
                                        departures today
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-light border-secondary">
                                <div className="card-body">
                                    <div className="card-title">
                                        <strong>
                                            Departure
                                        </strong>
                                    </div>
                                    <div className="card-text">
                                        <div className="d-flex">
                                            <h3 className="mr-auto p-2">
                                                <Person size={this.state.size} />
                                            </h3>
                                            <h1 className="p-2">
                                                <div>2</div>
                                            </h1>
                                        </div>
                                        guests today
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mb-4">
                    <h4 className="d-flex justify-content-center">Reservation List</h4>
                    <div className="col-md-12 mb-4">
                        <Chart
                            width={'100%'}
                            height={'800px'}
                            chartType="Timeline"
                            loader={<div>Loading Chart</div>}
                            data={[columns, ...rows]}
                            // rootProps={{ 'data-testid': '3' }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}