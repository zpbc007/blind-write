export interface MenuContentItem {
    text: string,
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
            text: 'home',
            info: '测试',
            icon: 'upload',
            link: '/home'
        }
    ],
    'test': [
        {
            text: '测试1',
            info: '测试router',
            icon: 'code',
            link: '/test1'
        }
    ]
}

export function generateLink (item: MenuContentItem, currentUrl: string): string {
    return currentUrl.slice(0, currentUrl.lastIndexOf('/')) + item.link
}