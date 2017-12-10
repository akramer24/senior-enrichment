import axios from 'axios';

const GET_FRATS = 'GET_FRATS';
const GET_FRAT = 'GET_FRAT';
const UPDATE_FRAT = 'UPDATE_FRAT';
const REMOVE_FRAT = 'REMOVE_FRAT';

export function getFrats(frats) {
    return {
        type: GET_FRATS,
        frats
    }
}

export function getFrat(frat) {
    return {
        type: GET_FRAT,
        frat
    }
}

export function updateFrat(frat) {
    return {
        type: UPDATE_FRAT,
        frat
    }
}

export function removeFrat(frat) {
    return {
        type: REMOVE_FRAT,
        frat
    }
}

export function fetchFrats() {
    return function thunk(dispatch) {
        return axios.get('/api/frats')
            .then(res => res.data)
            .then(frats => {
                dispatch(getFrats(frats))
            })
            .catch(err => console.error(err))
    }
}

function fratReducer(state = [], action) {
    switch (action.type) {
        case GET_FRATS:
            return action.frats;
        case GET_FRAT:
            return [...state, action.frat];
        case UPDATE_FRAT:
            return state.filter(frat => {
                return frat.id !== action.frat.id;
            }).concat(action.frat);
        case REMOVE_FRAT:
            return state.filter(frat => {
                return frat.id !== action.frat.id;
            })
        default:
            return state;
    }
}

export default fratReducer;