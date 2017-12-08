import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { getStudent, fetchCampuses } from '../reducers';


class CreateStudent extends Component {
    constructor() {
        super();

        this.state = {
            firstNameInput: '',
            lastNameInput: '',
            emailInput: '',
            gpaInput: '',
            campusIdInput: null,
            isIdDirty: false
        }
        
        this.createNewStudent = this.createNewStudent.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadCampuses();
    }

    createNewStudent(student) {
        axios.post('/api/students', {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            gpa: student.gpa,
            campusId: student.campusId
        })
            .then(res => res.data)
            .then(student => store.dispatch(getStudent(student)))
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
        this.setState({campusIdInput: campus.id, isIdDirty: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.isIdDirty) {
            alert('please select a campus')
        } else {
            this.createNewStudent(
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
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create a Student</legend>
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
                    <button type='submit'>Create</button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadCampuses: function() {
            dispatch(fetchCampuses());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateStudent));