import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents } from '../reducers';
import CreateStudent from './CreateStudent';

class AllStudents extends Component {

    componentDidMount() {
        this.props.loadStudents();
    }

    render() {
        return (
            <div>
                {
                    this.props.students.map(student => {
                        return (
                            <NavLink to={`/students/${student.id}`} key={student.id}>
                                <div>
                                    <h1>{student.name}</h1>
                                </div>
                            </NavLink>
                        )
                    })
                }
                <div>
                    <CreateStudent />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        students: state.students
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadStudents: function () {
            dispatch(fetchStudents())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllStudents));