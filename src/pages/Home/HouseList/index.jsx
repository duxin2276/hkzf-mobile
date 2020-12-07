import React, { Component } from "react";
import { Flex } from "antd-mobile";
import SearchHeader from "../../../components/SearchHeader";
import { Location } from "../../../utils/location";

import Filter from './components/Filter'

import styles from './houselist.module.css'
import { API } from "../../../utils/api";

export default class HouseList extends Component {
    state = {
        currentCity: '定位中',
        cityId: '',
        count: 0,
        list: []
    }

    pageNum = 1

    filters = null

    get filterParams() {
        const edge = this.pageNum * 20
        return { cityId: this.state.cityId, ...this.filters, start: edge - 19, end: edge }
    }

    async getCurrentCity() {
        const { label: currentCity, value: cityId } = await Location.currentCity();

        this.setState({ currentCity, cityId });
    }

    async getHouseList() {
        const { body: { count, list } } = await API.get('/houses', this.filterParams)

        this.setState({ count, list }, () => console.log(this.state));
    }

    async componentDidMount() {
        await this.getCurrentCity();
        this.getHouseList();
    }

    onFilter(filters) {
        this.filters = filters;
        this.getHouseList();
    }

    render() {
        return (
            <div>
                {/* 顶部导航条 */}
                <Flex className={styles.header}>
                    <SearchHeader cityName={this.state.currentCity} className={styles.searchHeader} />
                </Flex>
                {/* 条件筛选 */}
                <Filter onFilter={this.onFilter.bind(this)} />
            </div>
        )
    }
}
