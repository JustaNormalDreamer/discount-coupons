import React, { Component } from 'react'

class CreateCoupon extends Component {
    state = {
        name: '',
        discount: '',
        expiry: '',
        greater: '',
        total_codes: '',
        errors: [],
    }

    render() {
        return (
            <h2>Create Coupon</h2>
        );
    }
}

export default CreateCoupon;
