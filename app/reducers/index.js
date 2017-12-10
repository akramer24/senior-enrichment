import { combineReducers } from 'redux';
import frats from './frats';
import selectedFrat from './selectedFrat';
import brothers from './brothers';
import selectedBrother from './selectedBrother';

const reducer = combineReducers({
  frats,
  selectedFrat,
  brothers,
  selectedBrother
})

export default reducer;

export * from './frats';
export * from './brothers';
export * from './selectedFrat';
export * from './selectedBrother';