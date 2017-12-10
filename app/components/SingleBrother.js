import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchBrother, fetchFrats } from '../reducers';
import EditBrother from './EditBrother';
import BrotherAttributes from './BrotherAttributes';

class SingleBrother extends Component {

    constructor() {
        super();
        this.state = {
            displayForm: false
        }
    }

    componentDidMount() {
        this.props.loadBrother(this.props.match.params.brotherId);
        this.props.loadFrats();
    }

    displayEdit() {
        this.setState({ displayForm: true });
    }

    render() {
        const brother = this.props.selectedBrother;
        const frat = this.props.frats.filter(frat => {
            return frat.id === brother.fratId
        })[0]
        return (
            <div id='brother-page'>
                <h1 className='brother-name'>{brother.name}</h1>
                {
                    frat ?
                        <h3>
                            <NavLink to={`/frats/${frat.id}`} className='frat-name'>
                                {frat.name}
                            </NavLink>
                        </h3>
                        :
                        <h4></h4>
                }
                <BrotherAttributes brother={brother}/>
                <button onClick={this.displayEdit.bind(this)}>Edit Brother Info</button>
                {
                    this.state.displayForm ? <EditBrother display={this.state.displayForm} /> : <br />
                }
            </div>
        )
    }

}

const mapStateToProps = function (state) {
    return {
        selectedBrother: state.selectedBrother,
        frats: state.frats
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        loadBrother: function (id) {
            dispatch(fetchBrother(id))
        },
        loadFrats: function () {
            dispatch(fetchFrats());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleBrother));
