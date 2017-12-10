import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import AllFrats from './AllFrats';
import AllBrothers from './AllBrothers';
import SingleFrat from './SingleFrat';
import SingleBrother from './SingleBrother';
import Navbar from './Navbar';
import Home from './Home';

function Main() {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/frats' component={AllFrats} />
                    <Route path='/frats/:fratId' component={SingleFrat} />
                    <Route exact path='/brothers' component={AllBrothers} />
                    <Route path='/brothers/:brotherId' component={SingleBrother} />
                </Switch>
            </div>
        </Router>
    )
}

export default Main;