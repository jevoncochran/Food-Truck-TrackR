import React from "react";
import Header from "./Header";
import "../styling/Payment.scss"

const Payment = props => {
    return (
        <div className="payment-main">
            <Header history={props.history} />
            
            <div className="payment-body">
                <div className="order-div">
                    <div>
                        <h2>Payment</h2>
                        <p>Master -5559</p>
                        <p>Pay in cash</p>
                    </div>

                    <div>
                        <h2>Your Order</h2>
                        <p>From truck</p>
                        <p>item 1</p>
                        <p>item 2</p>
                        <input type="text" placeholder="Note to truck..." />
                    </div>
                </div>

                <div className="confirm-payment-div">
                    <h2>From truck</h2>
                    <div style={{ display: 'flex' }}>
                        <p>Subtotal - 1 item</p>
                        <p>$20.50</p>
                    </div>
                    <p>Add tip</p>
                    <div style={{ display: 'flex' }}>
                        <p>Total</p>
                        <p>$20.50</p>
                    </div>
                    <button>Confirm Order</button>
                </div>
            </div>
        </div>
    )
}

export default Payment;