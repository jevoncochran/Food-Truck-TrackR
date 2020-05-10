import React from "react";
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import "../styling/NewOrderModal.scss";

import { createNewOrder } from "../actions";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'relative',
    //   top: '50%',
    //   left: '50%',
      width: 340,
      height: '37vh',
      minHeight: '30vh',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      outline: 'none'
    //   padding: theme.spacing(2, 4, 3),
    },
  }));

const NewOrderModal = props => {
    const classes = useStyles();

    const modalStyle = {
        position: 'absolute',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)'
    }

    const accept = () => {
        props.createNewOrder();
        props.closeNewOrderAlert();
        props.openModal();
    }

    return (
        <div>
            <Modal
                open={props.newOrderAlert}
                onClose={props.closeNewOrderAlert}
            >
                <div style={modalStyle} className={classes.paper}>
                <div className="new-order-modal-body">
                    <i class="fas fa-times" style={{ marginTop: '4%', marginBottom: '8%' }}></i>
                    <h2 className="new-order-modal-title">Start new order?</h2>
                    <p className="new-order-modal-txt">There are items from {props.orderTruck.name} in your current order. You must create a new order to add items from {props.selectedTruck.name}.</p>
                    <button onClick={accept} className="new-order-modal-btn">New Order</button>
                </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orderTruck: state.orderTruck,
        selectedTruck: state.selectedTruck
    }
}

export default connect(mapStateToProps, { createNewOrder })(NewOrderModal);