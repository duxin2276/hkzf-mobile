import { Route, Redirect } from 'react-router-dom'
import { Auth } from '../utils'

export const AuthRoute = ({ path, component: Component, ...rest }) => (
    <Route {...rest} path={path} render={props => Auth.isLogin ?
        <Component {...props} /> :
        <Redirect to={{ pathname: '/login', backUrl: path }} />} />
)
