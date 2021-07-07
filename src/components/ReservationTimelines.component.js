import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service";
import { Chart } from "react-google-charts";

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
            columns:[]
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
        );
    }
}