import React, { Component } from "react";
import { Flex, Toast } from "antd-mobile";
import { WindowScroller, AutoSizer, List, InfiniteLoader } from 'react-virtualized'
import SearchHeader from "../../../components/SearchHeader";
import { Location } from "../../../utils/location";

import Filter from './components/Filter'

import styles from './houselist.module.css'
import { API, BASE_URL } from "../../../utils/api";
import HouseItem from "../../../components/HouseItem";
import Sticky from "../../../components/Sticky";
import NoHouse from "../../../components/NoHouse";

export default class HouseList extends Component {
    state = {
        currentCity: '定位中',
        cityId: '',
        count: 5,
        list: []
    }

    // pageNum = 1

    filters = null

    filterParams(start = 1, end = 20) {
        // const edge = this.pageNum * 20
        return { cityId: this.state.cityId, ...this.filters, start, end }
    }

    async getCurrentCity() {
        const { label: currentCity, value: cityId } = await Location.currentCity();

        this.setState({ currentCity, cityId });
    }

    async getHouseList(isFirst = true, start, end) {
        const { list: originList } = this.state

        Toast.loading('数据加载中..');
        const { body: { count, list } } = await API.get('/houses', this.filterParams(start, end))
        Toast.hide();

        isFirst && count && Toast.info(`共找到${count}套房源。`)

        this.setState({ count, list: [...originList, ...list] }, () => console.log(this.state));
    }

    async componentDidMount() {
        await this.getCurrentCity();
        this.getHouseList();
    }

    onFilter(filters) {
        window.scrollTo(0, 0)
        this.filters = filters;
        this.getHouseList();
    }

    houseItemRenderer({key, index, style}) {
        const { list } = this.state;

        const houseItem = list[index];

        const { houseImg, houseCode, ...item } = houseItem || {};

        const itemProps = {
            ...item,
            src: BASE_URL + houseImg
        }

        return houseItem ? <HouseItem key={key} style={style} {...itemProps} /> : <div key={key} style={{height: 120, border:'10px solid #fff', backgroundColor: '#eee'}}></div>
    }

    async loadMoreRows({ startIndex, stopIndex }) {
        const start = startIndex + 1, end = stopIndex + 1;

        await this.getHouseList(false, start, end);
    }

    isRowLoaded({ index }) {
        return !!this.state.list[index]
    }

    renderHouseList() {
        const { count } = this.state;

        return count ? (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded.bind(this)}
                loadMoreRows={this.loadMoreRows.bind(this)}
                rowCount={count}
            >
                {({ onRowsRendered, registerChild }) => (
                    <WindowScroller>
                        {({ isScrolling, scrollTop, height }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <List
                                        ref={registerChild}
                                        isScrolling={isScrolling}
                                        autoHeight
                                        scrollTop={scrollTop}
                                        width={width}
                                        height={height}
                                        rowCount={count}
                                        rowHeight={120}
                                        rowRenderer={this.houseItemRenderer.bind(this)}
                                        onRowsRendered={onRowsRendered}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                )}
            </InfiniteLoader>
        ) : <NoHouse>没有找到房源，请换个搜索条件！</NoHouse>
    }

    render() {
        const { count } = this.state

        return (
            <div>
                {/* 顶部导航条 */}
                <Flex className={styles.header}>
                    <SearchHeader cityName={this.state.currentCity} className={styles.searchHeader} />
                </Flex>
                {/* 条件筛选 */}
                <Sticky><Filter onFilter={this.onFilter.bind(this)} /></Sticky>
                {/* 房源列表展示 */}
                {this.renderHouseList()}
            </div>
        )
    }
}
