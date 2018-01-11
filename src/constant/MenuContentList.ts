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
    '1': [
        {
            title: 'home',
            info: '测试',
            icon: 'upload',
            link: '/home'
        }
    ],
    'test': [
        {
            title: '测试1',
            info: '测试router',
            icon: 'code',
            link: '/test1'
        },
        {
            title: '测试2',
            info: '测试router2',
            icon: 'code',
            link: '/test2'
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