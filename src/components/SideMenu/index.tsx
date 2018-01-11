import React, { Component } from 'react'
import { Menu, Icon } from 'antd' 
import { Link } from 'react-router-dom'

import { getMenuData } from '@constant/LeftMenu'

import './index.css'

export interface State {}
/**
 * 点击菜单后改变路由
 */
export default class SideMenu extends Component<{}, State> {

    render () {
        return (
            <div>
                <div className="logo" />
                <Menu 
                    theme="dark" 
                    mode="inline"
                >
                    {getMenuData().map((item) => {
                            return (
                                <Menu.Item 
                                    key={item.id}
                                >
                                    <Link to={`${item.path}`}>
                                        <Icon type={item.icon}/>
                                        <span>{item.name}</span>   
                                    </Link>
                                </Menu.Item>
                            )
                        }
                    )}
                </Menu>
            </div>
        )
    }
} 