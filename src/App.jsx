import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 页面组件导入。
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Route path="/" exact render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                    <Route path="/citylist" component={CityList} />
                    <Route path="/map" component={Map} />
                </div>
            </Router>
        )
    }
}
