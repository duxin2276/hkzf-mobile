import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { Location } from '../../../utils/location'

import styles from './index.module.css'
import { API } from '../../../utils'

import { Consumer } from '../../../store'

export default class Search extends Component {
    // 当前城市id
    cityId = Location.getCity().value

    state = {
        // 搜索框的值
        searchTxt: '',
        tipsList: []
    }

    communityClickHandler(communityObj) {
        this.setCommunity(communityObj);
        this.props.history.goBack()
    }

    // 渲染搜索结果列表
    renderTips = () => {
        const { tipsList } = this.state

        return tipsList.map(item => {
            const { community, communityName } = item; 

            return (
                <li key={community} className={styles.tip} onClick={this.communityClickHandler.bind(this, { community, communityName })}>
                    {communityName}
                </li>
            )
        })
    }

    timer = 0

    onChangeHandler(value) {
        // 清理定时器。
        clearTimeout(this.timer)

        if (value.trim()) { // []
            this.timer = setTimeout(async () => {
                const res = await API.get('/area/community', { name: value, id: this.cityId });

                res.status === 200 && this.setState({ tipsList: res.body })
            }, 700)
        } else {
            this.setState({ tipsList: [] })
        }
    }

    setCommunity = null

    render() {
        const { history } = this.props
        const { searchTxt } = this.state

        return (
            <Consumer>{({ setCommunity }) => {
                this.setCommunity = setCommunity;

                return (
                    <div className={styles.root}>
                        {/* 搜索框 */}
                        <SearchBar
                            placeholder="请输入小区或地址"
                            // value={searchTxt}
                            showCancelButton={true}
                            onChange={this.onChangeHandler.bind(this)}
                            onCancel={() => history.replace('/rent/add')}
                        />

                        {/* 搜索提示列表 */}
                        <ul className={styles.tips}>{this.renderTips()}</ul>
                    </div>
                )
            }}</Consumer>
        )
    }
}
