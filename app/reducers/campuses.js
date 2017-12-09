import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';

export function getCampuses(campuses) {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

export function getCampus(campus) {
    return {
        type: GET_CAMPUS,
        campus
    }
}

export function updateCampus(campus) {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}

export function removeCampus(campus) {
    return {
        type: REMOVE_CAMPUS,
        campus
    }
}

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                dispatch(getCampuses(campuses))
            })
            .catch(err => console.error(err))
    }
}

function campusReducer(state = [], action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case GET_CAMPUS:
            return [...state, action.campus];
        case UPDATE_CAMPUS:
            return state.filter(campus => {
                return campus.id !== action.campus.id;
            }).concat(action.campus);
        case REMOVE_CAMPUS:
            return state.filter(campus => {
                return campus.id !== action.campus.id;
            })
        default:
            return state;
    }
}

export default campusReducer;