import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CurrencyFormatter from "currencyformatter.js";

// action imports
import { addItemToOrder, openOrderCard, addTruckToOrder, updateOrder } from "../actions";

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

const MenuItemModal = props => {
    const classes = useStyles();

    const modalStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }

    // holds value for count of menu item
    const [count, setCount] = useState(1);

    // holds value for selected menu item to add to order
    const [itemToAdd, setItemToAdd] = useState({});

    // returns existing count when user clicks on menu item that is already in order
    const getExistingCount = (arr) => {
        return arr.find(el => props.menuItem.name === el.item).count
     }

    // increases (menu item) count by 1
    const increment = () => {
        setCount(count + 1);
    }

    // decreases (menu item) count by 1
    const decrement = () => {
        if (count === 1) {
            setCount(1)
        } else {
            setCount(count - 1);
        }
    }

    // closes modal and resets (menu item) count to 1
    const closeAndReset = () => {
        props.closeModal();
        setCount(30);
    }

    // adds item to order 
    const addToOrder = () => {
        // adds truck to order on first item added
        if (!props.orderTruck) {
            props.addTruckToOrder();
        };
        // asks user to start a new order if they try to order things from multiple trucks
        if (props.order.length > 0 && props.orderTruck && props.orderTruck.id !== props.selectedTruck.id) {
            props.showNewOrderAlert();
            props.closeModal();
        } else {
            // if item is already in order, an update is performed based on new specifications
            if (props.order.some(el => itemToAdd.id === el.id)) {
                props.updateOrder(itemToAdd);
            // if item is not in order, it is added to order
            } else {
                props.addItemToOrder(itemToAdd);
            }
            props.openOrderCard();
            props.closeModal();
            setCount(1);
        }
    }

    useEffect(() => {
        setItemToAdd({
            id: props.menuItem.id,
            item: props.menuItem.name,
            count: count,
            price: props.menuItem.price,
            total: props.menuItem.price * count
        });
    }, [count, props.openMode])

    // sets count each time user clicks on a different menu item
    // not sure why this overrides count where count is declared with useState hook
    // in other words, not sure why this component does not rerender each time a user click on menu item
    useEffect(() => {
        setCount(props.order.some(el => props.menuItem.name === el.item) ? getExistingCount(props.order) : 1)
    }, [props.menuItem])

    return (
        <div>
            <Modal 
                open={props.openMode} 
                onClose={closeAndReset} 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <object data={props.menuItem.image} alt="pic of menu item" style={{ width: '100%', height: '45%', objectFit: 'cover', marginBottom: '3%' }}/>
                    <h1 style={{ fontWeight: 'bold', marginBottom: '15%', paddingLeft: '2%' }}>{props.menuItem.name}</h1>
                    <p>{props.menuItem.description}</p>
                    <label style={{ width: '100%', background: 'lightgrey', height: '5%', paddingTop: 'auto', paddingBottom: 'auto', paddingLeft: '2%' }}>Special Instructions</label>
                    <input style={{ width: '100%', border: 'none', height: '10%', paddingTop: '8%', paddingBottom: '16%', borderBottom: '1px solid lightgrey', marginBottom: '4%', paddingLeft: '2%' }} name="instructions" type="text" placeholder="Leave a note for the kitchen"/>
                    <div style={{ display: 'flex', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <AddCircleIcon style={{ fontSize: 30, paddingTop: 'auto', paddingBottom: 'auto', marginTop: 'auto', marginBottom: 'auto' }} onClick={increment} />   
                        <p style={{ margin: 'auto 2%' }}>{count}</p>
                        <RemoveCircleIcon style={{ fontSize: 30, marginRight: '3%', marginTop: 'auto', marginBottom: 'auto' }} onClick={decrement} />
                        <button 
                            style={{ width: '80%', color: 'white', background: 'black', padding: '12px 0' }} 
                            onClick={addToOrder}>Add {count} to Order {CurrencyFormatter.format((props.menuItem.price * count), { currency: 'USD' })}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order: state.order,
        orderTruck: state.orderTruck,
        selectedTruck: state.selectedTruck
    }
}

export default connect(mapStateToProps, { addItemToOrder, openOrderCard, addTruckToOrder, updateOrder })(MenuItemModal);