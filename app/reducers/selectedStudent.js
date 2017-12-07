import axios from 'axios';

const SELECT_STUDENT = 'SELECT_STUDENT';

export function selectStudent(student) {
    return {
        type: SELECT_STUDENT,
        student
    }
}

export function fetchStudent(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/students/${id}`)
            .then(res => dispatch(selectStudent(res.data)))
            .catch(err => console.error(err));
    }
}

function selectStudentReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_STUDENT:
            return action.student;
        default:
            return state;
    }
}

export default selectStudentReducer;