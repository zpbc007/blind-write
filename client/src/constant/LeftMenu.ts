export interface LeftMenuItem {
    // menuId 用来查找对应content menu list
    readonly id: string
    // 显示名称
    readonly name: string,
    // 对应路由
    readonly path: string,
    // 显示图标
    readonly icon: string,
    // todo 子菜单 暂不支持 
    readonly children?: LeftMenuItem[]
}
// 左侧menu配置
export const LeftMenu: Array<LeftMenuItem> =  [
        {
            id: 'sport',
            name: '运动',
            path: 'sport',
            icon: 'schedule',
        },
        {
            id: 'chart',
            name: '可视化',
            path: 'visualization',
            icon: 'area-chart',
            children: [
                {
                    id: 'd3',
                    name: 'd3',
                    path: 'd3',
                    icon: 'pie-chart'
                },
                {
                    id: 'echarts',
                    name: 'echarts',
                    path: 'echarts',
                    icon: 'bar-chart'
                }
            ]
        },
        {
            id: 'algorithm',
            name: '算法',
            path: 'algorithm',
            icon: 'book',
            children: [
                {
                    id: 'Java',
                    name: 'Java',
                    icon: 'windows',
                    path: 'Java'
                }, 
                {
                    id: 'JavaScript',
                    name: 'JavaScript',
                    icon: 'windows-o',
                    path: 'JavaScript' 
                }
            ]
        },
        {
            id: 'test',
            name: '测试',
            path: 'test',
            icon: 'warning'
        }
]

function formatter(data: Array<LeftMenuItem>, parentPath: string = ''): Array<LeftMenuItem> {
    return data.map((item) => {
        let path = `/layoutContent/${parentPath}${item.path}/cardList`
        const result = {
            ...item,
            path: path
        }
        if (item.children) {
            result.children = formatter(item.children, `${path}/`)
        }
        return result
    })
}

export const getMenuData = () => formatter(LeftMenu)