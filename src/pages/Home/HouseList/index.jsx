import React, { Component } from "react";
import { Flex } from "antd-mobile";
import SearchHeader from "../../../components/SearchHeader";
import { Location } from "../../../utils/location";

import Filter from './components/Filter'

import styles from './houselist.module.css'

export default class HouseList extends Component {
    state = {
        currentCity: '定位中'
    }

    async getCurrentCity() {
        const { label: currentCity } = await Location.currentCity();

        this.setState({ currentCity });
    }

    componentDidMount() {
        this.getCurrentCity();
    }

    render() {
        return (
            <div>
                {/* 顶部导航条 */}
                <Flex className={styles.header}>
                    <SearchHeader cityName={this.state.currentCity} className={styles.searchHeader} />
                </Flex>
                {/* 条件筛选 */}
                <Filter />
            </div>
        )
    }
}
