// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, InputLabel, MenuItem, FormControl, Select, Typography, Button } from '@material-ui/core';
//
// const styles = theme => ({
//     root: {
//         width: '100%',
//         height: '80vh'
//     },
//     heading:{
//         display: 'flex',
//         padding: '25px'
//     },
//     form:{
//         display: 'flex',
//         flexWrap: 'wrap',
//         padding: '25px'
//     },
//     formControl: {
//         marginTop: '10px',
//         marginRight: '30px',
//         minWidth: 150,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing.unit,
//     },
//     button:{
//     }
// });
//
// class Analyse extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sensor: '',
//             year: '',
//             month: '',
//             day: '',
//             time: '',
//             places: [],
//             years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
//             months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//             days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
//             times: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
//             volumes: [],
//             totalpeds: 0
//         };
//     }
//
//     componentDidMount(){
//         this.PlacesList();
//     }
//
//     PlacesList(){
//         fetch('https://m3tco48zn7.execute-api.us-east-1.amazonaws.com/deploy')
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 this.setState({places: responseJson})
//             });
//     }
//
//     handleChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     };
//
//     handleSensorLocChange = (event, sensor) => {
//         this.setState({ [event.target.name]: event.target.value });
//         // this.YearMenuList(sensor.props.sensorinstall);
//     };
//
//     handleYearChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//     };
//
//     handleSubmit=()=>{
//       console.log(this.state.sensor);
//       console.log(this.state.year);
//       console.log(this.state.month);
//       console.log(this.state.day);
//       console.log(this.state.time);
//
//       let test1 = 0;
//       let sensorQuery = "sensor_id=" + this.state.sensor;
//       let query= "$limit=30000&" + sensorQuery;
//       let api = "https://g9lhrrv8k9.execute-api.us-east-1.amazonaws.com/volumesdeploy?string=" + query;
//       fetch(api,{
//             method: 'GET',
//             mode: "cors",
//             redirect: 'follow',
//             headers: {
//                 'content-type': 'application/json'
//             }
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
//             this.setState({volumes: responseJson});
//             console.log(this.state.volumes);
//           responseJson.map((test, i)=>{
//               test1 = test1 + parseInt(test.qv_market_peel_st);
//           });
//           console.log(test1);
//       });
//
//       // let test1 = 0;
//       //   responsetoprocess.map((test, i)=>{
//       //     test1 = test1 + parseInt(test.qv_market_peel_st);
//       // });
//       // console.log(test1);
//       // this.setState({totalpeds: test1});
//     };
//
//     // YearMenuList(yearinstall){
//     //     let i = yearinstall;
//     //     if(yearinstall == 0){
//     //         i = 2009;
//     //     }
//     //     this.setState({years: []});
//     //     this.state.year = i;
//     //     for(i; i <= currentYear; i++) {
//     //         this.state.years.push(i);
//     //     }
//     //
//     // }
//
//     render() {
//         const { classes } = this.props;
//
//         return (
//             <div className={classes.root}>
//                 <Typography className={classes.heading} variant={'headline'}>Visualise Data</Typography>
//                 <form className={classes.form} autoComplete="off">
//
//                     <FormControl className={classes.formControl}>
//                         <InputLabel htmlFor="sensor-simple">Sensor Location</InputLabel>
//                         <Select
//                             value={this.state.sensor}
//                             onChange={this.handleSensorLocChange}
//                             inputProps={{
//                                 name: 'sensor',
//                                 id: 'sensor-simple',
//                             }}
//                         >
//                             <MenuItem value="0"
//                             sensorinstall={"0"}>
//                                 <em>All</em>
//                             </MenuItem>
//                             {this.state.places.map((sensor, i) =>{
//                                 return(
//                                     <MenuItem
//                                         key={i}
//                                         value={sensor.sensorid}
//                                         sensorinstall={sensor.xdate}
//                                     >{sensor.sensorloc}</MenuItem>
//                                 )}
//                             )}
//                         </Select>
//                     </FormControl>
//
//                     <FormControl className={classes.formControl}>
//                         <InputLabel htmlFor="year-simple">Year</InputLabel>
//                         <Select
//                             value={this.state.year}
//                             onChange={this.handleYearChange}
//                             inputProps={{
//                                 name: 'year',
//                                 id: 'year-simple',
//                             }}
//                         >
//                             <MenuItem value="0">
//                                 <em>All</em>
//                             </MenuItem>
//                             {this.state.years.map((yearmenu) =>{
//                                 return(
//                                     <MenuItem
//                                         key={yearmenu}
//                                         value={yearmenu}
//                                     >{yearmenu}</MenuItem>
//                                 )}
//                             )}
//                         </Select>
//                     </FormControl>
//
//                     <FormControl className={classes.formControl}>
//                         <InputLabel htmlFor="month-simple">Month</InputLabel>
//                         <Select
//                             value={this.state.month}
//                             onChange={this.handleChange}
//                             inputProps={{
//                                 name: 'month',
//                                 id: 'month-simple',
//                             }}
//                         >
//                             <MenuItem value="">
//                                 <em>All</em>
//                             </MenuItem>
//                             {this.state.months.map((monthmenu) =>{
//                                 return(
//                                     <MenuItem
//                                         key={monthmenu}
//                                         value={monthmenu}
//                                     >{monthmenu}</MenuItem>
//                                 )}
//                             )}
//                         </Select>
//                     </FormControl>
//
//                     <FormControl className={classes.formControl}>
//                         <InputLabel htmlFor="day-simple">Day</InputLabel>
//                         <Select
//                             value={this.state.day}
//                             onChange={this.handleChange}
//                             inputProps={{
//                                 name: 'day',
//                                 id: 'day-simple',
//                             }}
//                         >
//                             <MenuItem value="">
//                                 <em>All</em>
//                             </MenuItem>
//                             {this.state.days.map((daymenu) =>{
//                                 return(
//                                     <MenuItem
//                                         key={daymenu}
//                                         value={daymenu}
//                                     >{daymenu}</MenuItem>
//                                 )}
//                             )}
//                         </Select>
//                     </FormControl>
//
//                     <FormControl className={classes.formControl}>
//                         <InputLabel htmlFor="time-simple">Time</InputLabel>
//                         <Select
//                             value={this.state.time}
//                             onChange={this.handleChange}
//                             inputProps={{
//                                 name: 'time',
//                                 id: 'time-simple',
//                             }}
//                         >
//                             <MenuItem value="">
//                                 <em>All</em>
//                             </MenuItem>
//                             {this.state.times.map((timemenu) =>{
//                                 return(
//                                     <MenuItem
//                                         key={timemenu}
//                                         value={timemenu}
//                                     >{timemenu}</MenuItem>
//                                 )}
//                             )}
//                         </Select>
//                     </FormControl>
//
//                     <FormControl className={classes.formControl}>
//                     <Button variant="raised" color="primary" className={classes.button} size={"large"} onClick={this.handleSubmit}>
//                         Visualise
//                     </Button>
//                 </FormControl>
//                 </form>
//
//             </div>
//         );
//     }
// }
//
// Analyse.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(Analyse);