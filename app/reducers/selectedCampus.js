import axios from 'axios';

const SELECT_CAMPUS = 'SELECT_CAMPUS';

export function selectCampus(campus) {
    return {
        type: SELECT_CAMPUS,
        campus
    }
}

export function fetchCampus(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/campuses/${id}`)
            .then(res => dispatch(selectCampus(res.data)))
            .catch(err => console.error(err));
    }
}

function selectCampusReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_CAMPUS:
            return action.campus;
        default:
            return state;
    }
}

export default selectCampusReducer;