import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';
import { getFrat } from '../reducers';

export default class CreateFrat extends Component {
    constructor() {
        super();

        this.state = {
            fratNameInput: '',
            descriptionInput: '',
            imageUrlInput: ''
        }

        this.createNewFrat = this.createNewFrat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    }
    createNewFrat(frat) {
        axios.post('/api/frats', { name: frat.name, description: frat.description, imageUrl: frat.imageUrl })
            .then(res => res.data)
            .then(frat => store.dispatch(getFrat(frat)))
            .catch(err => console.error(err));
    }

    handleNameChange(event) {
        this.setState({ fratNameInput: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ descriptionInput: event.target.value });
    }

    handleImageUrlChange(event) {
        this.setState({ imageUrlInput: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.imageUrlInput) {
            this.createNewFrat(
                {
                    name: this.state.fratNameInput,
                    description: this.state.descriptionInput,
                    imageUrl: this.state.imageUrlInput
                }
            );
        } else {
            this.createNewFrat(
                {
                    name: this.state.fratNameInput,
                    description: this.state.descriptionInput
                }
            )
        }
        this.setState({ fratNameInput: '', descriptionInput: '', imageUrlInput: '' })
    }

    render() {
        return (
            <div id='create-frat'>
                <form onSubmit={this.handleSubmit}>
                    <h3>Create a Frat</h3>
                    Name: <input type='text' value={this.state.fratNameInput} placeholder='Required' onChange={this.handleNameChange} /><br />
                    Description: <input type='text' value={this.state.descriptionInput} placeholder='Required' onChange={this.handleDescriptionChange} /><br />
                    Picture: <input type='text' value={this.state.imageUrlInput} placeholder='Required' onChange={this.handleImageUrlChange} /><br />
                    <button type='submit'>Create</button>

                </form>
            </div>
        )
    }

}

