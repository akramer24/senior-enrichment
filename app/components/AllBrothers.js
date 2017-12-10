import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBrothers, removeBrother } from '../reducers';
import CreateBrother from './CreateBrother';
import axios from 'axios';
import store from '../store';

class AllBrothers extends Component {

    constructor() {
        super();

        this.deleteBrother = this.deleteBrother.bind(this);
    }

    componentDidMount() {
        this.props.loadBrothers();
    }

    deleteBrother(brother) {
        axios.delete(`/api/brothers/${brother.id}`)
            .then(() => store.dispatch(removeBrother(brother)))
            .catch(err => console.error(err));
    }

    handleDelete(brother) {
        this.deleteBrother(brother);
    }

    render() {
        return (
            <div>
                <div id='brother-list'>
                    {
                        this.props.brothers.map(brother => {
                            return (
                                <div key={brother.id} className='brother-item'>
                                    <NavLink to={`/brothers/${brother.id}`} className='brother-name'>
                                        <div>
                                            <h1>{brother.name}</h1>
                                        </div>
                                    </NavLink>
                                    <NavLink to={`/frats/${brother.fratId}`}>
                                        <h3>{brother.frat && brother.frat.name}</h3>
                                    </NavLink>
                                    <div className='brother-flex'>
                                        <ul className='brother-attributes'>
                                            {
                                                brother.nickname ? <li><span className='attribute-title'>Nickname: </span>{brother.nickname}</li>
                                                : <li/>
                                            }
                                            <li><span className='attribute-title'>Email: </span>{brother.email}</li>
                                            <li><span className='attribute-title'>GPA: </span>{brother.gpa}</li>
                                        </ul>
                                        <div>
                                            <img src={brother.imageUrl} className='brother-img'/>    
                                        </div>
                                    </div>
                                    <button onClick={this.handleDelete.bind(this, brother)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <CreateBrother />
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        brothers: state.brothers    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadBrothers: function () {
            dispatch(fetchBrothers())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllBrothers));