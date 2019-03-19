import React, {Component} from "react"
import {Paper, Typography} from "@material-ui/core/";
import Map, {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import {googleMapsAPIKey} from "../helpers/constants";
import {Bar, Line} from 'react-chartjs-2';
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            places: [],
            chartData: [],
            lineChart: {},
            evechartData: [],
            evebarChart: {},
            morchartData: [],
            morbarChart: {},
            total: 0,
            popularmonth: "",
            currentpeds: 0,
            totalSensors: 0
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

    componentDidMount() {
        this.PlacesList();
    }

    PlacesList() {
        fetch('https://m3tco48zn7.execute-api.us-east-1.amazonaws.com/deploy')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({places: responseJson});
                this.setState({totalSensors: this.state.places.length});
            })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

        this.getEstimatedPeds(marker.id);
        this.getPedestrianData(marker.id);
        this.getMorningData(marker.id);
        this.getEveningData(marker.id);

    };

    getEstimatedPeds(id) {
        let query = "sensor_id=" + id;
        let api = "https://0w1020xhl0.execute-api.us-east-1.amazonaws.com/deploy?string=" + query;
        fetch(api, {
            method: 'GET',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({currentpeds: responseJson})
            });
    }

    getPedestrianData(id) {
        let query = "sensor_id=" + id;
        let api = "https://g9lhrrv8k9.execute-api.us-east-1.amazonaws.com/volumesdeploy?string=" + query;
        fetch(api, {
            method: 'GET',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({chartData: responseJson});
                let totalYearlyPeds = 0;
                let maxValue = 0;
                let months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                let popularMonth = "";
                for (let i = 0; i < responseJson.length; i++) {
                    totalYearlyPeds = totalYearlyPeds + parseInt(responseJson[i], 10);
                    if (parseInt(maxValue, 10) < parseInt(responseJson[i], 10)) {
                        maxValue = parseInt(responseJson[i], 10);
                        popularMonth = months[i];
                    }
                }

                this.setState({popularmonth: popularMonth});
                this.setState({total: totalYearlyPeds});
                this.setState({
                    lineChart: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                            {
                                label: 'Pedestrian',
                                data: responseJson,
                                backgroundColor: [
                                    '#ff6384'
                                ]
                            }
                        ]
                    }
                })
            });
    };

    getEveningData(id) {
        let query = "sensor_id=" + id;
        let api = "https://j8pjoi32qg.execute-api.us-east-1.amazonaws.com/deploy?string=" + query;
        fetch(api, {
            method: 'GET',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({evechartData: responseJson});
                this.setState({
                    evebarChart: {
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        datasets: [
                            {
                                label: 'Average Pedestrian',
                                data: responseJson,
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                ]
                            }
                        ]
                    }
                })
            });
    };

    getMorningData(id) {
        let query = "sensor_id=" + id;
        let api = "https://mkchhb14nc.execute-api.us-east-1.amazonaws.com/deploy?string=" + query;
        fetch(api, {
            method: 'GET',
            mode: "cors",
            redirect: 'follow',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({morchartData: responseJson});
                this.setState({
                    morbarChart: {
                        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                        datasets: [
                            {
                                label: 'Average Pedestrian',
                                data: responseJson,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                ]
                            }
                        ]
                    }
                })
            });
    };

    onMapClick = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const style = {
            width: '100%',
            height: '65vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        };

        const root = {
            width: '100%',
            height: '100%',
        };

        const paper1 = {
            position: 'relative',
            marginTop: 'auto',
            padding: '25px'
        };

        const paper2 = {
            minHeight: '200px',
            minWidth: '45%',
            padding: '20px',
            marginLeft: '20px',
            marginBottom: '40px'
        };

        return (
            <div style={root}>
                <div style={style}>
                    <Map
                        item
                        xs={12}
                        style={style}
                        google={this.props.google}
                        onClick={this.onMapClick}
                        zoom={15.35}
                        initialCenter={{lat: -37.815, lng: 144.96332}}
                    >
                        {this.state.places.map((marker, i) => {
                                return (
                                    <Marker
                                        key={i}
                                        position={{lat: marker.latitude, lng: marker.longitude}}
                                        name={marker.sensor_description}
                                        id={marker.sensor_id}
                                        latitude={marker.latitude}
                                        longitude={marker.longitude}
                                        installdate={marker.installation_date.substr(0, 4)}
                                        status={marker.status}
                                        onClick={this.onMarkerClick}
                                    />
                                )
                            }
                        )}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <Paper>
                                <Typography variant='subheading'>
                                    {this.state.selectedPlace.name}
                                </Typography>
                            </Paper>
                        </InfoWindow>
                    </Map>
                </div>
                <Paper style={paper1} elevation={0}>
                <Grid container spacing={16} item xs={12}>
                    <Paper style={paper2}>
                        <Typography variant='title'>
                            Sensor Name: {this.state.selectedPlace.name}
                        </Typography>
                        <br/>
                        <hr/>
                        <br/>
                        <Typography variant='subheading'>
                            Sensor location: {this.state.selectedPlace.latitude}, {this.state.selectedPlace.longitude}
                        </Typography>
                        <Typography variant='subheading'>
                            Sensor Installed: {this.state.selectedPlace.installdate}
                        </Typography>
                        <Typography variant='subheading'>
                            Sensor Current Status: {this.state.selectedPlace.status === 'A' ? 'Active' : 'Inactive'}
                        </Typography>
                        <br/><br/>
                    </Paper>
                    <Paper style={paper2}>
                        <br/>
                        <Typography color="textSecondary" variant={"subheading"}>
                            Estimated pedestrians at this hour
                            <Tooltip title="Calculated based on historical data. To give rough estimate.">
                                <IconButton aria-label="Info">
                                    <InfoIcon/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <Typography variant={"display3"}>
                            {this.state.currentpeds}
                        </Typography>
                    </Paper>
                </Grid>
                 <Grid container spacing={16} item xs={12}>
                    <Paper style={paper2}>
                        <br/>
                        <Typography color="textSecondary" variant={"subheading"}>
                            Total number of pedestrian last year.
                        </Typography>
                        <Typography variant={"display3"}>
                            {this.state.total}
                        </Typography>
                        <br/><br/><hr/><br/>
                        <Typography color="textSecondary" variant={"subheading"}>
                            Most Popular month
                        </Typography>
                        <Typography variant={"display3"}>
                            {this.state.popularmonth}
                        </Typography>
                    </Paper>
                    <Paper style={paper2}>
                        <Line data={this.state.lineChart}
                              options={{
                                  title: {
                                      display: true,
                                      text: 'Pedestrian Volume per month',
                                      fontSize: 20
                                  },
                                  legend: {
                                      display: false
                                  }
                              }}
                        />
                    </Paper>
                </Grid>
                 <Grid container spacing={16} item xs={12}>
                    <Paper style={paper2}>
                        <Bar data={this.state.evebarChart}
                             options={{
                                 title:{
                                     display: true,
                                     text: 'Average Pedestrian per Hour(Evening Peak)',
                                     fontSize:20
                                 },
                                 legend: {
                                     display: false
                                 }
                             }}
                        />
                    </Paper>
                    <Paper style={paper2}>
                        <Bar data={this.state.morbarChart}
                             options={{
                                 title: {
                                     display: true,
                                     text: 'Average Pedestrian per hour (Morning Peak)',
                                     fontSize: 20
                                 },
                                 legend: {
                                     display: false
                                 }
                             }}
                        />
                    </Paper>
                </Grid>

                <Grid container spacing={16}>
                    <Paper style={paper2}>
                        <br/>
                        <Typography color="textSecondary" variant={"subheading"}>
                            Total number on sensors installed to this day.
                        </Typography>
                        <Typography variant={"display3"}>
                            {this.state.totalSensors}
                        </Typography>
                    </Paper>
                </Grid>
                </Paper>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapsAPIKey
})(MapView);
