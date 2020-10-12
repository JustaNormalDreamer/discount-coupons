import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Coupon from "./components/Coupons";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={Coupon} />
                <Switch>

                </Switch>
            </Router>
        </Provider>
    );
}

export default App;

if(document.getElementById('app')) {
    render(<App />, document.getElementById('app'));
}
