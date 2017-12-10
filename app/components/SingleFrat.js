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
        this.setState({ displayForm: true });
    }

    render() {
        return (
            <div id='frat-page'>
                <div id='frat-page-header'>
                    <h1 className='frat-page-text'>{this.props.selectedFrat.name}</h1>
                    <button onClick={this.displayEdit.bind(this)}>Edit Frat Info</button>
                </div>
                <h3 className='frat-page-text'>{this.props.selectedFrat.description}</h3>
                <h3 className='attribute-title'>Brothers: <br />
                    <div className='frat-info'>
                        <ul>
                            {
                                this.props.brothers.filter(brother => {
                                    return brother.fratId === this.props.selectedFrat.id
                                })
                                    .map(brother => {
                                        return (
                                            <NavLink to={`/brothers/${brother.id}`} key={brother.id} className='frat-page-brother'>
                                                <li>{brother.name}</li>
                                            </NavLink>
                                        )
                                    })
                            }
                        </ul>
                        <img src={this.props.selectedFrat.imageUrl} className='frat-img frat-info-item' />
                    </div>
                </h3>
                {
                    this.state.displayForm ? <EditFrat display={this.state.displayForm} /> : <br />
                }
            </div>
        )
    }

}

const mapStateToProps = function (state) {
    return {
        selectedFrat: state.selectedFrat,
        brothers: state.brothers
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadFrat: function (id) {
            dispatch(fetchFrat(id))
        },
        loadBrotheres: function () {
            dispatch(fetchBrothers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleFrat));
