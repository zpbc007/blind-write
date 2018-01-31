import { combineReducers } from 'redux'
import SportReducer from '@pages/sport/reducers'

export default combineReducers({
    sport: SportReducer
})