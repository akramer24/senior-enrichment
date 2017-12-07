import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudent, selectStudent, fetchCampuses } from '../reducers';

class SingleStudent extends Component {

    componentDidMount() {
        this.props.loadStudent(this.props.match.params.studentId);
        this.props.loadCampuses();
    }

    render() {
        const campus = this.props.campuses.filter(campus => {
            return campus.id === this.props.selectedStudent.campusId
        })[0]
        return (
            <div>
                <h3>You have selected: {this.props.selectedStudent.name}</h3>
                {
                    campus ?
                        <h4>View this student's campus: 
                            <NavLink to={`/campuses/${campus.id}`}>
                                {campus.name}
                            </NavLink>
                        </h4>
                    :
                    <h4>View this student's campus:</h4>
                }
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
