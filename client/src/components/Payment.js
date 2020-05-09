import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CurrencyFormatter from "currencyformatter.js";
import "../styling/Payment.scss"

const Payment = props => {
    const orderCount = props.order.reduce(function(prev, cur) {
        return prev + cur.count;
    }, 0);

    return (
        <div className="payment-main">
            <Header history={props.history} />
            
            <div className="payment-body">
                <div className="order-div">
                    <div>
                        <div className="payment-title-div">
                            <h2>Payment</h2>
                            <button className="edit-payment-btn">Edit</button>
                        </div>
                        <hr />
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={null} onChange={null}>
                                <FormControlLabel value="female" control={<Radio />} label="Mastercard -5559" className="payment-radio"/>
                                <FormControlLabel value="male" control={<Radio />} label="Pay in cash" className="payment-radio"/>
                            </RadioGroup>
                        </FormControl>
                        <hr />
                    </div>

                    <div>
                        <div className="order-title-div">
                            <h2>Your Order</h2>
                            <button className="add-items-order-btn">Add items</button>
                        </div>
                        <p className="order-div-truck">From {props.selectedTruck.name}</p>

                        <div className="order-items-cont">
                            {props.order.map(item => (
                                <div key={item.item} className="order-item-div">
                                    <i class="fas fa-times-circle" style={{ width: '10%', paddingTop: 'auto', paddingBottom: 'auto' }} onClick={() => props.removeFromOrder(item.item)}></i>
                                    <p className="order-item-count">
                                        <input type="number" value={item.count} onChange={ e => props.updateCount(Number(e.target.value), item.item)} className="order-item-count-input" />
                                    </p>
                                    <p className="order-item-name">{item.item}</p>
                                    <p className="order-item-total">{CurrencyFormatter.format(item.total, { currency: 'USD' })}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <input type="text" placeholder="Note to truck..." className="note-input" />
                    </div>
                </div>

                <div className="confirm-pay-div">
                    <h2 className="confirm-pay-div-truck">From {props.selectedTruck.name}</h2>
                    <hr />
                    <div style={{ display: 'flex' }}>
                        <p>Subtotal - {orderCount} {orderCount > 1 ? "items" : "item"}</p>
                        <p>$20.50</p>
                    </div>
                    <p>Add tip</p>
                    <div style={{ display: 'flex' }}>
                        <p>Total</p>
                        <p>$20.50</p>
                    </div>
                    <button className="confirm-order-btn">Confirm Order</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedTruck: state.selectedTruck,
        order: state.order
    }
}

export default connect(mapStateToProps, {})(Payment);