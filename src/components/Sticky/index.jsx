import React, { Component } from 'react';

import './sticky.css'

export default class Sticky extends Component {
    // 为了支撑高度，要拿到一开始渲染好的高度，基于辅助元素： ref；
    // 拿到一开始距离页面顶端的距离；
    // 当页面滚动的时候，如果刚超过距离顶端的距离，则固定辅助元素。
    fixedElement = null;

    // 一开始距离顶端的距离。
    top = 0;

    state = {
        height: 0,
        isFixed: false
    }

    scrollHandler() {
        this.setState({ isFixed: window.scrollY >= this.top });
    }

    componentDidMount() {
        // 拿到了内部元素的高度和距离顶端的距离。
        const { height, top } = this.fixedElement.getBoundingClientRect();

        this.top = top;

        this.setState({ height });

        // 添加页面滚动事件。
        window.addEventListener('scroll', this.scollBound = this.scrollHandler.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scollBound)
    }

    render() {
        const { height, isFixed } = this.state;

        return (
            <div style={{ height }}>     
                {/* 辅助元素 */}
                <div className={isFixed ? 'fixed' : undefined} ref={el => this.fixedElement = el}>{this.props.children}</div>
            </div>
        )
    }
}
