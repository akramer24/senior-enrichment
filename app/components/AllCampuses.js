import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, fetchStudents, removeCampus, removeStudent } from '../reducers';
import CreateCampus from './CreateCampus';
import axios from 'axios';
import store from '../store';


class AllCampuses extends Component {

    constructor() {
        super();

        this.deleteCampus = this.deleteCampus.bind(this);
        this.deleteStudents = this.deleteStudents.bind(this);
    }

    componentDidMount() {
        this.props.loadCampuses();
        this.props.loadStudents();
    }

    deleteCampus(campus) {
        axios.delete(`/api/campuses/${campus.id}`)
            .then(() => store.dispatch(removeCampus(campus)))
            .catch(err => console.error(err));
    }

    deleteStudents(campus) {
        const toBeDeleted = this.props.students.filter(student => {
            return student.campusId === campus.id;
        })
        toBeDeleted.forEach(student => {
            axios.delete(`/api/students/${student.id}`)
                .then(() => store.dispatch(removeStudent(student)))
                .catch(err => console.error(err));
        })
    }

    handleDelete(campus) {
        this.deleteStudents(campus);
        this.deleteCampus(campus);
    }

    render() {
        return (
            <div>
                <div id='campus-list'>
                    {
                        this.props.campuses.map(campus => {
                            return (
                                <div key={campus.id} className='campus-item'>
                                    <NavLink to={`/campuses/${campus.id}`}>
                                        <h1>{campus.name}</h1>
                                    </NavLink>
                                    <img src={campus.imageUrl} />
                                    <div>
                                        <button onClick={this.handleDelete.bind(this, campus)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <CreateCampus />
                </div>
            </div>
       )
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        students: state.students
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadCampuses: function () {
            dispatch(fetchCampuses());
        },
        loadStudents: function() {
            dispatch(fetchStudents());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCampuses));