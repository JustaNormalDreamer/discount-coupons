import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from "./components/layouts/Navbar";
import Coupon from "./components/Coupons";
import CreateCoupon from "./components/Coupons/create";
import Products from "./components/Products";
import CreateProduct from "./components/Products/create";
import EditProduct from "./components/Products/edit";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Coupon} />
                    <Route exact path="/coupons/create" component={CreateCoupon} />

                    <Route exact path="/products" component={Products} />
                    <Route exact path="/products/create" component={CreateProduct} />
                    <Route exact path="/products/:productId/edit" component={EditProduct} />
                    <Switch>

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

if(document.getElementById('app')) {
    render(<App />, document.getElementById('app'));
}
