import React from "react";
import { connect } from "react-redux";
import CurrencyFormatter from "currencyformatter.js";
import Card from "@material-ui/core/Card";
import { ClickAwayListener } from "@material-ui/core";
import "../styling/OrderCard.scss"

import { closeOrderCard, updateCount, removeFromOrder } from "../actions";

const OrderCard = props => {

    const orderCount = props.order.reduce(function(prev, cur) {
        return prev + cur.count;
    }, 0);

    return (
        <ClickAwayListener onClickAway={() => props.closeOrderCard()}>
        <Card className="order-card-main">
            <i class="far fa-times-circle" style={{ position: 'relative', left: '0px', textAlign: 'left', width: '100%', marginTop: '3%', fontSize: '1.5rem' }} onClick={() => props.closeOrderCard()}></i>

            <h1 className="order-card-title">Your Order</h1>
            <p className="order-card-truck">from <span className="truck-name">{props.orderTruck.name}</span></p>

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

            <input className="order-note-input" type="text" placeholder="Note to truck..." />

            <button className="pay-button" onClick={() => props.history.push('/payment')}>
                <p className="total-items-count">{orderCount}</p>
                <p>Next step: pay</p>
                <p>{
                CurrencyFormatter.format(props.order.reduce(function(prev, cur) {
                    return prev + cur.total;
                }, 0), { currency: 'USD' })
                }</p>
            </button>
        </Card>
        </ClickAwayListener>
    )
}

const mapStateToProps = state => {
    return {
        selectedTruck: state.selectedTruck,
        order: state.order,
        orderTruck: state.orderTruck
    }
}

export default connect(mapStateToProps, { closeOrderCard, updateCount, removeFromOrder })(OrderCard);