import React, { Component } from 'react'
import { Menu, Icon } from 'antd' 
import { Link } from 'react-router-dom'

import { LeftMenuItem, LeftMenu } from '@constant/LeftMenu'
import { LayoutContentBaseDir } from '@route/router'

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
                    {LeftMenu.map((item: LeftMenuItem) => {
                            return (
                                <Menu.Item 
                                    key={item.id}
                                >
                                    <Link to={`${LayoutContentBaseDir}/${item.id}`}>
                                        <Icon type={item.icon}/>
                                        <span>{item.text}</span>   
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