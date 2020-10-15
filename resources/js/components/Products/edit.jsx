import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import propTypes from 'prop-types'
import TextFieldGroup from "../Form/TextFieldGroup";
import { getProduct, updateProduct } from "../../actions/productActions";

class EditProduct extends Component {
    state = {
        name: '',
        quantity: '',
        rate: '',
        errors: {}
    }

    componentDidMount() {
        document.title = "Edit Product";
        this.props.getProduct(this.props.match.params.productId);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        if(nextProps.product.product) {
            const { name, rate, quantity } = nextProps.product.product;
            this.setState({
                name, rate, quantity
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
        this.props.updateProduct(this.props.match.params.productId, productData, this.props.history);
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
                                placeholder="Fantech HG-11 Captain gaming headphone"
                                value={name}
                                error={errors.name}
                            />

                            <div className="form-row">
                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Product quantity"
                                        name="quantity"
                                        type="number"
                                        onChange={this.changeHandler}
                                        placeholder="15"
                                        value={quantity}
                                        error={errors.quantity}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextFieldGroup
                                        label="Product Rate"
                                        name="rate"
                                        type="number"
                                        onChange={this.changeHandler}
                                        placeholder="1500.00"
                                        value={rate}
                                        error={errors.rate}
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
        )
    }
}

EditProduct.propTypes = {
    getProduct: propTypes.func.isRequired,
    updateProduct: propTypes.func.isRequired,
    product: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    errors: state.error
})

export default connect(mapStateToProps, { getProduct, updateProduct })(withRouter(EditProduct));
