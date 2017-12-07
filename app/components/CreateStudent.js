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
            gpaInput: null,
            campusIdInput: null
        }
        
        this.createNewStudent = this.createNewStudent.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
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
            .catch(err => console.erroer(err));
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
        this.setState({gpaInput: event.target.value});
    }

    handleCampusChange(event) {
        const campus = this.props.campuses.filter(campus => {
            return campus.name == event.target.value;
        })[0];
        console.log(this.state);
        console.log(campus.id);
        
        this.setState({campusIdInput: campus.id});
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createNewStudent(
            {
                firstName: this.state.firstNameInput,
                lastName: this.state.lastNameInput,
                email: this.state.emailInput,
                gpa: this.state.gpaInput,
                campusId: this.state.campusId
            }
        )
        .then(() => this.setState({
            firstNameInput: '',
            lastNameInput: '',
            emailInput: '',
            gpaInput: null,
            campusIdInput: null
        }))
        .catch(err => console.error(err));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create a Student</legend>
                    Campus: <select onChange={this.handleCampusChange}>
                        {
                            this.props.campuses.map(campus => {
                                return <option key={campus.id}>{campus.name}</option>
                            })
                        }
                    </select>
                    First Name: <input type='text' onChange={this.handleFirstNameChange}/><br/>
                    Last Name: <input type='text' onChange={this.handleLastNameChange}/><br/>
                    Email: <input type='text' onChange={this.handleEmailChange}/><br/>
                    GPA: <input type='text' onChange={this.handleGPAChange}/><br/>
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