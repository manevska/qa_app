import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import utilsReducer from './utilsReducer'

export default combineReducers({
    utilsReducer,
    dataReducer
});

