import axios from 'axios';

const SELECT_BROTHER = 'SELECT_BROTHER';

export function selectBrother(brother) {
    return {
        type: SELECT_BROTHER,
        brother
    }
}

export function fetchBrother(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/brothers/${id}`)
            .then(res => dispatch(selectBrother(res.data)))
            .catch(err => console.error(err));
    }
}

function selectBrotherReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_BROTHER:
            return action.brother;
        default:
            return state;
    }
}

export default selectBrotherReducer;