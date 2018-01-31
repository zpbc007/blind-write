import { SET_REST_SECONDS, SET_SPORT_SECONDS, ADD_COUNT, ActionType } from './action'
import { Sport } from '@src/store'

export default function setSeconds(state: Sport = {sportSeconds: 0, restSeconds: 0, count: 0}, 
                                   action: ActionType) {
    switch (action.type) {
        case SET_REST_SECONDS:
            return {
                ...state,
                restSeconds: action.seconds
            }
        case SET_SPORT_SECONDS:
            return {
                ...state,
                sportSeconds: action.seconds
            }
        case ADD_COUNT:
            debugger
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state
    }
}