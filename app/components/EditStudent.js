import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, NavLink } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { updateStudent, fetchCampuses, fetchStudent } from '../reducers';


class EditStudent extends Component {
    constructor(props) {
        super(props);
        const student = this.props.selectedStudent;        
        this.state = {
            firstNameInput: student.firstName,
            lastNameInput: student.lastName,
            emailInput: student.email,
            gpaInput: student.gpa,
            imageUrlInput: student.imageUrl,
            campusIdInput: student.campusId
        }

        this.editStudent = this.editStudent.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadStudent(this.props.match.params.studentId);
        this.props.loadCampuses();
    }

    editStudent(student) {
        axios.put(`/api/students/${this.props.match.params.studentId}`, {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            gpa: student.gpa,
            imageUrl: student.imageUrl,
            campusId: student.campusId
        })
            .then(res => res.data)
            .then(student => store.dispatch(updateStudent(student)))
            .then(() => this.props.loadStudent(this.props.match.params.studentId))
            .then(() => {
                console.log('made it to submit')
                this.setState({
                    firstNameInput: '',
                    lastNameInput: '',
                    emailInput: '',
                    gpaInput: '',
                    imageUrlInput: '',
                    campusIdInput: null
                });
                console.log('submitted', this.state)
            })
            .catch(err => console.error(err));
    }

    handleFirstNameChange(event) {
        this.setState({ firstNameInput: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastNameInput: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ emailInput: event.target.value });
    }

    handleGPAChange(event) {
        this.setState({ gpaInput: event.target.value });
    }

    handleImageUrlChange(event) {
        this.setState({ imageUrlInput: event.target.value });
    }

    handleCampusChange(event) {
        const campus = this.props.campuses.find(campus => {
            return campus.name == event.target.value;
        });
        this.setState({ campusIdInput: campus.id });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.editStudent(
            {
                firstName: this.state.firstNameInput,
                lastName: this.state.lastNameInput,
                email: this.state.emailInput,
                gpa: this.state.gpaInput,
                imageUrl: this.state.imageUrlInput,
                campusId: this.state.campusIdInput
            }
        )
        alert('submitted')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Edit Information</legend>
                    Campus: <select onChange={this.handleCampusChange}>
                        <option selected disabled hidden>Select a Campus</option>
                        {
                            this.props.campuses.map(campus => {
                                return <option key={campus.id}>{campus.name}</option>
                            })
                        }
                    </select>
                    First Name: <input type='text' value={this.state.firstNameInput}
                        placeholder={this.props.selectedStudent.firstName
                            ?
                            this.props.selectedStudent.firstName : 'Required'}
                        onChange={this.handleFirstNameChange} /><br />
                    Last Name: <input type='text' value={this.state.lastNameInput}
                        placeholder={this.props.selectedStudent.lastName
                            ?
                            this.props.selectedStudent.lastName : 'Required'}
                        onChange={this.handleLastNameChange} /><br />
                    Email: <input type='text' value={this.state.emailInput}
                        placeholder={this.props.selectedStudent.email
                            ?
                            this.props.selectedStudent.email : 'Required'}
                        onChange={this.handleEmailChange} /><br />
                    GPA: <input type='text' value={this.state.gpaInput}
                        placeholder={this.props.selectedStudent.gpa
                            ?
                            this.props.selectedStudent.gpa : '0.0 to 4.0'}
                        onChange={this.handleGPAChange} /><br />
                    Profile Picture: <input type='text' value={this.state.imageUrlInput}
                        placeholder={this.props.selectedStudent.imageUrl
                            ?
                            this.props.selectedStudent.imageUrl : 'URL'}
                        onChange={this.handleImageUrlChange} /><br />
                    <button type='submit'>Edit</button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        selectedStudent: state.selectedStudent
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadCampuses: function () {
            dispatch(fetchCampuses());
        },
        loadStudent: function (id) {
            dispatch(fetchStudent(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStudent));