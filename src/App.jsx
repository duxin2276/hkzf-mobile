import React, { Suspense, lazy, Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { AuthRoute } from './components/AuthRoute'
import MyPage from './pages/MyPage'

// 页面组件导入。
const Home          = lazy(() => import('./pages/Home'))
const CityList      = lazy(() => import('./pages/CityList'))
const Map           = lazy(() => import('./pages/Map'))
const HouseDetail   = lazy(() => import('./pages/HouseDetail'))
const Login         = lazy(() => import('./pages/Login'))
const Register      = lazy(() => import('./pages/Register'))
const Rent          = lazy(() => import('./pages/Rent'))
const RentAdd       = lazy(() => import('./pages/Rent/Add'))
const RentSearch    = lazy(() => import('./pages/Rent/Search'))

import { Provider } from './store'

class GlobalStore extends Component {
    state = {
        community: {}
    }

    setCommunity(value) {
        this.setState({ community: value })
    }

    render() {
        const { community } = this.state;

        return (
            <Provider value={{
                community,
                setCommunity: this.setCommunity.bind(this)
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export default class App extends Component {
    render() {
        return (
            <GlobalStore>
                <Router>
                    <Suspense fallback={<div>Loading..</div>}>
                        <div className="app">
                            {/* 实验 */}
                            <Link to="/test">test页面</Link>
                            <Route path="/test" component={MyPage} />
                            <Route path="/" exact render={() => <Redirect to="/home" />} />
                            <Route path="/home" component={Home} />
                            <Route path="/citylist" component={CityList} />
                            <AuthRoute path="/map" component={Map} />
                            <Route path="/detail/:id" component={HouseDetail} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/rent" exact component={Rent} />
                            <Route path="/rent/add" component={RentAdd} />
                            <Route path="/rent/search" component={RentSearch} />

                            <AuthRoute path="/vip" render={props => <h1>邀请码：6TGO341, {props.location.pathname}</h1>} />
                        </div>
                    </Suspense>
                </Router>
            </GlobalStore>
        )
    }
}
