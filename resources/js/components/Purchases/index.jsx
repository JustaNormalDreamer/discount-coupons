import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import { getProduct } from "../../actions/productActions";
import { useCoupon } from "../../actions/authActions";
import TextFieldGroup from "../Form/TextFieldGroup";

const ProductPurchase = ({ getProduct, useCoupon, match, history, errors }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState([]);

    useEffect(() => {
        getProduct(match.params.productId);
        setError(errors);
    }, [getProduct, errors]);

    const submitHandler = (e) => {
        e.preventDefault();

        let userId = 1;

        useCoupon(userId, match.params.productId, {
            voucher_code: code
        }, history);
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
    errors: propTypes.object.isRequired,
    getProduct: propTypes.func.isRequired,
    useCoupon: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    errors: state.error
})

export default connect(mapStateToProps, { getProduct, useCoupon })(withRouter(ProductPurchase));
