import axios from 'axios';

const SELECT_FRAT = 'SELECT_FRAT';

export function selectFrat(frat) {
    return {
        type: SELECT_FRAT,
        frat
    }
}

export function fetchFrat(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/frats/${id}`)
            .then(res => dispatch(selectFrat(res.data)))
            .catch(err => console.error(err));
    }
}

function selectFratReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_FRAT:
            return action.frat;
        default:
            return state;
    }
}

export default selectFratReducer;