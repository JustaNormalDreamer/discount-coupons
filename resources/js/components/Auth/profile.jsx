import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getProfile } from "../../actions/authActions";
import Spinner from '../Spinner';

const Profile = ({ getProfile, auth: { user, loading } }) => {

    useEffect(() => {
        getProfile();
    }, [getProfile])

    let purchases;
    if(user === null || loading) {
        purchases = <Spinner />;
    } else {
        if(user.length > 0) {
            purchases = user.map((purchase, index) => (
                <tr key={purchase.id}>
                    <td>{++index}</td>
                    <td>{purchase.product.name}</td>
                    <td>True</td>
                    <td>{purchase.code}</td>
                    <td>{purchase.product.rate}</td>
                    <td>{purchase.product.discount_amt}</td>
                    <td>{purchase.product.rate - purchase.product.discount_amt}</td>
                </tr>
            ));
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h5 className="">Manage Profile</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Used Coupon</th>
                                    <th>Coupon Code</th>
                                    <th>Product Rate</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
}

Profile.propTpyes = {
    auth: propTypes.object.isRequired,
    getProfile: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getProfile })(Profile);
