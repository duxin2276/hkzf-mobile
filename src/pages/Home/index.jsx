import React, { Component } from "react";
import { Route } from "react-router-dom";

import { TabBar } from 'antd-mobile'

import Index from "./Index/index";
import HouseList from './HouseList';
import News from "./News";
import Profile from './Profile';

import './home.css'

// 页面渲染专用数组。
const pages = [
    { title: '首页', icon: 'ind',       path: '/home/index',    component: Index },
    { title: '找房', icon: 'findHouse', path: '/home/list',     component: HouseList },
    { title: '资讯', icon: 'infom',     path: '/home/news',     component: News },
    { title: '我的', icon: 'my',        path: '/home/profile',  component: Profile },
]

export default class Home extends Component {
    get currentPathname() {
        return this.props.location.pathname;
    }

    // 渲染路由。
    renderRouteList() {
        return pages.map(({ path, component }) => <Route key={path} path={path} component={component} />)
    }

    renderTabBar() {
        return (
            <TabBar noRenderContent tintColor="#21B97A" unselectedTintColor="#949494">
                {pages.map(i => (
                    <TabBar.Item
                        title={i.title}
                        key={i.icon}
                        icon={<span className={`iconfont icon-${i.icon}`} />}
                        selectedIcon={<span className={`iconfont icon-${ i.icon }`} />}
                        selected={this.currentPathname === i.path}
                        onPress={() => this.props.history.replace(i.path)}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
    
    render() {
        return (
            <div>
                {/* 内部子路由 */}
                {this.renderRouteList()}

                {/* 渲染 TabBar */}
                {this.renderTabBar()}
            </div>
        )
    }
}
