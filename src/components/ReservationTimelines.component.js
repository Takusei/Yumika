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

        this.state = {
            rows: [],
            columns:[]
        };
    }

    componentDidMount() {
        this.setData();
    }

    setData(){
        this.setState({
            columns:columns
        })

        TutorialDataService.getAll()
            .then(response => {
                this.setRowForInventory(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    async setRowForInventory(inventories){
        for (const inventory of inventories) {
            let reservations = await this.findReservationsForInventory(inventory);

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

    async findReservationsForInventory(inventory) {
        let reservations = [];
        await TutorialDataService.getAllReservation()
            .then(response => {
                reservations = response.data;
                reservations = reservations.filter(reservation => reservation.inventoryId === inventory.id);
                reservations = reservations.filter(reservation => (
                    new Date(reservation.dtCheckIn) > new Date()
                ));
                // console.log("reservation", reservations)
            })
            .catch(e => {
                console.log(e);
            });
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
                <Chart
                    width={'100%'}
                    height={'800px'}
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={[columns, ...rows]}
                    // rootProps={{ 'data-testid': '3' }}
                />
            </div>
        );
    }
}