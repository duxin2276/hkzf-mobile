import React, { Component } from 'react'

import { API } from '../../../../../utils/api'
import { Location } from '../../../../../utils/location'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
    state = {
        // 高亮状态（强行点亮+过去选中判断）。
        titleStatus: 0,
        filterData: undefined
    }

    get showPicker() {
        return !!(this.state.titleStatus & 7)
    }

    get pickerDataSource() {
        const { titleStatus, filterData: { area, subway, rentType, price } = {} } = this.state;

        const dataCollection = {
            1: [area, subway],
            2: rentType,
            4: price
        };

        return dataCollection[titleStatus];
    }

    async getFilterData() {
        const res = await API.get('/houses/condition', { id: Location.getCity().value })
        
        console.log(res);

        this.setState({ filterData: res.body })
    }

    componentDidMount() {
        this.getFilterData()
    }

    changeStatusHandler(value) {
        // 一半。
        this.setState({ titleStatus: value})
    }

    onCancel() {
        this.setState({ titleStatus: 0 })
    }

    render() {
        const { titleStatus } = this.state

        return (
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                {this.showPicker && <div className={styles.mask} onClick={this.onCancel.bind(this)}/>}

                <div className={styles.content}>
                    {/* 标题栏 */}
                    <FilterTitle changeStatus={this.changeStatusHandler.bind(this) } titleStatus={ titleStatus } />

                    {/* 前三个菜单对应的内容： */}
                    {this.showPicker && <FilterPicker dataSource={this.pickerDataSource} cols={titleStatus === 1 ? 3: 1 } onCancel={this.onCancel.bind(this)} /> }

                    {/* 最后一个菜单对应的内容： */}
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}
