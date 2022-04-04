import React from 'react';
import './viewgame_table.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import Highcharts from 'highcharts';

import './playergamescreen.css';
import {
    HighchartsProvider, HighchartsChart, Chart, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';

import {CarouselItem} from "reactstrap";

const plotOptions = {
    series: {
        pointStart: 1
    }
};

const playerscreen = () => {
    axios.post('http://0.0.0.0:8086/playerscreen',
      {
      })
      .then(response => {
        // console.log(response.data)

        var x = response.data

        console.log(x)
      })
      .catch(error => {
        console.log(error.response)
      });
      alert("next week!");
  }

  

class GameScreen extends React.Component {
    // *Important note: the methods used only handle dummy data. 
    // Should be connected to backend and change the values using the 
    // methods accordingly

    constructor(props) {
        super(props)

  

        this.state = {
            uploadProgress: 0,
            factory: "Not Ordered",
            distributor: "Not Ordered",
            wholesaler: "Not Ordered",
            retailer: "Not Ordered",
        };
        // this.state = {  };
    }
    
   
    

  
    render() {
        return (
            <div className='containerplayer'>
                <h2>You are playing as </h2>
                <div className="maincotainer"> 
                    <Card style={{ width: "100%" }}>
                        <Card.Body>
                            <Card.Title>Place Order</Card.Title>
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <Card.Title>Incoming Order<h5 style={{ float: 'right' }}>Ending Inv.</h5></Card.Title>
                                    {/* 
                                * Change value according to actuall incoming demand and inventory 
                                */}
                                    <Card.Text id="incDemand">
                                        5
                                    <p style={{ float: 'right' }} id="totalInv">17</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <Card.Title>Order Beers</Card.Title>
                                    <input type="number" min='0'></input>
                                    {/* 
                                * Post this value accordingly to the backend 
                                */}
                                    <form method="POST">
                                        {/* <Slider
                                            defaultValue={0}

                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={50}
                                        /> */}
                                        <Button variant="primary" onClick={playerscreen}>Place Order</Button>
                                    </form>
                                </Card.Body>
                            </Card>

                        </Card.Body>
                    </Card>


                    <Card style={{ width: "100%", height: "100%" }}>
                        <Card.Body>
                            <Card.Title>Table of Data for Previous Weeks</Card.Title>

                            {/* 
                                * This Table is filled with dummy data and should be filled with data from the backend
                                */}

                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Week #</th>
                                        <th>Incoming Demand</th>
                                        <th>Incoming Shipment</th>
                                        <th>Total Inventory</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>9</td>
                                        <td>23</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>22</td>
                                        <td>35</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>9</td>
                                        <td>23</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>13</td>
                                        <td>33</td>
                                        <td>22</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                

                <div className="maincotaineraround">
                    {/* d-flex justify-content-around */}

                    <Card style={{ width: "100%" }} className='maincontaineraround' >
                        <Card.Body>
                            <Card.Title>Game Information</Card.Title>
                            <Card.Text>Week #: <span id="week#">1</span></Card.Text>
                            <Card style={{ width: "50%" }}>
                                <Card.Body>
                                    <ul>
                                        <li style={{ margin: '2px' }}>Factory: <span id="facOrder">{this.state.factory}</span></li>
                                        <li style={{ margin: '2px' }}>Distributor: <span id="distOrder">{this.state.distributor}</span></li>
                                        <li style={{ margin: '2px' }}>Wholesaler: <span id="wholOrder">{this.state.wholesaler}</span></li>
                                        <li style={{ margin: '2px' }}>Retailer: <span id="retOrder">{this.state.retailer}</span></li>
                                    </ul>
                                </Card.Body>
                            </Card>

                        </Card.Body>
                    </Card>

                    <Card style={{ width: "100%", height: "100%" }}>
                        <Card.Body>

                            {/* 
                                * These are the 4 charts that display information with dummy data
                                */}
                            <Card.Title>Graphs</Card.Title>
                            <Carousel>
                                <CarouselItem >
                                    <HighchartsProvider Highcharts={Highcharts}>
                                        <HighchartsChart plotOptions={plotOptions}>
                                            <Chart />

                                            <Title>Order Plot</Title>

                                            <Legend layout="vertical" align="right" verticalAlign="middle" />

                                            <XAxis>
                                                <XAxis.Title>Weeks</XAxis.Title>
                                            </XAxis>

                                            <YAxis>
                                                <YAxis.Title>Beers</YAxis.Title>
                                                <LineSeries name="Demand" data={[9, 15, 7, 8, 10, 2, 14, 8]} />

                                            </YAxis>
                                        </HighchartsChart>
                                    </HighchartsProvider>
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </CarouselItem>

                                <CarouselItem >
                                    <HighchartsProvider Highcharts={Highcharts}>
                                        <HighchartsChart plotOptions={plotOptions}>
                                            <Chart />

                                            <Title>Demand Plot</Title>

                                            <Legend layout="vertical" align="right" verticalAlign="middle" />

                                            <XAxis>
                                                <XAxis.Title>Weeks</XAxis.Title>
                                            </XAxis>

                                            <YAxis>
                                                <YAxis.Title>Beers</YAxis.Title>
                                                <LineSeries name="Order" data={[3, 5, 9, 11, 13, 4, 16, 20]} />

                                            </YAxis>
                                        </HighchartsChart>
                                    </HighchartsProvider>
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </CarouselItem>

                                <CarouselItem>
                                    <HighchartsProvider Highcharts={Highcharts}>
                                        <HighchartsChart plotOptions={plotOptions}>
                                            <Chart />

                                            <Title>Inventory/Backlog Plot</Title>
                                            <Legend layout="vertical" align="right" verticalAlign="middle" />

                                            <XAxis>
                                                <XAxis.Title>Weeks</XAxis.Title>
                                            </XAxis>

                                            <YAxis>
                                                <YAxis.Title>Beers</YAxis.Title>
                                                <LineSeries name="Inv/Backlog" data={[11, 8, 9, 14, 17, 5, 9, 5]} />

                                            </YAxis>
                                        </HighchartsChart>
                                    </HighchartsProvider>
                                    <Carousel.Caption>
                                    </Carousel.Caption>
                                </CarouselItem>
                                <CarouselItem>
                                    <HighchartsProvider Highcharts={Highcharts}>
                                        <HighchartsChart plotOptions={plotOptions}>
                                            <Chart />

                                            <Title>All Plots</Title>

                                            <Legend layout="vertical" align="right" verticalAlign="middle" />

                                            <XAxis>
                                                <XAxis.Title>Weeks</XAxis.Title>
                                            </XAxis>

                                            <YAxis>
                                                <YAxis.Title>Beers</YAxis.Title>
                                                <LineSeries name="Demand" data={[2, 15, 16, 18, 1, 11, 9, 8]} />
                                                <LineSeries name="Order" data={[3, 11, 15, 9, 8, 5, 16, 8]} />
                                                <LineSeries name="Inv/Backlog" data={[13, 11, 16, 7, 3, 16, 8, 9]} />

                                            </YAxis>
                                        </HighchartsChart>
                                    </HighchartsProvider>
                                </CarouselItem>

                            </Carousel>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        );
    };
}

export default GameScreen;
