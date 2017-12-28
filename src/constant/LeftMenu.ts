export interface LeftMenuItem {
    readonly text: string,
    readonly id: string,
    readonly icon: string
}

export const LeftMenu: Array<LeftMenuItem> =  [
        {
            text: '首页',
            id: '1',
            icon: 'desktop'
        },
        {
            text: '一览',
            id: '2',
            icon: 'bars'
        },
        {
            text: 'd3',
            id: '3',
            icon: 'video-camera'
        },
        {
            text: '算法',
            id: '4',
            icon: 'upload'
        }
]