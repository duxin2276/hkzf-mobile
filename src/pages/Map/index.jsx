import React, { Component } from 'react';
import NavHeader from '../../components/NavHeader';
import { Location } from '../../utils/location';

import styles from './map.module.less'

const BMap = window.BMap;

export default class Map extends Component {
    componentDidMount() {
        this.renderMap()
    }

    renderMap() {
        // 生成一个地图对象（基于页面容器。）
        const map = new BMap.Map(document.querySelector(`.${styles.container}`));

        // 通过地址解析器去获取当前选择（定位）城市的大致坐标信息。
        const { label } = Location.getCity();

        // 解析地址并呈现和添加控件。
        new BMap.Geocoder().getPoint(label,
            point => {
                if (point) {
                    // 呈现并缩放。
                    map.centerAndZoom(point, 15);

                    // 添加控件。
                    map.addControl(new BMap.NavigationControl())
                    map.addControl(new BMap.ScaleControl())
                }
            },
            label)

    }
    
    render() {
        const { map, container } = styles

        return (
            <div className={map}>
                <NavHeader>地图找房</NavHeader>
                {/* 地图容器 */}
                <div className={container}></div>
            </div>
        )
    }
}
