import { SortType } from '@src/router'
export interface MenuContentItem {
    title: string,
    info: string,
    icon: string,
    link: string
}

export interface MenuContentItemList {
    [key: string]: Array<MenuContentItem> 
}

export const MenuContentList: MenuContentItemList = {
    'sport': [
        {
            title: '记录',
            info: '记录运动数据',
            icon: 'database',
            link: '/recordData'
        }
    ],
    'algorithm': [
        {
            title: '冒泡排序',
            info: '冒泡排序',
            icon: 'dot-chart',
            link: `/sort/${SortType.bubble}`
        },
        {
            title: '选择排序',
            info: '选择排序',
            icon: 'dot-chart',
            link: `/sort/${SortType.select}`
        }
    ],
    'test': [
        {
            title: '计时器',
            info: '通过按钮开始暂停的计时器',
            icon: 'clock-circle-o',
            link: '/timerTest'
        },
        {
            title: '两个计时器',
            info: '通过一个按钮控制两个定时器的启动与停止',
            icon: 'clock-circle-o',
            link: '/twoTimersTest'
        }
    ]
}

export function generateLink (item: MenuContentItem, currentUrl: string): string {
    return currentUrl.slice(0, currentUrl.lastIndexOf('/')) + item.link
}