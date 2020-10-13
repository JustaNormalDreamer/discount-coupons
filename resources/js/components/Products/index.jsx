import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from "../../actions/productActions";
import propTypes from 'prop-types';
import Spinner from "../Spinner";

const Products = ({ getProducts, deleteProduct, products: { products, loading } }) => {

    useEffect(() => {
        getProducts();
    }, [getProducts])

    const deleteHandler = productId => {
        deleteProduct(productId);
    }

    let productItems;
    if(products === null || loading) {
        productItems = <Spinner />
    } else {
        if(products.length > 0) {
            productItems = products.map(product => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.rate}</td>
                    <td>{product.quantity}</td>
                    <td><Link to={`/products/purchase/${product.id}`} className="btn btn-secondary">View</Link></td>
                    <td><Link to={`products/${product.id}/edit`} className="btn btn-info">Edit</Link></td>
                    <td><button className="btn btn-danger" onClick={() => deleteHandler(product.id)}>Delete</button></td>
                </tr>
            ))
        }
    }

    return (
        <div className="container">
            <div className="card my-5">
                <div className="card-header">
                    <h3 className="">Manage Products</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productItems}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Products.propTypes = {
    getProducts: propTypes.func.isRequired,
    deleteProduct: propTypes.func.isRequired,
    products: propTypes.array.isRequired
}

const mapStateToProps = state => ({
    products: state.product
})

export default connect(mapStateToProps, { getProducts, deleteProduct })(Products);
