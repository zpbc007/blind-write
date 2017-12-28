import React, {Component} from 'react'
import {Menu, Icon} from 'antd' 

import {LeftMenuItem, LeftMenu} from '@constant/LeftMenu'

import './SideMenu.css'
/**
 * 点击菜单后执行click事件
 */
export default class SideMenu extends Component {
    render () {
        return (
            <div>
                <div className="logo"></div>
                <Menu theme="dark" mode="inline">
                    {LeftMenu.map((item: LeftMenuItem) => {
                            return (
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon}/>
                                    <span>{item.text}</span>
                                </Menu.Item>
                            )
                        }
                    )}
                </Menu>
            </div>
        )
    }
} 