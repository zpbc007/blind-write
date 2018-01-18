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
    'test': [
        {
            title: '计时器',
            info: '通过按钮开始暂停的计时器',
            icon: 'clock-circle-o',
            link: '/timerTest'
        },
        {
            title: '测试2',
            info: '通过一个按钮控制两个定时器的启动与停止',
            icon: 'clock-circle-o',
            link: '/twoTimersTest'
        },
        {
            title: '测试3',
            info: '测试router3',
            icon: 'code',
            link: '/test3'
        },
        {
            title: '测试4',
            info: '测试router4',
            icon: 'code',
            link: '/test4'
        },
        {
            title: '测试5',
            info: '测试router',
            icon: 'code',
            link: '/test5'
        }
    ]
}

export function generateLink (item: MenuContentItem, currentUrl: string): string {
    return currentUrl.slice(0, currentUrl.lastIndexOf('/')) + item.link
}