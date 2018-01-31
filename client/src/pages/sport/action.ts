export const SET_SPORT_SECONDS = 'SET_SPORT_SECONDS'
export type SET_SPORT_SECONDS = typeof SET_SPORT_SECONDS

export const SET_REST_SECONDS = 'SET_REST_SECONDS'
export type SET_REST_SECONDS = typeof SET_REST_SECONDS

export const ADD_COUNT = 'ADD_COUNT'
export type ADD_COUNT = typeof ADD_COUNT

export interface SetSportSecondsAction {
    type: SET_SPORT_SECONDS,
    seconds: number
}

export interface SetRestSecondsAction {
    type: SET_REST_SECONDS,
    seconds: number
}

export interface AddCountAction {
    type: ADD_COUNT
}

export type ActionType = SetSportSecondsAction | SetRestSecondsAction | AddCountAction

export function setSportSeconds(seconds: number): SetSportSecondsAction {
    return {
        type: SET_SPORT_SECONDS,
        seconds
    }
}

export function setRestSeconds(seconds: number): SetRestSecondsAction {
    return {
        type: SET_REST_SECONDS,
        seconds
    }
}

export function addCount(): AddCountAction {
    return {
        type: ADD_COUNT
    }
}