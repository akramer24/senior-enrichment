import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import { getCampus, fetchCampus } from '../reducers';

class EditCampus extends Component {
    constructor() {
        super();

        this.state = {
            nameInput: '',
            descriptionInput: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadCampus(this.props.match.params.campusId);

        const campus = this.props.selectedCampus;

        this.setState({
            nameInput: campus.name,
            descriptionInput: campus.description
        })
    }

    editCampus(campus) {
        axios.put(`/api/campuses/${this.props.match.params.campusId}`, {
            name: campus.name,
            description: campus.description
        })
            .then(res => res.data)
            .then(campus => store.dispatch(updateCampus(campus)))
            .catch(err => console.error(err));
    }

    handleNameChange(event) {
        this.setState({nameInput: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({descriptionInput: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.editCampus({
            name: this.state.nameInput,
            description: this.state.descriptionInput
        })
        this.setState({
            name: '',
            description: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <fieldset>
                <legend>Edit Campus Information</legend>
                Name: <input type='text' value={this.state.nameInput} placeholder='Required' onChange={this.handleNameChange}/><br/>
                Description: <input type='text' value={this.state.descriptionInput} placeholder='Required' onChange={this.handleDescriptionChange}/><br/>
                <button type='submit'>Edit</button>
            </fieldset>
        </form>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        selectedCampus: state.selectedCampus
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadCampus: function(id) {
            dispatch(fetchCampus(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCampus));