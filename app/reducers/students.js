import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export function getStudents(students) {
    return {
        type: GET_STUDENTS,
        students
    }
}

export function getStudent(student) {
    return {
        type: GET_STUDENT,
        student
    }
}

export function updateStudent(student) {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                dispatch(getStudents(students))
            })
            .catch(err => console.error(err))
    }
}

function studentReducer(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        case GET_STUDENT:
            return [...state, action.student]
        case UPDATE_STUDENT:
            return [...state, action.student]
        default:
            return state;
    }
}

export default studentReducer;