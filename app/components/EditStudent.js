import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, NavLink } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import AllStudents from './AllStudents';
import { updateStudent, fetchCampuses, fetchStudent } from '../reducers';


class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameInput: '',
            lastNameInput: '',
            emailInput: '',
            gpaInput: '',
            campusIdInput: null,
        }
        
        this.editStudent = this.editStudent.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadStudent(this.props.match.params.studentId);        
        this.props.loadCampuses();

        const student = this.props.selectedStudent;
        console.log(this.props)
        
        this.setState({
            firstNameInput: student.firstName,
            lastNameInput: student.lastName,
            emailInput: student.email,
            gpaInput: student.gpa,
            campusIdInput: student.campusId,
        })
        
    }

    editStudent(student) {
        axios.put(`/api/students/${this.props.match.params.studentId}`, {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            gpa: student.gpa,
            campusId: student.campusId
        })
            .then(res => res.data)
            .then(student => store.dispatch(updateStudent(student)))
            .catch(err => console.error(err));
    }

    handleFirstNameChange(event) {
        this.setState({firstNameInput: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastNameInput: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({emailInput: event.target.value});
    }

    handleGPAChange(event) {
        this.setState({gpaInput: Number(event.target.value)});
    }

    handleCampusChange(event) {
        const campus = this.props.campuses.find(campus => {
            return campus.name == event.target.value;
        });
        this.setState({campusIdInput: campus.id});
    }

    handleSubmit(event) {
        event.preventDefault();
        // if (!this.state.isIdDirty) {
        //     alert('please select a campus')
        // } else {
            this.editStudent(
                {
                    firstName: this.state.firstNameInput,
                    lastName: this.state.lastNameInput,
                    email: this.state.emailInput,
                    gpa: this.state.gpaInput,
                    campusId: this.state.campusIdInput
                }
            )
            this.setState({
                firstNameInput: '',
                lastNameInput: '',
                emailInput: '',
                gpaInput: '',
                campusIdInput: null
            });
            alert('submitted')
        // }
    }

    render() {
        console.log('render', this.props)
        return (
            <form onSubmit={this.handleSubmit}>
            <fieldset>
                <legend>Edit Information</legend>
                Campus: <select onChange={this.handleCampusChange}>
                    <option>Select a Campus</option>
                    {
                        this.props.campuses.map(campus => {
                            return <option key={campus.id}>{campus.name}</option>
                        })
                    }
                </select>
                First Name: <input type='text' value={this.state.firstNameInput} placeholder='Required' onChange={this.handleFirstNameChange}/><br/>
                Last Name: <input type='text' value={this.state.lastNameInput} placeholder='Required' onChange={this.handleLastNameChange}/><br/>
                Email: <input type='text' value={this.state.emailInput} placeholder='Required' onChange={this.handleEmailChange}/><br/>
                GPA: <input type='text' placeholder='0.0 to 4.0' onChange={this.handleGPAChange}/><br/>
                <button type='submit'>Edit</button>
            </fieldset>
        </form>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        campuses: state.campuses,
        selectedStudent: state.selectedStudent
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadCampuses: function() {
            dispatch(fetchCampuses());
        },
        loadStudent: function(id) {
            dispatch(fetchStudent(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStudent));