import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFrat, fetchBrothers } from '../reducers';
import axios from 'axios';
import EditFrat from './EditFrat';

class SingleFrat extends Component {

    constructor() {
        super();
        this.state = {
            displayForm: false
        }
    }
    
    componentDidMount() {
        this.props.loadFrat(this.props.match.params.fratId);
        this.props.loadBrotheres();
    }

    displayEdit() {
        this.setState({displayForm: true});
    }

    render() {
        return (
            <div>
                <h3>You have selected: {this.props.selectedFrat.name}</h3>
                <h4>These are this frats' brothers: {
                    this.props.brothers.filter(brother => {
                        return brother.fratId === this.props.selectedFrat.id
                    })
                    .map(brother => {
                        return (
                            <NavLink to={`/brothers/${brother.id}`} key={brother.id}>
                                <li>{brother.name}</li>
                            </NavLink>
                        )
                    })
                } </h4>
                <button onClick={this.displayEdit.bind(this)}>Edit Frat Info</button>
                {
                    this.state.displayForm ? <EditFrat display={this.state.displayForm}/> : <br/>
                }
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        selectedFrat: state.selectedFrat,
        brothers: state.brothers
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        loadFrat: function(id) {
            dispatch(fetchFrat(id))
        },
        loadBrotheres: function() {
            dispatch(fetchBrothers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleFrat));
