import React from "react";
import { connect } from "react-redux";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { createNewOrder } from "../actions";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'relative',
    //   top: '50%',
    //   left: '50%',
      width: 400,
      height: '85vh',
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
        top: '50%',
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
                    <h2>Start new order?</h2>
                    <p>There are items from truck in your current order. You must create a new order to add items from truck.</p>
                    <button onClick={accept}>New Order</button>
                </div>
            </Modal>
        </div>
    )
}

export default connect(null, { createNewOrder })(NewOrderModal);