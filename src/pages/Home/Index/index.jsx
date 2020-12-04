import React, { Component } from "react";
import { Carousel, Grid, Flex, WingBlank } from 'antd-mobile'

import { BASE_URL } from '../../../utils/api'

import './index.less'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'
import { Location } from "../../../utils/location";

const navList = [
    { title: '整租', src: Nav1, path: '/home/list' },
    { title: '合租', src: Nav2, path: '/home/list' },
    { title: '地图找房', src: Nav3, path: '/map' },
    { title: '去出租', src: Nav4, path: '/rent' },
]

console.log(BASE_URL);

export default class Index extends Component {
    state = {
        carouselList: [],
        groupList: [],
        newsList: [],
        currentCity: '定位中'
    }

    async getList(partialUrl, stateName) {
        const res = await (await fetch(`${ BASE_URL }${ partialUrl }`)).json();

        this.setState({ [stateName]: res.body })
    }

    async getCurrentCity() {
        const { label: currentCity } = await Location.currentCity();

        this.setState({ currentCity });
    }

    componentDidMount() {
        this.getList('/home/swiper', 'carouselList');
        this.getList('/home/groups?area=AREA|88cff55c-aaa4-e2e0', 'groupList');
        this.getList('/home/news?area=AREA|88cff55c-aaa4-e2e0', 'newsList');

        this.getCurrentCity();
    }

    renderCarousel() {
        const { carouselList } = this.state;

        return (
            <Carousel key={carouselList.length} infinite autoplay>
                {carouselList.map((i, idx) => (
                    <a key={idx} href="#">
                        <img src={`${ BASE_URL }${ i.imgSrc }`} alt="" />
                    </a>
                ))}
            </Carousel>
        )
    }

    renderNavList() {
        return (
            <div className="nav-box">
                {navList.map((i, idx) => (
                    <div key={idx} className="item" onClick={() => this.props.history[i.path.startsWith('/home') ? 'replace' : 'push'](i.path)}>
                        <img src={i.src} alt="" />
                        <span>{i.title}</span>
                    </div>
                ))}
            </div>
        )
    }

    renderGroupList() {
        return (
            <div className="group">
                <h3 className="group-title">
                    租房小组 <span className="more">更多</span>
                </h3>

                {/* 宫格组件 */}
                <Grid
                    data={this.state.groupList}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={item => (
                        <Flex className="group-item" justify="around" key={item.id}>
                            <div className="desc">
                                <p className="title">{item.title}</p>
                                <span className="info">{item.desc}</span>
                            </div>
                            <img src={`${ BASE_URL }${ item.imgSrc }`} alt="" />
                        </Flex>
                    )}
                />
            </div>
        )
    }

    // 渲染最新资讯
    renderNews() {
        return this.state.newsList.map(item => (
            <div className="news-item" key={item.id}>
                <div className="imgwrap">
                    <img
                        className="img"
                        src={`http://localhost:8080${ item.imgSrc }`}
                        alt=""
                    />
                </div>
                <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </Flex>
                </Flex>
            </div>
        ))
    }


    render() {
        return (
            <div className="index">
                <div className="swiper">
                    {/* 轮播图区域 */}
                    {this.renderCarousel()}
                    {/* 搜索条区域 */}
                    <Flex className="search-box">
                        {/* 左侧白色区域 */}
                        <Flex className="search">
                            {/* 位置 */}
                            <div
                                className="location"
                                onClick={() => this.props.history.push('/citylist')}
                            >
                                <span className="name">{this.state.currentCity}</span>
                                <i className="iconfont icon-arrow" />
                            </div>

                            {/* 搜索表单 */}
                            <div
                                className="form"
                                onClick={() => this.props.history.push('/search')}
                            >
                                <i className="iconfont icon-seach" />
                                <span className="text">请输入小区或地址</span>
                            </div>
                        </Flex>
                        {/* 右侧地图图标 */}
                        <i
                            className="iconfont icon-map"
                            onClick={() => this.props.history.push('/map')}
                        />
                    </Flex>

                </div>
                {/* 导航区域 */}
                {this.renderNavList()}
                {/* 租房小组区域 */}
                {this.renderGroupList()}
                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">最新资讯</h3>
                    <WingBlank size="md">{this.renderNews()}</WingBlank>
                </div>
            </div>
        )
    }
}
