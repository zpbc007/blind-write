import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import Loading from '@components/Loading/index'

// 返回的异步组件类型
type AnsycComponent =  React.ComponentClass<any> | React.StatelessComponent<any>

// 异步组件
// 登录
const Login = Loadable({
    loader: () => import('@route/Login'),
    loading: Loading
})
// 404
const NotFound = Loadable({
    loader: () => import('@route/404NotFound'),
    loading: Loading
})
//  组件容器
const LayoutContent = Loadable({
    loader: () => import('@components/LayoutContent/index'),
    loading: Loading
})
// card list
const CardList = Loadable({
    loader: () => import('@components/MenuCard/container'),
    loading: Loading
})
// 定时器
const Timer = Loadable({
    loader: () => import('@components/Timer/index'),
    loading: Loading
})
// 定时器x2
const TwoTimers = Loadable({
    loader: () => import('@components/Timer/TwoTimers/index'),
    loading: Loading
})
// sportRecord页面
const SportRecord = Loadable({
    loader: () => import('@pages/sport/record'),
    loading: Loading
})
const Chart = Loadable({
    loader: () => import('@pages/algorithmChart/algorithmChart'),
    loading: Loading
})

// 路由类型
interface RouteItem {
    // 路由路径
    path?: string
    // 对应组件
    component: AnsycComponent
    // 子路由
    routes?: RouteItem[]
    exact?: boolean,
    // title
    name?: string
}

// 根据配置生成路由
export const RouteWithSubRoutes = (route: RouteItem) => (
    <Route 
        exact={route.exact || false}
        path={route.path} 
        render={props => (
                <route.component {...props} routes={route.routes}/>
            )
        } 
    />
)

// 路由配置
const routes: Routes = [
    {
        path: '/Login',
        component: Login,
        exact: true,
        name: '登录'
    },
    {
        path: '/layoutContent/:id',
        component: LayoutContent,
        exact: false,
        routes: [
            {
                // 右侧列表页面
                path: '/layoutContent/:id/cardList',
                component: CardList,
                exact: true
            },
            {
                // 运动记录页面
                path: '/layoutContent/:id/recordData',
                component: SportRecord,
                exact: true
            },
            {
                // 计时器
                path: '/layoutContent/:id/timerTest',
                component: Timer,
                exact: true,
                name: '定时器'
            },
            {
                // 计时器
                path: '/layoutContent/:id/twoTimersTest',
                component: TwoTimers,
                exact: true,
                name: '两个定时器'
            },
            {
                // 运动记录页面
                path: '/layoutContent/:id/chart',
                component: Chart,
                exact: true
            },
        ]
    },
    {
        component: NotFound
    }
]

export type Routes = RouteItem[]

export const RouterView = () => (
    <div>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </div>
)

interface Prop {
    routes: Routes
}
// 渲染子router
export class SubRouterView extends React.Component<Prop> {

    constructor (prop: Prop) {
        super(prop)
    }

    render () {
        return (
            <div>
                {
                    this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    )) 
                }
            </div>
        )
    }
}