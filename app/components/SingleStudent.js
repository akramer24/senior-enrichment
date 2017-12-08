import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchStudent, selectStudent, fetchCampuses } from '../reducers';
import EditStudent from './EditStudent';

class SingleStudent extends Component {

    componentDidMount() {
        this.props.loadStudent(this.props.match.params.studentId);
        this.props.loadCampuses();
    }

    render() {
        const student = this.props.selectedStudent;
        const campus = this.props.campuses.filter(campus => {
            return campus.id === student.campusId
        })[0]
        return (
            <div>
                <h1>{student.name}</h1>
                {
                    campus ?
                        <h3> 
                            <NavLink to={`/campuses/${campus.id}`}>
                                {campus.name}
                            </NavLink>
                        </h3>
                    :
                    <h4></h4>
                }
                <ul>
                    <li>Email: {student.email}</li>
                    <li>GPA: {student.gpa}</li>
                </ul>
                <EditStudent />
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        selectedStudent: state.selectedStudent,
        campuses: state.campuses
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadStudent: function(id) {
            dispatch(fetchStudent(id))
        },
        loadCampuses: function() {
            dispatch(fetchCampuses());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent));
