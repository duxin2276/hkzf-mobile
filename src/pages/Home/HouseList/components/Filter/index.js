import React, { Component } from 'react'

import { API } from '../../../../../utils/api'
import { Location } from '../../../../../utils/location'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

const defaultValues = {
    1: ['area', 'null'],
    2: ['null'],
    4: ['null'],
    8: []
}

export default class Filter extends Component {
    state = {
        titleStatus: 0,
        filterData: undefined,
        selectedValues: {
            1: ['area', 'null'],
            2: ['null'],
            4: ['null'],
            8: []
        }
    }
    
    // 高亮状态（强行点亮+过去选中判断）。
    get highlightStatus() {
        const { titleStatus, selectedValues } = this.state;
        // 手工点击标题强行亮。
        // let status = titleStatus; // 2

        // // 判断勾选的内容。
        // for (const key in selectedValues) {
        //     status |= selectedValues[key].join('') === defaultValues[key].join('') ? 0 : key;
        // }

        // return status

        return Object.keys(selectedValues).reduce((prev, key) => prev |= selectedValues[key].join('') === defaultValues[key].join('') ? 0 : key, titleStatus)
    }

    get currentSelectdValue() {
        const { selectedValues, titleStatus } = this.state;
        return selectedValues[titleStatus]
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

    onSave(value) {
        const { selectedValues, titleStatus } = this.state;

        this.setState({ selectedValues: { ...selectedValues, [titleStatus]: value }, titleStatus: 0 }, () => console.log(this.state))
    }

    render() {
        const { titleStatus } = this.state

        return (
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                {this.showPicker && <div className={styles.mask} onClick={this.onCancel.bind(this)}/>}

                <div className={styles.content}>
                    {/* 标题栏 */}
                    <FilterTitle changeStatus={this.changeStatusHandler.bind(this)} titleStatus={this.highlightStatus } />

                    {/* 前三个菜单对应的内容： */}
                    {this.showPicker && <FilterPicker key={titleStatus} dataSource={this.pickerDataSource} defaultValue={this.currentSelectdValue} cols={titleStatus === 1 ? 3 : 1} onSave={this.onSave.bind(this)} onCancel={this.onCancel.bind(this)} /> }

                    {/* 最后一个菜单对应的内容： */}
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}
