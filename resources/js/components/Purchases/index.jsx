import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getProduct } from "../../actions/productActions";
import { useCoupon } from "../../actions/authActions";
import TextFieldGroup from "../Form/TextFieldGroup";

const ProductPurchase = ({ getProduct, useCoupon, match }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState([]);

    useEffect(() => {
        getProduct(match.params.productId);
    }, [getProduct]);

    const submitHandler = (e) => {
        e.preventDefault();

        let userId = 1;

        useCoupon(userId, match.params.productId, {
            voucher_code: code
        });
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Product Purchase</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <TextFieldGroup
                            label="Enter Coupon Code"
                            placeholder="abcde12345"
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            name="coupon_code"
                            error={error.coupon_code}
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
    getProduct: propTypes.func.isRequired,
    useCoupon: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProduct, useCoupon })(ProductPurchase);
