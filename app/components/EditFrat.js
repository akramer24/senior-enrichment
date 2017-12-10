import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { fetchFrat, updateFrat } from '../reducers';

class EditFrat extends Component {
    constructor(props) {
        super(props);
        const frat = this.props.selectedFrat;
        this.state = {
            nameInput: frat.name,
            descriptionInput: frat.description,
            imageUrlInput: frat.imageUrl
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.editFrat = this.editFrat.bind(this);
    }

    componentDidMount() {
        this.props.loadFrat(this.props.match.params.fratId);
    }

    editFrat(frat) {
        axios.put(`/api/frats/${this.props.match.params.fratId}`, {
            name: frat.name,
            description: frat.description,
            imageUrl: frat.imageUrl
        })
            .then(res => res.data)
            .then(frat => store.dispatch(updateFrat(frat)))
            .then(() => this.props.loadFrat(this.props.match.params.fratId))
            .catch(err => console.error(err));
    }

    handleNameChange(event) {
        this.setState({ nameInput: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ descriptionInput: event.target.value });
    }

    handleImageUrlChange(event) {
        this.setState({ imageUrlInput: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.editFrat({
            name: this.state.nameInput,
            description: this.state.descriptionInput,
            imageUrl: this.state.imageUrlInput
        })
    }

    render() {
        return (
            <form id='edit-frat' onSubmit={this.handleSubmit}>

                <h3>Edit {this.props.selectedFrat.name}'s Information</h3>
                Name: <input type='text' value={this.state.nameInput}
                    onChange={this.handleNameChange} /><br />
                Description: <input type='text' value={this.state.descriptionInput}
                    onChange={this.handleDescriptionChange} /><br />
                Picture: <input type='text' value={this.state.imageUrlInput}
                    onChange={this.handleImageUrlChange} /><br />
                <button type='submit'>Edit</button>

            </form>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        selectedFrat: state.selectedFrat
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadFrat: function (id) {
            dispatch(fetchFrat(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFrat));