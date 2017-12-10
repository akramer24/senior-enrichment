import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store from '../store';
import axios from 'axios';
import { getBrother, fetchFrats } from '../reducers';


class CreateBrother extends Component {
    constructor() {
        super();

        this.state = {
            firstNameInput: '',
            lastNameInput: '',
            nicknameInput: '',
            emailInput: '',
            gpaInput: '',
            imageUrlInput: '',
            fratIdInput: null,
            isIdDirty: false
        }
        
        this.createNewBrother = this.createNewBrother.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
        this.handleFratChange = this.handleFratChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.loadFrats();
    }

    createNewBrother(brother) {
        axios.post('/api/brothers', {
            firstName: brother.firstName,
            lastName: brother.lastName,
            nickname: brother.nickname,
            email: brother.email,
            gpa: brother.gpa,
            imageUrl: brother.imageUrl,
            fratId: brother.fratId
        })
            .then(res => res.data)
            .then(brother => store.dispatch(getBrother(brother)))
            .catch(err => console.error(err));
    }

    handleFirstNameChange(event) {
        this.setState({firstNameInput: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastNameInput: event.target.value});
    }

    handleNicknameChange(event) {
        this.setState({nicknameInput: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({emailInput: event.target.value});
    }

    handleGPAChange(event) {
        this.setState({gpaInput: event.target.value});
    }

    handleImageUrlChange(event) {
        this.setState({imageUrlInput: event.target.value});
    }

    handleFratChange(event) {
        const frat = this.props.frats.find(frat => {
            return frat.name == event.target.value;
        });
        this.setState({fratIdInput: frat.id, isIdDirty: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.isIdDirty) {
            alert('please select a frat')
        } else if (this.state.imageUrlInput) {
            this.createNewBrother(
                {
                    firstName: this.state.firstNameInput,
                    lastName: this.state.lastNameInput,
                    nickname: this.state.nicknameInput,
                    email: this.state.emailInput,
                    gpa: this.state.gpaInput,
                    imageUrl: this.state.imageUrlInput,
                    fratId: this.state.fratIdInput
                }
            )
            this.setState({
                firstNameInput: '',
                lastNameInput: '',
                nickname: '',
                emailInput: '',
                gpaInput: '',
                imageUrlInput: '',
                fratIdInput: null
            });
        } else {
            this.createNewBrother(
                {
                    firstName: this.state.firstNameInput,
                    lastName: this.state.lastNameInput,
                    nickname: this.state.nicknameInput,
                    email: this.state.emailInput,
                    gpa: this.state.gpaInput,
                    fratId: this.state.fratIdInput
                }
            )
            this.setState({
                firstNameInput: '',
                lastNameInput: '',
                nicknameInput: '',
                emailInput: '',
                gpaInput: '',
                imageUrlInput: '',
                fratIdInput: null
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create a Brother</legend>
                    Frat: <select onChange={this.handleFratChange}>
                        <option selected disabled hidden>>Select a Frat</option>
                        {
                            this.props.frats.map(frat => {
                                return <option key={frat.id}>{frat.name}</option>
                            })
                        }
                    </select>
                    First Name: <input type='text' value={this.state.firstNameInput} placeholder='Required' onChange={this.handleFirstNameChange}/><br/>
                    Last Name: <input type='text' value={this.state.lastNameInput} placeholder='Required' onChange={this.handleLastNameChange}/><br/>
                    Nickname: <input type='text' value={this.state.nicknameInput} onChange={this.handleNicknameChange}/><br/>                    
                    Email: <input type='text' value={this.state.emailInput} placeholder='Required' onChange={this.handleEmailChange}/><br/>
                    GPA: <input type='text' value={this.state.gpaInput} placeholder='0.0 to 4.0' onChange={this.handleGPAChange}/><br/>
                    Profile picture: <input type='text' placeholder='URL' onChange={this.handleImageUrlChange}/><br/>
                    <button type='submit'>Create</button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        frats: state.frats
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadFrats: function() {
            dispatch(fetchFrats());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateBrother));