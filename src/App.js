import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import SetQP from './pages/SetQP'
import ViewQP from './pages/ViewQP'
import PageNotFound from './pages/PageNotFound'
import './App.css'

class App extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path={ '/' } component={ Login } />
                    <Route path={'/set-questions'}  component={ SetQP }/>
                    <Route path={'/view-questions/:key'} component={ViewQP} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App