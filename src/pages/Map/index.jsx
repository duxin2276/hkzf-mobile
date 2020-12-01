import React, { Component } from 'react';

import './map.less'

const BMap = window.BMap;

export default class Map extends Component {
    componentDidMount() {
        this.renderMap()
    }

    renderMap() {
        // 生成一个地图对象（基于页面容器。）
        const map = new BMap.Map(document.querySelector('.container'));

        // 准备初始点。
        const startPoint = new BMap.Point(116.404, 39.915);

        // 呈现并缩放。
        map.centerAndZoom(startPoint, 15);
    }
    
    render() {
        return (
            <div className="map">
                {/* 地图容器 */}
                <div className="container"></div>
            </div>
        )
    }
}
