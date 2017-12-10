import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { fetchFrat, updateFrat } from '../reducers';

class EditFrat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameInput: '',
            descriptionInput: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editFrat = this.editFrat.bind(this);
    }

    componentDidMount() {
        this.props.loadFrat(this.props.match.params.fratId);

        const frat = this.props.selectedFrat;

        this.setState({
            nameInput: frat.name,
            descriptionInput: frat.description
        })
    }

    editFrat(frat) {
        axios.put(`/api/frats/${this.props.match.params.fratId}`, {
            name: frat.name,
            description: frat.description
        })
            .then(res => res.data)
            .then(frat => {
                console.log('made it');
                store.dispatch(updateFrat(frat))
            })
            .then(() => {
                this.props.loadFrat(this.props.match.params.fratId
            )})
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

        this.editFrat({
            name: this.state.nameInput,
            description: this.state.descriptionInput
        })
        this.setState({
            name: '',
            description: ''
        })
        alert('Submitted')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <fieldset>
                <legend>Edit Frat Information</legend>
                Name: <input type='text' value={this.state.nameInput}  
                        onChange={this.handleNameChange}/><br/>
                Description: <input type='text' value={this.state.descriptionInput}  
                        onChange={this.handleDescriptionChange}/><br/>
                <button type='submit'>Edit</button>
            </fieldset>
        </form>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        selectedFrat: state.selectedFrat
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadFrat: function(id) {
            dispatch(fetchFrat(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFrat));