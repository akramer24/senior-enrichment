import { combineReducers } from 'redux';
import campuses from './campuses';
import selectedCampus from './selectedCampus';
import students from './students';
import selectedStudent from './selectedStudent';

const reducer = combineReducers({
  campuses,
  selectedCampus,
  students,
  selectedStudent
})

export default reducer;

export * from './campuses';
export * from './students';
export * from './selectedCampus';
export * from './selectedStudent';