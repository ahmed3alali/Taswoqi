import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'


import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    // Calculate Order Prices



    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
    const navigate = useNavigate();


/*  "itemsPrice": 79.97,
  "taxAmount": 7.99,
  "shippingAmount": 5.99,
  "totalAmount": 93.95*/


    const processToPayment = () => {
        const orderData = {
            orderItems: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
                product: item.product, // Assuming this is the product ID
            })),
            shippingInfo,
            itemsPrice,
            taxAmount: taxPrice,       // ✅ Use correct field name
            shippingAmount: shippingPrice, // ✅ Use correct field name
            totalAmount: totalPrice,   // ✅ Use correct field name
            paymentMethod: "Cash on Delivery",  // ⚠️ Change as needed
            paymentInfo: {},  // ⚠️ Fill if needed (Stripe/PayPal)
        };
    
        localStorage.setItem("orderInfo", JSON.stringify(orderData)); // Optional: Store before redirect
        navigate("/payment_method");
    };
    
    





    return (
        <Fragment>

            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder></CheckoutSteps>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}



                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Proceed to Payment</button>
                    </div>
                </div>


            </div>

        </Fragment>
    )
}

export default ConfirmOrder