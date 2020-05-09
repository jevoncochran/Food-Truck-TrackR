import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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

const AddCard = props => {
    const classes = useStyles();

    const modalStyle = {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');
    const [zip, setZip] = useState('');

    return (
        <Modal 
        open={props.addCardMode} 
        onClose={props.closeCardModal} 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h2>Add credit or debit card</h2>
                <Cards 
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focus}
                />
                <form>
                    <label htmlFor="number">Card Number</label><br />
                    <input 
                    type='tel' 
                    name='number' 
                    value={number} 
                    onChange={e => setNumber(e.target.value)}
                    onFocus={e => setFocus(e.target.name)} 
                    /><br />

                    <label htmlFor="name">Name</label><br />
                    <input 
                    type='text' 
                    name='name' 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)} 
                    /><br />

                    <label htmlFor="expiry">Exp. Date</label><br />
                    <input 
                    type='text' 
                    name='expiry' 
                    placeholder='MM/YY' 
                    value={expiry} 
                    onChange={e => setExpiry(e.target.value)}
                    onFocus={e => setFocus(e.target.name)} 
                    />

                    <label htmlFor="cvc">Security Code</label><br />
                    <input 
                    type='tel' 
                    name='cvc' 
                    value={cvc} 
                    onChange={e => setCvc(e.target.value)}
                    onFocus={e => setFocus(e.target.name)} 
                    />

                    <label htmlFor="zip">Zip Code</label><br />
                    <input 
                        type='tel' 
                        name='zip' 
                        value={zip} 
                        onChange={e => setZip(e.target.value)}
                        onFocus={e => setFocus(e.target.name)} 
                    />
                </form>
            </div>
        </Modal>
    )
}

export default AddCard;