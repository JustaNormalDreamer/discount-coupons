import React, { Component } from 'react'
import TextFieldGroup from "../Form/TextFieldGroup";
import { createCoupon } from "../../actions/couponActions";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types';

class CreateCoupon extends Component {
    state = {
        name: '',
        discount: '',
        expiry: '',
        greater: '',
        total_codes: '',
        errors: {},
    }

    componentDidMount() {
        document.title = "Create Coupon";
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    submitHandler = e => {
        e.preventDefault();

        const couponData = {
            name: this.state.name,
            discount_rate: this.state.discount,
            expires_at: this.state.expiry,
            total_codes: this.state.total_codes,
            greater_than: this.state.greater,
        }

        this.props.createCoupon(couponData, this.props.history);
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { name, discount, expiry, greater, total_codes, errors } = this.state;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3>Create Coupon</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            <TextFieldGroup
                                label="Coupon Name"
                                name="name"
                                onChange={this.changeHandler}
                                placeholder="Halloween Sale"
                                value={name}
                                error={errors.name}
                            />

                            <div className="form-row">
                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Coupon Discount Rate"
                                        name="discount"
                                        type="number"
                                        onChange={this.changeHandler}
                                        placeholder="20"
                                        value={discount}
                                        error={errors.discount_rate}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Coupon Minimum Amount"
                                        name="greater"
                                        type="number"
                                        onChange={this.changeHandler}
                                        placeholder="2000.00"
                                        value={greater}
                                        error={errors.greater_than}
                                    />
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Coupon Generate Codes"
                                        name="total_codes"
                                        type="number"
                                        onChange={this.changeHandler}
                                        placeholder="5"
                                        value={total_codes}
                                        error={errors.total_codes}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Coupon Expires At"
                                        name="expiry"
                                        type="datetime-local"
                                        onChange={this.changeHandler}
                                        placeholder="Enter coupon expiry"
                                        value={expiry}
                                        error={errors.expires_at}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-success form-control" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

CreateCoupon.propTypes = {
    errors: propTypes.object.isRequired,
    createCoupon: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.error,
})

export default connect(mapStateToProps, { createCoupon })(withRouter(CreateCoupon));
