import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

function Main() {
    return (
        <Router>
            <div>
                <div>
                    <NavLink to='/campuses'>
                        <span>Campuses</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/students'>
                        <span>Students</span>
                    </NavLink>
                </div>
                <Switch>
                    <Route exact path='/campuses' component={AllCampuses} />
                    <Route path='/campuses/:campusId' component={SingleCampus} />
                    <Route exact path='/students' component={AllStudents} />
                    <Route path='/students/:studentId' component={SingleStudent} />
                </Switch>
            </div>
        </Router>
    )
}

export default Main;