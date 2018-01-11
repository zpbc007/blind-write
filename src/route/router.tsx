import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import Loading from '@components/Loading/index'

// 返回的异步组件类型
type AnsycComponent =  React.ComponentClass<any> | React.StatelessComponent<any>

// 异步组件
const Login = Loadable({
    loader: () => import('@page/Login'),
    loading: Loading
})
const NotFound = Loadable({
    loader: () => import('@page/404NotFound'),
    loading: Loading
})
//  组件容器
const LayoutContent = Loadable({
    loader: () => import('@components/LayoutContent/index'),
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
    exact?: boolean
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

export const LayoutContentBaseDir = '/layoutContent'
// 路由配置
const routes: Routes = [
    {
        path: '/',
        component: Login,
        exact: true
    },
    {
        path: `${LayoutContentBaseDir}/:id`,
        component: LayoutContent,
        exact: false,
        routes: [
            {
                path: `${LayoutContentBaseDir}/:id/list`,
                component: Login,
                exact: true
            },
            {
                path: `${LayoutContentBaseDir}/:id/home`,
                component: Login,
                exact: true
            }
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