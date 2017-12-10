import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFrats, fetchBrothers, removeFrat, removeBrother } from '../reducers';
import CreateFrat from './CreateFrat';
import axios from 'axios';
import store from '../store';


class AllFrats extends Component {

    constructor() {
        super();

        this.deleteFrat = this.deleteFrat.bind(this);
        this.deleteBrothers = this.deleteBrothers.bind(this);
    }

    componentDidMount() {
        this.props.loadFrats();
        this.props.loadBrothers();
    }

    deleteFrat(frat) {
        axios.delete(`/api/frats/${frat.id}`)
            .then(() => store.dispatch(removeFrat(frat)))
            .catch(err => console.error(err));
    }

    deleteBrothers(frat) {
        const toBeDeleted = this.props.brothers.filter(brother => {
            return brother.fratId === frat.id;
        })
        toBeDeleted.forEach(brother => {
            axios.delete(`/api/brothers/${brother.id}`)
                .then(() => store.dispatch(removeBrother(brother)))
                .catch(err => console.error(err));
        })
    }

    handleDelete(frat) {
        this.deleteBrothers(frat);
        this.deleteFrat(frat);
    }

    render() {
        return (
            <div>
                <div id='frat-list'>
                    {
                        this.props.frats.map(frat => {
                            return (
                                <div key={frat.id} className='frat-item'>
                                    <NavLink to={`/frats/${frat.id}`}>
                                        <h1>{frat.name}</h1>
                                    </NavLink>
                                    <img src={frat.imageUrl} />
                                    <div>
                                        <button onClick={this.handleDelete.bind(this, frat)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <CreateFrat />
                </div>
            </div>
       )
    }
}

const mapStateToProps = function (state) {
    return {
        frats: state.frats,
        brothers: state.brothers
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadFrats: function () {
            dispatch(fetchFrats());
        },
        loadBrothers: function() {
            dispatch(fetchBrothers());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllFrats));