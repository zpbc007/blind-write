import React, { Component } from 'react'
import { Menu, Icon } from 'antd' 

import { LeftMenuItem, LeftMenu } from '@constant/LeftMenu'

import './SideMenu.css'
import { ClickParam } from 'antd/lib/menu';

export interface Props {
    menuClick: (param: ClickParam) => void
}
export interface State {}
/**
 * 点击菜单后执行click事件
 */
export default class SideMenu extends Component<Props, State> {

    constructor (props: Props) {
        super(props)
    }

    render () {
        return (
            <div>
                <div className="logo" />
                <Menu 
                    theme="dark" 
                    mode="inline"
                    onClick={this.props.menuClick}
                >
                    {LeftMenu.map((item: LeftMenuItem) => {
                            return (
                                <Menu.Item 
                                    key={item.id}
                                >
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