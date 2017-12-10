import axios from 'axios';

const GET_BROTHERS = 'GET_BROTHERS';
const GET_BROTHER = 'GET_BROTHER';
const UPDATE_BROTHER = 'UPDATE_BROTHER';
const REMOVE_BROTHER = 'REMOVE_BROTHER';

export function getBrothers(brothers) {
    return {
        type: GET_BROTHERS,
        brothers
    }
}

export function getBrother(brother) {
    return {
        type: GET_BROTHER,
        brother
    }
}

export function updateBrother(brother) {
    return {
        type: UPDATE_BROTHER,
        brother
    }
}

export function removeBrother(brother) {
    return {
        type: REMOVE_BROTHER,
        brother
    }
}

export function fetchBrothers() {
    return function thunk(dispatch) {
        return axios.get('/api/brothers')
            .then(res => res.data)
            .then(brothers => {
                dispatch(getBrothers(brothers))
            })
            .catch(err => console.error(err))
    }
}

function brotherReducer(state = [], action) {
    switch (action.type) {
        case GET_BROTHERS:
            return action.brothers;
        case GET_BROTHER:
            return [...state, action.brother]
        case UPDATE_BROTHER:
            return state.filter(brother => {
                return brother.id !== action.brother.id;
            }).concat(action.brother);
        case REMOVE_BROTHER:
            return state.filter(brother => {
                return brother.id !== action.brother.id;
            })
        default:
            return state;
    }
}

export default brotherReducer;