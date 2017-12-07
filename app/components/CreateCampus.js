import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';
import { getCampus } from '../reducers';

export default class CreateCampus extends Component {
    constructor() {
        super();
        
        this.state = {
            campusNameInput: '',
            descriptionInput: ''
        }

        this.createNewCampus = this.createNewCampus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }
    createNewCampus(campus) {
        axios.post('/api/campuses', { name: campus.name, description: campus.description })
            .then(res => res.data)
            .then(campus => store.dispatch(getCampus(campus)))
            .catch(err => console.error(err));
    }

    handleNameChange(event) {
        this.setState({campusNameInput: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({descriptionInput: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createNewCampus(
            {
                name: this.state.campusNameInput, 
                description: this.state.descriptionInput
            }
        );
        this.setState({campusNameInput: '', descriptionInput: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create a Campus</legend>
                    Name: <input type='text' onChange={this.handleNameChange}/><br/>
                    Description: <input type='text' onChange={this.handleDescriptionChange}/><br/>
                    <button type='submit'>Create</button>
                </fieldset>
            </form>
        )
    }

}

