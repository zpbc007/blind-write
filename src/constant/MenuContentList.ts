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
    ]
}