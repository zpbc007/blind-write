export default interface Store {
    sport: Sport
}

export interface Sport {
    sportSeconds: number,
    restSeconds: number,
    count: number
}