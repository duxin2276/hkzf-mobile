import React, { Component, PureComponent } from "react";
import { NavBar, Icon, Toast } from 'antd-mobile';
import { List, AutoSizer } from 'react-virtualized'

import './citylist.less'
import { Location } from "../../utils/location";
import NavHeader from "../../components/NavHeader";
import { API } from "../../utils/api";

const HOUSE_CITY_LIST = ['北京', '上海', '广州', '深圳']

const parseCityList = function(list) {
    // 准备接收的空对象。
    const cityManifest = {}; // { s: [{ label: '石家庄', short: 'sjz' }, { label: '上海', short: 'sh' }]}

    // 在清单中对应拼音开头的数组中是否有数据；1.有（第2步肯定我们做过）做追加；2.没有创建第一份。
    for (const i of list) {
        // 拼音开头。
        // i => { label: '石家庄', short: 'sjz' }
        const one = i.short[0], item = cityManifest[one];

        // item 要么没有，要么是已经有了一个数据的数组。
        item ? item.push(i) : cityManifest[one] = [i]; // [{ label: '安庆', short: 'aq' }]
    }

    // 创建一个拼音开头数组。
    const cityIndexes = Object.keys(cityManifest).sort();

    return { cityManifest, cityIndexes }
}

const letterMapper = {
    '#': '当前城市',
    hot: '热门城市'
}

const parseLetter = letter => letterMapper[letter] || letter.toUpperCase();

export default class CityList extends PureComponent {
    listElement = null

    state = {
        cityManifest: {},
        cityIndexes: [],
        activeIndex: 0,
        manual: false
    }

    async getCityList() {
        // const res = await (await fetch('http://127.0.0.1:8080/area/city?level=1')).json();
        // const hotRes = await (await fetch('http://127.0.0.1:8080/area/hot')).json();
        const res = await API.get('/area/city', { level: 1 })
        const hotRes = await API.get('/area/hot');

        const currentCity = await Location.currentCity()

        const { cityManifest, cityIndexes } = parseCityList(res.body);

        // 热门城市。
        cityManifest.hot = hotRes.body;
        cityIndexes.unshift('hot');

        // 当前城市。
        cityManifest['#'] = [currentCity];
        cityIndexes.unshift('#');

        this.setState({ cityManifest, cityIndexes }, () => this.listElement.measureAllRows());
    }

    componentDidMount() {
        this.getCityList()
    }

    cityChooseHandler({ label, value }) {
        if (HOUSE_CITY_LIST.includes(label)) {
            Location.saveCity({ label, value });
            this.props.history.goBack();
        } else Toast.info('该城市没有房源！', undefined, undefined, false)
    }

    rowRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        style, // Style object to be applied to row (to position it)
    }) {
        const { cityManifest, cityIndexes } = this.state;
        // 拼音开头。
        const letter = cityIndexes[index],
            cityList = cityManifest[letter];

        return (
            <div key={key} style={style} className="city">
                <div className="title">{parseLetter(letter)}</div>
                {cityList.map(i => <div key={i.value} className="name" onClick={this.cityChooseHandler.bind(this, i) }>{i.label}</div>)}
            </div>

        );
    }

    rowHeight({index}) {
        const { cityManifest, cityIndexes } = this.state;
        
        // 拿到对应拼音开头的城市数组的数量。
        const count = cityManifest[cityIndexes[index]].length;
        
        return 36 + 50 * count;
    }

    renderIndexes() {
        const { cityIndexes: [...cityIndexes], activeIndex } = this.state;

        cityIndexes[1] = '热';

        return (
            <ul className="city-index">
                {cityIndexes.length > 2 && cityIndexes.map((i, idx) => (
                    <li key={i} className="city-index-item" onClick={() => {
                        this.listElement.scrollToRow(idx);
                        this.setState({ activeIndex: idx, manual: true })
                    }}>
                        <span className={idx === activeIndex ? 'index-active' : undefined }>{i.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
        )
    }

    onRowsRendered({ startIndex }) {
        const { manual, activeIndex } = this.state;
        // 判断上一次移动是否是用户操作。
        this.setState({ activeIndex: manual ? activeIndex : startIndex, manual: false });
    }

    render() {
        console.log('渲染了');
        return (
            <div className="city-list">
                {/* 顶部导航区域 */}
                {/* <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >城市选择</NavBar> */}
                <NavHeader>城市列表</NavHeader>
                {/* 城市列表区域 */}
                <AutoSizer>{
                    ({ width, height }) => (
                        <List
                            ref={el => this.listElement = el}
                            width={width}
                            height={height - 45}
                            scrollToAlignment="start"
                            rowCount={this.state.cityIndexes.length}
                            rowHeight={this.rowHeight.bind(this)}
                            rowRenderer={this.rowRenderer.bind(this)}
                            onRowsRendered={this.onRowsRendered.bind(this)}
                        />
                    )
                }</AutoSizer>
                {/* 右侧索引目录 */}
                {this.renderIndexes()}
            </div>
        )
    }
}
