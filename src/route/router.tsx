import React from 'react'
import Loadable from 'react-loadable'
import { Route, Switch } from 'react-router-dom'

import Loading from '@components/Loading/Loading'

// 异步组件
const Home = Loadable({
    loader: () => import('@page/TestPage'),
    loading: Loading
})
const Home2 = Loadable({
    loader: () => import('@page/TestPage2'),
    loading: Loading
})
const NotFound = Loadable({
    loader: () => import('@page/404NotFound'),
    loading: Loading
})

// todo
// interface RouteItem {
//     path: string,
//     component: typeof React.Component,
//     routes?: RouteItem
// }

// export const RouteWithubRoutes = (route: RouteItem) => (
//     <Route 
//         path={route.path} 
//         render={props => (
//                 <route.component {...props} routes={route.routes} />
//             )
//         } 
//     />
// )

export default () => (
    <div>
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/home" component={Home2} />
            <Route component={NotFound} />
        </Switch>
    </div>
)