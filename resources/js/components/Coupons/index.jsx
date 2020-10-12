import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getCoupons } from "../../actions/couponActions";

import Spinner from '../Spinner';

const Coupon = ({ getCoupons, coupons: { coupons, loading } }) => {
    useEffect(() => {
        getCoupons();
    }, [getCoupons]);

    let couponItems;
    if(coupons === null || loading) {
        couponItems = <Spinner />;
    } else {
        if(coupons.length > 0) {
            couponItems = coupons.map(coupon => (
                <tr key={coupon.id}>
                    <td>{coupon.id}</td>
                    <td>{coupon.name}</td>
                    <td>{coupon.discount_rate}</td>
                    <td>{coupon.greater_than}</td>
                    <td>{coupon.total_codes}</td>
                    <td>{coupon.used_codes}</td>
                    <td>{coupon.expires_at}</td>
                </tr>
            ))
        }
    }

    return (
        <div className="container">
            <div className="card my-5">
                <div className="card-header">
                    <h3 className="">Manage Coupons</h3>
                </div>
                <div className="card-body">
                    <table className="table table-responsive table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Discount Rate</th>
                                <th>Price Range</th>
                                <th>Generated</th>
                                <th>Used</th>
                                <th>Expires At</th>
                            </tr>
                        </thead>
                        <tbody>
                        {couponItems}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

Coupon.propTypes = {
    getCoupons: propTypes.func.isRequired,
    coupons: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    coupons: state.coupon
})

export default connect(mapStateToProps, { getCoupons })(Coupon);
