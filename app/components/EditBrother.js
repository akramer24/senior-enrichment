import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, NavLink } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { updateBrother, fetchFrats, fetchBrother } from '../reducers';


class EditBrother extends Component {
    constructor(props) {
        super(props);
        const brother = this.props.selectedBrother;
        this.state = {
            firstNameInput: brother.firstName,
            lastNameInput: brother.lastName,
            emailInput: brother.email,
            gpaInput: brother.gpa,
            imageUrlInput: brother.imageUrl,
            fratIdInput: brother.fratId
        }

        this.editBrother = this.editBrother.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleFratChange = this.handleFratChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadBrother(this.props.match.params.brotherId);
        this.props.loadFrats();
    }

    editBrother(brother) {
        axios.put(`/api/brothers/${this.props.match.params.brotherId}`, {
            firstName: brother.firstName,
            lastName: brother.lastName,
            email: brother.email,
            gpa: brother.gpa,
            imageUrl: brother.imageUrl,
            fratId: brother.fratId
        })
            .then(res => res.data)
            .then(brother => store.dispatch(updateBrother(brother)))
            .then(() => this.props.loadBrother(this.props.match.params.brotherId))
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

    // handleChange(event, key) {
    //     this.setState({ key: event.target.value })
    // }

    handleFratChange(event) {
        const frat = this.props.frats.find(frat => {
            return frat.name == event.target.value;
        });
        this.setState({ fratIdInput: frat.id });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.editBrother(
            {
                firstName: this.state.firstNameInput,
                lastName: this.state.lastNameInput,
                email: this.state.emailInput,
                gpa: this.state.gpaInput,
                imageUrl: this.state.imageUrlInput,
                fratId: this.state.fratIdInput
            }
        )
        alert('submitted')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <h3>Edit {this.props.selectedBrother.name}'s Information</h3>
                Frat: <select onChange={this.handleFratChange}>
                    <option selected disabled hidden>Select a frat</option>
                    {
                        this.props.frats.map(frat => {
                            return <option key={frat.id}>{frat.name}</option>
                        })
                    }
                </select><br />
                First Name: <input type='text' value={this.state.firstNameInput}
                    onChange={this.handleFirstNameChange} /><br />
                Last Name: <input type='text' value={this.state.lastNameInput}
                    onChange={this.handleLastNameChange} /><br />
                Email: <input type='text' value={this.state.emailInput}
                    onChange={this.handleEmailChange} /><br />
                GPA: <input type='text' value={this.state.gpaInput}
                    onChange={this.handleGPAChange} /><br />
                Profile Picture: <input type='text' value={this.state.imageUrlInput}
                    onChange={this.handleImageUrlChange} /><br />
                <button type='submit'>Edit</button>

            </form>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        frats: state.frats,
        selectedBrother: state.selectedBrother
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadFrats: function () {
            dispatch(fetchFrats());
        },
        loadBrother: function (id) {
            dispatch(fetchBrother(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBrother));