import React, {Component} from "react"
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Map, {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import {googleMapsAPIKey} from "../helpers/constants";

class MapView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            places: []
        };
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }
    componentDidMount(){
        this.PlacesList();
    }

    PlacesList(){
        fetch('https://data.melbourne.vic.gov.au/resource/xbm5-bb4n.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({places: responseJson})
            })
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
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
            height: '80vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        };

        const root = {
            width: '100%',
            height: '90vh',
        };

        const paper1={
          position: 'relative',
          marginTop: 'auto',
          padding: '25px'
        };

        return(
            <div style={root}>
                <div style={style}>
                <Map
                    item
                    xs = { 12 }
                    style = { style }
                    google = { this.props.google }
                    onClick = { this.onMapClick }
                    zoom = { 15 }
                    initialCenter = {{ lat: -37.81, lng: 144.96332 }}
                >
                    {this.state.places.map((marker, i) =>{
                        return(
                            <Marker
                                key={i}
                                position={{lat: marker.latitude, lng: marker.longitude}}
                                name={marker.sensorloc}
                                id={marker.sensorid}
                                latitude={marker.latitude}
                                longitude={marker.longitude}
                                installdate={marker.xdate}
                                onClick = { this.onMarkerClick }
                            />
                        )}
                    )}
                    <InfoWindow
                        marker = { this.state.activeMarker }
                        visible = { this.state.showingInfoWindow }
                    >
                        <Paper>
                            <Typography variant = 'subheading'>
                                {this.state.selectedPlace.name}
                            </Typography>
                        </Paper>
                    </InfoWindow>
                </Map>
                </div>
                <Paper style={paper1} square={true} elevation={0}>
                    <Typography variant = 'title'>
                        Sensor Name: {this.state.selectedPlace.name}
                    </Typography>
                    <hr/>
                    <Typography variant = 'body1'>
                        Sensor location: {this.state.selectedPlace.latitude}, {this.state.selectedPlace.longitude}
                    </Typography>
                    <Typography variant = 'body1'>
                        Sensor Installed: {this.state.selectedPlace.installdate}
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: googleMapsAPIKey
})(MapView);