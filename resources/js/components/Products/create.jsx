import React, { Component } from 'react'
import TextFieldGroup from "../Form/TextFieldGroup";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from "prop-types";
import { createProduct } from "../../actions/productActions";

class CreateProduct extends Component {
    state = {
        name: '',
        quantity: '',
        rate: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        const productData = {
            name: this.state.name,
            quantity: this.state.quantity,
            rate: this.state.rate
        }
        this.props.createProduct(productData, this.props.history);
    }

    render() {
        const  { name, quantity, rate, errors } = this.state;
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h2>Create Product</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            <TextFieldGroup
                                label="Product Name"
                                name="name"
                                onChange={this.changeHandler}
                                placeholder="Enter product name"
                                value={name}
                                error={errors.name}
                            />

                            <TextFieldGroup
                                label="Product quantity"
                                name="quantity"
                                type="number"
                                onChange={this.changeHandler}
                                placeholder="Enter product quantity"
                                value={quantity}
                                error={errors.quantity}
                            />

                            <TextFieldGroup
                                label="Product Rate"
                                name="rate"
                                type="number"
                                onChange={this.changeHandler}
                                placeholder="Enter product rate"
                                value={rate}
                                error={errors.rate}
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
}

CreateProduct.propTypes = {
    errors: propTypes.object.isRequired,
    createProduct: propTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.error,
})

export default connect(mapStateToProps, { createProduct })(withRouter(CreateProduct));
