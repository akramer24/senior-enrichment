import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampus, selectCampus, fetchStudents } from '../reducers';
import axios from 'axios';
import EditCampus from './EditCampus';

class SingleCampus extends Component {

    constructor() {
        super();
        this.state = {
            displayForm: false
        }
    }
    
    componentDidMount() {
        this.props.loadCampus(this.props.match.params.campusId);
        this.props.loadStudents();
    }

    displayEdit() {
        this.setState({displayForm: true});
    }

    render() {
        return (
            <div>
                <h3>You have selected: {this.props.selectedCampus.name}</h3>
                <h4>These are this campus' students: {
                    this.props.students.filter(student => {
                        return student.campusId === this.props.selectedCampus.id
                    })
                    .map(student => {
                        return (
                            <NavLink to={`/students/${student.id}`} key={student.id}>
                                <li>{student.name}</li>
                            </NavLink>
                        )
                    })
                } </h4>
                <button onClick={this.displayEdit.bind(this)}>Edit Campus Info</button>
                {
                    this.state.displayForm ? <EditCampus display={this.state.displayForm}/> : <br/>
                }
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        selectedCampus: state.selectedCampus,
        students: state.students
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadCampus: function(id) {
            dispatch(fetchCampus(id))
        },
        loadStudents: function() {
            dispatch(fetchStudents());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus));
// export default SingleCampus;