import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getCoupons, deleteCoupon } from "../../actions/couponActions";

import Spinner from '../Spinner';

const Coupon = ({ getCoupons, deleteCoupon, coupons: { coupons, loading } }) => {
    useEffect(() => {
        getCoupons();
    }, [getCoupons]);

    const deleteHandler = couponId => {
        deleteCoupon(couponId);
    }

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
                    <td><button className="btn btn-danger" onClick={() => deleteHandler(coupon.id)}>Delete</button></td>
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
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Discount Rate</th>
                                    <th>Price Range</th>
                                    <th>Generated</th>
                                    <th>Used</th>
                                    <th>Expires At</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {couponItems}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

Coupon.propTypes = {
    getCoupons: propTypes.func.isRequired,
    deleteCoupon: propTypes.func.isRequired,
    coupons: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    coupons: state.coupon
})

export default connect(mapStateToProps, { getCoupons, deleteCoupon })(Coupon);
