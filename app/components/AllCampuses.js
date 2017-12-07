import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses } from '../reducers';
import CreateCampus from './CreateCampus';


class AllCampuses extends Component {

    componentDidMount() {
        this.props.loadCampuses();
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.props.campuses.map(campus => {
                            return (
                                <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
                                    <div>
                                        <h1>{campus.name}</h1>
                                        <img src={campus.imageUrl} />
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div>
                    <CreateCampus />
                </div>
            </div>
       )
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadCampuses: function () {
            dispatch(fetchCampuses())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCampuses));