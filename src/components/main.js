import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home';
import Analyse from "./analyseData";
import Faq from "./faq";
import Map from "./map";


const Main =() => (
    <Switch>
        <Route exact path = "/" component={Home} />
        <Route path = "/mapView" component={Map} />
        <Route path = "/analyseData" component={Analyse} />
        <Route path = "/faq" component={Faq} />
    </Switch>
);

export default Main;