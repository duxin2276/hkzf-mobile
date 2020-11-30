import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 页面组件导入。
import Home from './pages/Home'
import CityList from './pages/CityList'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                    <Route path="/citylist" component={CityList} />
                </div>
            </Router>
        )
    }
}
