import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../Redux/api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Redux/features/cartSlice';

const PaymentMethod = () => {
    const navigate = useNavigate();
    const [method, setMethod] = useState("");
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const [orderInfo, setOrderInfo] = useState(null); // ✅ Define orderInfo state
    const dispatch = useDispatch();
const[stripeCheckoutSession,{data:checkoutData,error:checkoutError,}]=useStripeCheckoutSessionMutation()

useEffect(()=>{

if (checkoutData) {
    window.location.href= checkoutData?.url;
}


if (checkoutError) {
    toast.error(isError?.data?.message);
}


},[checkoutData]);



    // Fetch orderInfo from localStorage
    useEffect(() => {
        const storedOrderInfo = localStorage.getItem("orderInfo");
        if (storedOrderInfo) {
            setOrderInfo(JSON.parse(storedOrderInfo));
        }
    }, []);

    const [createNewOrder, { isLoading, isError, isSuccess }] = useCreateNewOrderMutation();

    // Handle errors and success messages
    useEffect(() => {
        if (isError) {
            toast.error(isError.data?.message);
        }
        if (isSuccess) {
          dispatch(clearCart()); // Clear cart immediately after order creation
        localStorage.removeItem("cartItems");
            navigate("/me/orders?order_sucess=true");
        }
    }, [isError, isSuccess, navigate]);

    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();

        if (!method) {
            toast.error("Please select a payment method");
            return;
        }

        if (method === "COD") {
            if (orderInfo) {
                const orderData = {
                    shippingInfo,
                    orderItems: cartItems,
                    itemsPrice: orderInfo.itemsPrice,       // ✅ Fixed field name
                    shippingAmount: orderInfo.shippingAmount, // ✅ Fixed field name
                    taxAmount: orderInfo.taxAmount,         // ✅ Fixed field name
                    totalAmount: orderInfo.totalAmount,     // ✅ Fixed field name
                    paymentInfo: { status: "Not Paid" },
                    paymentMethod: "COD"
                };

                createNewOrder(orderData);
                console.log("Order Data:", orderData);
            } else {
                toast.error("Order information is missing!");
            }
        }

        else if (method === "Card") {
            if (orderInfo) {
                const orderData = {
                    shippingInfo,
                    orderItems: cartItems,
                    itemsPrice: orderInfo.itemsPrice,       // ✅ Fixed field name
                    shippingAmount: orderInfo.shippingAmount, // ✅ Fixed field name
                    taxAmount: orderInfo.taxAmount,         // ✅ Fixed field name
                    totalAmount: orderInfo.totalAmount,    // ✅ Fixed field name
                    paymentMethod: "Card"
                 
                };
                stripeCheckoutSession(orderData)

            } else {
                toast.error("Order information is missing!");
            }
        }
    };

    return (
        <>
          <MetaData title={"Payment Method"} />
          <CheckoutSteps shipping confirmOrder payment />
    
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                <h2 className="mb-4">Select Payment Method</h2>
    
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="codradio"
                    value="COD"
                    onChange={(e) => setMethod("COD")}
                  />
                  <label className="form-check-label" htmlFor="codradio">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_mode"
                    id="cardradio"
                    value="Card"
                    onChange={(e) => setMethod("Card")}
                  />
                  <label className="form-check-label" htmlFor="cardradio">
                    Card - VISA, MasterCard
                  </label>
                </div>
    
                <button
                  id="shipping_btn"
                  type="submit"
                  className="btn py-2 w-100"
                  disabled={isLoading}
                >
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        </>
      );
    };
    
    export default PaymentMethod;