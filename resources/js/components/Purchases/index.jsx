import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import { getProduct } from "../../actions/productActions";
import { useCoupon } from "../../actions/authActions";
import TextFieldGroup from "../Form/TextFieldGroup";
import Spinner from '../Spinner';

const ProductPurchase = ({ getProduct, useCoupon, match, history, errors, product: { loading, product }, purchase }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState([]);
    const [discount, setDiscount] = useState({});

    useEffect(() => {
        document.title = "Purchase Product";
        getProduct(match.params.productId);
        setError(errors);
        setDiscount(purchase);
    }, [getProduct, errors, purchase]);

    const submitHandler = (e) => {
        e.preventDefault();

        let userId = 1;

        useCoupon(userId, match.params.productId, {
            voucher_code: code
        }, history);
    }

    //product data
    let productItem;
    if(loading || product === null) {
        productItem = <Spinner />;
    } else {
        productItem = (
            <tr>
                <td>{product.name}</td>
                <td>{product.rate}</td>
                <td>1</td>
                <td>{discount.discount_amount}</td>
                <td>{product.rate}</td>
            </tr>
        )
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Purchase Product</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItem}
                        </tbody>
                    </table>
                    <form onSubmit={submitHandler}>
                        <TextFieldGroup
                            label="Enter Coupon Code"
                            placeholder="abcde12345"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            name="coupon_code"
                            error={error.voucher_code}
                            />

                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-success form-control" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

ProductPurchase.propTypes = {
    product: propTypes.object.isRequired,
    purchase: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    getProduct: propTypes.func.isRequired,
    useCoupon: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    purchase: state.purchase,
    errors: state.error
})

export default connect(mapStateToProps, { getProduct, useCoupon })(withRouter(ProductPurchase));
