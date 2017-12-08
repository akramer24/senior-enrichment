import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents, fetchCampuses } from '../reducers';
import CreateStudent from './CreateStudent';
import axios from 'axios';

class AllStudents extends Component {

    constructor() {
        super();

        this.deleteStudent = this.deleteStudent.bind(this);
    }

    componentDidMount() {
        this.props.loadStudents();
    }

    deleteStudent(student) {
        axios.delete(`/api/students/${student.id}`)
            .then(res => res.data)
            .catch(err => console.error(err));
    }

    handleDelete(student) {
        this.deleteStudent(student);
    }

    render() {
        return (
            <div>
                <div id='student-list'>
                    {
                        this.props.students.map(student => {
                            return (
                                <div key={student.id} className='student-item'>
                                    <NavLink to={`/students/${student.id}`} className='student-name'>
                                        <div>
                                            <h1>{student.name}</h1>
                                        </div>
                                    </NavLink>
                                    <NavLink to={`/campuses/${student.campusId}`}>
                                        <h3>{student.campus && student.campus.name}</h3>
                                    </NavLink>
                                    <div className='student-flex'>
                                        <ul className='student-attributes'>
                                            <li>Email: {student.email}</li>
                                            <li>GPA: {student.gpa}</li>
                                        </ul>
                                        <div>
                                            <img src={student.imageUrl} className='student-img'/>    
                                        </div>
                                    </div>
                                    <button onClick={this.handleDelete.bind(this, student)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <CreateStudent />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        students: state.students    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadStudents: function () {
            dispatch(fetchStudents())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllStudents));