import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CurrencyFormatter from "currencyformatter.js";
import "../styling/Payment.scss"

const Payment = props => {
    // tip percentage and tip amount
    const [tipVal, setTipVal] = useState({
        tipPerc: 0,
        tip: 0
    });

    // holds value for custom tip only when user types into custom input in tip div
    const [customTip, setCustomTip] = useState(null);

    // total number of items in order
    // x orders of an item are counted x times
    const orderCount = props.order.reduce(function(prev, cur) {
        return prev + cur.count;
    }, 0);

    // order subtotal derived from sum of (each item x item count)
    const orderSubtotal = props.order.reduce(function(prev, cur) {
        return prev + cur.total;
    }, 0);

    // calculates tip from percentage radio buttons in tip div
    // triggered by onclick on percentage radio buttons
    const getSuggestedTip = () => {
        let tipRadios = document.getElementsByName('tip');

        tipRadios.forEach(ele => {
            if(ele.checked) {
                setTipVal({
                    tipPerc: ele.value,
                    tip: orderSubtotal * ele.value
                })
            }
        })
    };

    // calculates tip from user input in tip div
    // triggered by onclick on custom radio button
    const getCustomTip = () => {
        let custTipRad = document.getElementById('custom-tip');

        setTipVal({
            tip: custTipRad.value,
            tipPerc: null
        })
    };

    const handleCustTipClick = () => {
        let custTipRad = document.getElementById('custom-tip');
        custTipRad.clicked = true;
    }

    // updates tip amount per value user types into input in tip div
    const handleCustTipChange = e => {
        // let custTipFormatted = CurrencyFormatter.format(e.target.value, { currency: 'USD' });
        setCustomTip(e.target.value);
        setTipVal({
            tip: e.target.value,
            tipPerc: null
        })
    };

    useEffect(() => {
        console.log(`tip percentage: ${tipVal.tipPerc}, tip amount: ${tipVal.tip}`)
    }, [tipVal.tipPerc])

    useEffect(() => {
        console.log(`custom tip: ${customTip}`)
    }, [customTip])

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
                        <p className="order-div-truck">From <span style={{ color: '#eb7530' }}>{props.selectedTruck.name}</span></p>

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
                    <h2 className="confirm-pay-div-truck">From <span style={{ color: '#eb7530' }}>{props.selectedTruck.name}</span></h2>
                    <hr />
                    <div className="subtotal-div">
                        <p>Subtotal - {orderCount} {orderCount > 1 ? "items" : "item"}</p>
                        <p>{CurrencyFormatter.format(orderSubtotal, { currency: 'USD' })}</p>
                    </div>
                    <div className="tip-div">
                        <p className="tip-title">Add tip</p>
                        <div className="tip-calc-div">
                            <form className="tip-amount-div">
                                <span className="tip-radio-span">
                                    <input type="radio" id="tip1" name="tip" value={0.05} className="tip-radio" onClick={getSuggestedTip} />
                                    <label for="tip1">5%</label>
                                </span>
                                <span className="tip-radio-span">
                                    <input type="radio" id="tip2" name="tip" value={0.1} className="tip-radio" onClick={getSuggestedTip} />
                                    <label for="tip2">10%</label>
                                </span>
                                <span className="tip-radio-span">
                                    <input type="radio" id="tip3" name="tip" value={0.15} className="tip-radio" onClick={getSuggestedTip} />
                                    <label for="tip3">15%</label>
                                </span>
                                <span className="tip-radio-span">
                                    <input type="radio" id="custom-tip" name="tip" value={customTip} className="tip-radio" onClick={getCustomTip} />
                                    {/* <label for="custom-tip" style={{ fontSize: '0.8rem'}}>other</label> */}
                                    <input type="number" value={customTip} min="0.50" step="0.50" onClick={handleCustTipClick} onChange={handleCustTipChange} className="custom-tip-input" />
                                </span>
                            </form>
                            <div className="tip-total-div">
                                <p>{CurrencyFormatter.format(tipVal.tip, { currency: 'USD' })}</p>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-pay-total-div">
                        <p>Total</p>
                        <p>{CurrencyFormatter.format(orderSubtotal + Number(tipVal.tip), { currency: 'USD' })}</p>
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